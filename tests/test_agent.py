import pytest
import os
from agent import CustomerServiceAgent, KeylessMockLLM

def test_customer_service_agent_initialization():
    agent = CustomerServiceAgent()
    assert agent is not None
    assert isinstance(agent.llm, KeylessMockLLM)
    assert len(agent.tools) == 3
    tool_names = [t.name for t in agent.tools]
    assert "search_knowledge_base" in tool_names
    assert "escalate_to_human" in tool_names
    assert "check_order_status" in tool_names

def test_check_order_status_tool():
    agent = CustomerServiceAgent()
    res1 = agent.check_order_status("ORD998877")
    assert "ORD998877" in res1
    assert "being processed" in res1

    res2 = agent.check_order_status("12345")
    assert "Please provide a valid order ID starting with 'ORD'" in res2

def test_search_knowledge_base_tool():
    agent = CustomerServiceAgent()
    res1 = agent.search_knowledge_base("what is your return policy?")
    assert "30 days" in res1

    res2 = agent.search_knowledge_base("shipping times")
    assert "3-5 business days" in res2

    res3 = agent.search_knowledge_base("unknown topic")
    assert "escalate" in res3

def test_escalate_to_human_tool():
    agent = CustomerServiceAgent()
    res = agent.escalate_to_human("Billing dispute")
    assert "transferring you to a human agent" in res
    assert "Billing dispute" in res

def test_keyless_chat_flow_and_memory():
    agent = CustomerServiceAgent()

    # Check order response
    resp1 = agent.chat("Check status for ORD554433")
    assert "ORD554433" in resp1 or "processed" in resp1

    # Check knowledge base response
    resp2 = agent.chat("Tell me about warranty")
    assert "1-year" in resp2 or "warranty" in resp2

    # Check memory window retention
    history = agent.memory.load_memory_variables({})
    assert len(history.get("chat_history", [])) > 0
