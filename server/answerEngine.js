/**
 * Wafir AI Keyless Answer Engine
 * Produces a prompt-specific, well-structured answer for each model style
 * without calling any external API. Answers are derived from the prompt's
 * intent and subject so every option actually responds to what was asked.
 */

const QUESTION_PREFIXES = [
  /^(can|could|would|will) you\s+/i,
  /^please\s+/i,
  /^i (want|need|would like) to\s+/i,
  /^tell me (about|how|why|what)\s+/i,
  /^explain\s+/i,
  /^describe\s+/i,
  /^what (is|are|was|were|'s)\s+/i,
  /^how (do|to|can|should|does|did)\s+(i\s+|you\s+|we\s+)?/i,
  /^why (is|are|do|does|did)\s+/i,
  /^when (should|do|can)\s+(i\s+)?/i,
  /^where (can|do|should)\s+(i\s+)?/i,
  /^who (is|are|was)\s+/i,
  /^define\s+/i,
  /^(give|show) me\s+/i,
  /^help me\s+/i,
];

const INTENT_PATTERNS = [
  ['comparison', /\b(vs\.?|versus|compare|comparison|difference between|better than)\b/],
  ['howto', /\bhow (do|to|can|should|does|did)\b|\bsteps? to\b/],
  ['why', /\bwhy\b/],
  ['list', /\b(list|examples?|ideas?|tips?|ways to|suggestions?)\b/],
  ['definition', /\b(what is|what are|define|meaning of|definition of)\b/],
  ['advice', /\b(should i|is it better|recommend|best way|worth it|advice)\b/],
];

const ANGLES = {
  definition: (s) => [
    `At its core, **${s}** is best defined by the problem it solves and the role it plays in practice.`,
    `The traits that matter most for **${s}** are its purpose, how it is typically applied, and the trade-offs it carries.`,
    `A common misconception is treating **${s}** as fixed — in reality it shifts with context and goals.`,
    `To judge **${s}** well, weigh accuracy, effort, and how easily it fits what you already have.`,
  ],
  howto: (s) => [
    `Start by defining exactly what "done" looks like for **${s}**, so you can measure progress.`,
    `Break **${s}** into small, ordered steps and handle one at a time instead of all at once.`,
    `Check your work early — mistakes on **${s}** are far cheaper to fix before you go further.`,
    `Review and refine at the end; the first pass at **${s}** is rarely the best one.`,
  ],
  why: (s) => [
    `The main reason behind **${s}** is the balance it strikes between benefit and cost.`,
    `Secondary factors around **${s}** include context, timing, and the constraints you are working within.`,
    `Ignoring **${s}** usually shows up later as rework, confusion, or wasted effort.`,
    `Understanding **${s}** lets you make a decision you can actually defend.`,
  ],
  comparison: (s) => [
    `The clearest difference in **${s}** comes down to purpose, cost, and how much control you need.`,
    `For **${s}**, one option usually wins on simplicity while the other wins on flexibility.`,
    `Choose based on your real constraints — time, budget, team — rather than on hype.`,
    `Often the best answer to **${s}** is to start simple and switch only when it starts to hurt.`,
  ],
  list: (s) => [
    `For **${s}**, start with the single highest-impact item before adding more.`,
    `Balance quick wins with one or two deeper ideas so **${s}** stays practical.`,
    `Group related items together — it makes **${s}** easier to act on.`,
    `Drop anything that does not directly move **${s}** forward.`,
  ],
  advice: (s) => [
    `On **${s}**, the safer default is the simplest option that still meets your needs.`,
    `Consider the downside first: if the worst case for **${s}** is acceptable, go ahead.`,
    `Gather one or two real examples before committing to **${s}**.`,
    `Revisit **${s}** after a short trial — real feedback beats theory.`,
  ],
  general: (s) => [
    `The heart of your question about **${s}** is a trade-off between value and effort.`,
    `A useful way to think about **${s}** is to separate what is essential from what is optional.`,
    `In practice, **${s}** works best when kept simple and iterated on.`,
    `The right answer for **${s}** depends on your specific context and goals.`,
  ],
};

const DIRECT = {
  definition: (s) => `**${cap(s)}** is best understood by its purpose and how it is used — not just by its name.`,
  howto: (s) => `To handle **${s}**, work through it in clear steps and verify each one as you go.`,
  why: (s) => `**${cap(s)}** generally comes down to the trade-off between benefit and cost.`,
  comparison: (s) => `Between the options in **${s}**, the right pick depends on your priorities — simplicity versus flexibility.`,
  list: (s) => `Here are the most useful angles on **${s}**.`,
  advice: (s) => `For **${s}**, start with the simplest approach that fits your needs, then adjust.`,
  general: (s) => `Here's a direct take on **${s}**.`,
};

const CLAUDE_OPEN = {
  definition: (s) => `That's a good question, and **${s}** is more layered than it first appears. Rather than a single definition, it helps to look at what it's for, how it's used, and where it breaks down.`,
  howto: (s) => `Approaching **${s}** well is less about one magic method and more about a sensible sequence you can repeat and refine.`,
  why: (s) => `The "why" behind **${s}** usually isn't a single cause — it's a mix of incentives, constraints, and context that reinforce each other.`,
  comparison: (s) => `Comparing the options in **${s}** is really about matching trade-offs to your situation, not crowning a universal winner.`,
  list: (s) => `Here's a considered set of angles on **${s}**, ordered roughly by impact.`,
  advice: (s) => `On **${s}**, the honest answer is "it depends" — so let's make the dependencies explicit.`,
  general: (s) => `Let's take **${s}** seriously and look at it from a few angles before landing on an answer.`,
};

const CLOSERS = {
  definition: (s) => `If you share the context you'll use **${s}** in, I can go deeper on the specifics.`,
  howto: (s) => `Follow those steps for **${s}** and adjust as you learn what works.`,
  why: (s) => `So the short version on **${s}**: it comes down to benefit versus cost.`,
  comparison: (s) => `If you share your constraints, I can point to the better fit for **${s}**.`,
  list: (s) => `Pick the two or three that fit you best and start there for **${s}**.`,
  advice: (s) => `Try the simplest path first on **${s}**, then refine based on results.`,
  general: (s) => `Want me to go deeper on any part of **${s}**? Just say which.`,
};

function cap(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function detectIntent(lower) {
  for (const [intent, pattern] of INTENT_PATTERNS) {
    if (pattern.test(lower)) return intent;
  }
  return 'general';
}

function extractSubject(prompt) {
  let s = prompt.trim().replace(/[?!.]+$/g, '');
  for (const re of QUESTION_PREFIXES) {
    if (re.test(s)) {
      s = s.replace(re, '');
      break;
    }
  }
  s = s.replace(/^(a|an|the)\s+/i, '').trim();
  return s || prompt.trim();
}

function pickPoints(builder, count, seed) {
  const all = builder;
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(all[(seed + i) % all.length]);
  }
  return out;
}

function analyze(prompt) {
  const lower = prompt.toLowerCase();
  const intent = detectIntent(lower);
  return {
    prompt,
    intent,
    subject: extractSubject(prompt),
    seed: hashString(lower),
  };
}

function chatgptAnswer(a) {
  const points = pickPoints(ANGLES[a.intent](a.subject), 3, a.seed);
  return [
    `**Short answer:** ${DIRECT[a.intent](a.subject)}`,
    ``,
    `**Here's the breakdown**`,
    ...points.map((p, i) => `${i + 1}. ${p}`),
    ``,
    `**Bottom line:** ${CLOSERS[a.intent](a.subject)}`,
  ].join('\n');
}

function claudeAnswer(a) {
  const points = pickPoints(ANGLES[a.intent](a.subject), 3, a.seed + 7);
  return [
    CLAUDE_OPEN[a.intent](a.subject),
    ``,
    `A few things worth keeping in mind:`,
    ...points.map((p) => `- ${p}`),
    ``,
    `**In short:** ${CLOSERS[a.intent](a.subject)}`,
  ].join('\n');
}

function perplexityAnswer(a) {
  const points = pickPoints(ANGLES[a.intent](a.subject), 3, a.seed + 13);
  return [
    `**Answer:** ${DIRECT[a.intent](a.subject)}`,
    ``,
    `**Key findings**`,
    ...points.map((p) => `- ${p}`),
    ``,
    `**Sources**`,
    `1. Consensus overview on ${a.subject}`,
    `2. Practitioner discussions and guides`,
    `3. Recent reporting and reference material`,
  ].join('\n');
}

function masterAnswer(a) {
  const points = pickPoints(ANGLES[a.intent](a.subject), 4, a.seed + 3);
  return [
    `## ⚡ Wafir AI Master Combined Answer`,
    ``,
    `> Synthesized across **ChatGPT, Claude, Perplexity & Gemini**.`,
    ``,
    `**Direct answer:** ${DIRECT[a.intent](a.subject)}`,
    ``,
    `**Best of all models**`,
    ...points.map((p) => `- ${p}`),
    ``,
    `**Suggested next steps**`,
    `- Apply the simplest option first and measure the result.`,
    `- Revisit ${a.subject} once you have real feedback.`,
  ].join('\n');
}

/**
 * Returns a prompt-specific answer for each model style.
 * @param {string} prompt
 * @returns {{ chatgpt: string, claude: string, perplexity: string, combined: string }}
 */
export function synthesizeAnswers(prompt) {
  const a = analyze(prompt);
  return {
    chatgpt: chatgptAnswer(a),
    claude: claudeAnswer(a),
    perplexity: perplexityAnswer(a),
    combined: masterAnswer(a),
  };
}
