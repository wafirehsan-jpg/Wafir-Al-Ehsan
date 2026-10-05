try:
    from langchain.agents import AgentExecutor, create_openai_functions_agent
except ImportError:
    from langchain_classic.agents import AgentExecutor, create_openai_functions_agent

try:
    from langchain.memory import ConversationBufferWindowMemory
except ImportError:
    from langchain_classic.memory import ConversationBufferWindowMemory

try:
    from langchain.tools import Tool
except ImportError:
    from langchain_classic.tools import Tool

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage, AIMessage
from langchain_core.outputs import ChatResult, ChatGeneration
from typing import Any, List, Optional
import os

class KeylessMockLLM(BaseChatModel):
    """Keyless Chat Model fallback when OPENAI_API_KEY is not provided."""

    def _generate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> ChatResult:
        last_msg = messages[-1].content if messages else ""
        text = str(last_msg).lower()

        # Tool call triggers or smart responses
        if "order" in text or "ord" in text:
            words = str(last_msg).split()
            order_id = next((w.strip(".,!?") for w in words if w.upper().startswith("ORD")), "ORD12345")
            response = f"Let me check that order for you. Order {order_id} is currently being processed and will ship within 2 business days."
        elif "return" in text or "shipping" in text or "warranty" in text or "payment" in text or "policy" in text:
            response = "Our return policy allows returns within 30 days of purchase with original receipt. Standard shipping takes 3-5 business days."
        elif "escalate" in text or "human" in text or "complex" in text or "speak to" in text:
            response = "I'm transferring you to a human agent who can better assist with your request. Please hold while I connect you."
        else:
            response = f"Hello! I am TechCorp's Customer Service Agent. I can help with order status, return policies, shipping info, or connect you with a human representative. How can I assist you today regarding '{last_msg}'?"

        message = AIMessage(content=response)
        generation = ChatGeneration(message=message)
        return ChatResult(generations=[generation])

    @property
    def _llm_type(self) -> str:
        return "keyless_customer_service_llm"


class CustomerServiceAgent:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if api_key and api_key.strip():
            try:
                self.llm = ChatOpenAI(
                    model="gpt-4",
                    temperature=0.1,
                    api_key=api_key
                )
            except Exception:
                self.llm = KeylessMockLLM()
        else:
            self.llm = KeylessMockLLM()

        self.memory = ConversationBufferWindowMemory(
            k=10,  # Keep last 10 exchanges
            memory_key="chat_history",
            return_messages=True
        )

        self.tools = self._create_tools()
        self.agent = self._create_agent()

    def _create_tools(self):
        """Define the tools available to the agent"""
        return [
            Tool(
                name="search_knowledge_base",
                description="Search the company knowledge base for information",
                func=self.search_knowledge_base
            ),
            Tool(
                name="escalate_to_human",
                description="Escalate complex issues to human agents",
                func=self.escalate_to_human
            ),
            Tool(
                name="check_order_status",
                description="Check the status of a customer order by order ID",
                func=self.check_order_status
            )
        ]

    def _create_agent(self):
        """Create the agent with prompt and tools"""
        prompt = ChatPromptTemplate.from_messages([
            ("system", self._get_system_prompt()),
            ("human", "{input}"),
            ("assistant", "{agent_scratchpad}")
        ])

        if isinstance(self.llm, KeylessMockLLM):
            # Keyless direct executor wrapper without requiring OpenAI API key validation
            return None

        try:
            agent = create_openai_functions_agent(
                llm=self.llm,
                tools=self.tools,
                prompt=prompt
            )

            return AgentExecutor(
                agent=agent,
                tools=self.tools,
                memory=self.memory,
                max_iterations=5,
                verbose=True
            )
        except Exception:
            return None

    def _get_system_prompt(self):
        return """You are a helpful customer service agent for TechCorp.
        Your role is to assist customers with their inquiries professionally and efficiently.

        Guidelines:
        - Always be polite and empathetic
        - Use available tools to find accurate information
        - If you cannot resolve an issue, escalate to a human agent
        - Keep responses concise but informative
        - Ask clarifying questions when needed

        Available tools:
        1. search_knowledge_base: Find information in the company knowledge base
        2. escalate_to_human: Transfer complex issues to human agents
        3. check_order_status: Look up order information by order ID
        """

    def search_knowledge_base(self, query: str) -> str:
        """Search the knowledge base for relevant information"""
        knowledge_items = {
            "return policy": "Our return policy allows returns within 30 days of purchase with original receipt.",
            "shipping": "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.",
            "warranty": "All products come with a 1-year manufacturer warranty covering defects.",
            "payment": "We accept all major credit cards, PayPal, and bank transfers."
        }

        for key, value in knowledge_items.items():
            if key.lower() in query.lower():
                return value

        return "I couldn't find specific information about that. Let me escalate this to a human agent."

    def escalate_to_human(self, reason: str) -> str:
        """Escalate the conversation to a human agent"""
        return f"I'm transferring you to a human agent who can better assist with: {reason}. Please hold while I connect you."

    def check_order_status(self, order_id: str) -> str:
        """Check order status by order ID"""
        if order_id.startswith("ORD"):
            return f"Order {order_id} is currently being processed and will ship within 2 business days."
        else:
            return "Please provide a valid order ID starting with 'ORD'."

    def chat(self, message: str) -> str:
        """Process a user message and return agent response"""
        try:
            if self.agent is not None:
                response = self.agent.invoke({"input": message})
                return response["output"]
            else:
                # Keyless routing through available agent tools & memory logic
                lower_msg = message.lower()

                # Check direct order status check
                words = message.split()
                ord_token = next((w.strip(".,!?") for w in words if w.upper().startswith("ORD")), None)
                if ord_token:
                    result = self.check_order_status(ord_token)
                elif any(k in lower_msg for k in ["return", "shipping", "warranty", "payment", "policy"]):
                    result = self.search_knowledge_base(message)
                elif any(k in lower_msg for k in ["escalate", "human", "representative", "agent", "person", "help me"]):
                    result = self.escalate_to_human(message)
                else:
                    # Generic LLM response
                    res = self.llm.invoke([("human", message)])
                    result = res.content

                # Save to window memory
                self.memory.save_context({"input": message}, {"output": result})
                return result
        except Exception as e:
            return f"I'm sorry, I encountered an error: {str(e)}. Let me escalate this to a human agent."

# Usage example
if __name__ == "__main__":
    agent = CustomerServiceAgent()

    # Test the agent
    print("Customer Service Agent initialized (Keyless Mode Ready)!")
    print("Type 'quit' to exit\n")

    while True:
        try:
            user_input = input("Customer: ")
            if user_input.lower() == 'quit':
                break

            response = agent.chat(user_input)
            print(f"Agent: {response}\n")
        except (EOFError, KeyboardInterrupt):
            break
