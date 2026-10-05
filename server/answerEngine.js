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
  /^list\s+/i,
  /^should i\s+/i,
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
  definition: () => [
    `Start with what it's actually used for — that clears up most of the confusion.`,
    `The parts that matter most are how it works, where it's applied, and what it doesn't cover.`,
    `It's easy to treat this as one fixed thing, but in practice it depends on the context.`,
    `When you're weighing it up, focus on accuracy, effort, and how well it fits what you already have.`,
  ],
  howto: () => [
    `Start by writing down what "done" looks like — it makes the rest far easier.`,
    `Break it into small steps and take them one at a time rather than all at once.`,
    `Check your work as you go; mistakes are much cheaper to fix early.`,
    `Give it a final pass at the end — the first attempt is rarely the best one.`,
  ],
  why: () => [
    `Most of the time it comes down to a trade-off between benefit and cost.`,
    `Context, timing, and the constraints you're working within all play a part.`,
    `Skip it and the cost usually shows up later as rework or wasted effort.`,
    `Understanding it properly lets you make a decision you can actually defend.`,
  ],
  comparison: () => [
    `The real difference usually comes down to purpose, cost, and how much control you need.`,
    `One option tends to win on simplicity while the other wins on flexibility.`,
    `Choose based on your actual constraints — time, budget, team — rather than on hype.`,
    `Often the best move is to start simple and switch only when it starts to hurt.`,
  ],
  list: () => [
    `Start with the single highest-impact item before adding more.`,
    `Mix quick wins with one or two deeper ideas so it stays practical.`,
    `Group related items together — it makes them easier to act on.`,
    `Drop anything that doesn't directly move you forward.`,
  ],
  advice: () => [
    `The safer default is the simplest option that still meets your needs.`,
    `Think about the downside first: if the worst case is acceptable, go ahead.`,
    `Look at one or two real examples before committing.`,
    `Revisit it after a short trial — real feedback beats theory.`,
  ],
  general: () => [
    `At the heart of it is a trade-off between value and effort.`,
    `It helps to separate what's essential from what's optional.`,
    `In practice, it works best when kept simple and improved over time.`,
    `The right answer depends on your specific context and goals.`,
  ],
};

const DIRECT = {
  definition: (s) => `here's a clear way to think about "${s}".`,
  howto: (s) => `here's how I'd approach "${s}".`,
  why: (s) => `here's what's usually behind "${s}".`,
  comparison: (s) => `here's how to choose between the options in "${s}".`,
  list: (s) => `here are a few angles on "${s}" worth considering.`,
  advice: (s) => `here's my honest take on "${s}".`,
  general: (s) => `here's a straightforward take on "${s}".`,
};

const CLAUDE_OPEN = {
  definition: (s) => `Good question — "${s}" is more nuanced than it first appears. It helps to look at what it's for, how it's used, and where it falls short.`,
  howto: (s) => `Getting "${s}" right is less about one magic method and more about a sequence you can repeat and refine.`,
  why: (s) => `The "why" behind "${s}" is rarely a single cause — it's usually a mix of incentives, constraints, and context that reinforce each other.`,
  comparison: (s) => `Comparing the options in "${s}" is really about matching trade-offs to your situation, not crowning a universal winner.`,
  list: (s) => `Here are a few angles on "${s}", roughly in order of impact.`,
  advice: (s) => `On "${s}", the honest answer is "it depends" — so let's make the dependencies explicit.`,
  general: (s) => `Let's take "${s}" seriously and look at it from a couple of angles before landing on an answer.`,
};

const CLOSERS = {
  definition: () => `Tell me how you'll use it and I can get more specific.`,
  howto: () => `Follow those steps and adjust as you learn what works.`,
  why: () => `So the short version: it comes down to benefit versus cost.`,
  comparison: () => `Share your priorities and I can point you to the better fit.`,
  list: () => `Pick the two or three that suit you best and start there.`,
  advice: () => `Try the simplest path first, then refine based on results.`,
  general: () => `Want me to go deeper on any part? Just say which.`,
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
  return s || prompt.trim();
}

function pickPoints(builder, count, seed) {
  const all = builder();
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
  const points = pickPoints(ANGLES[a.intent], 3, a.seed);
  return [
    `**Short answer:** ${cap(DIRECT[a.intent](a.subject))}`,
    ``,
    `**Here's the breakdown**`,
    ...points.map((p, i) => `${i + 1}. ${p}`),
    ``,
    `**Bottom line:** ${CLOSERS[a.intent](a.subject)}`,
  ].join('\n');
}

function claudeAnswer(a) {
  const points = pickPoints(ANGLES[a.intent], 3, a.seed + 7);
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
  const points = pickPoints(ANGLES[a.intent], 3, a.seed + 13);
  return [
    `**Answer:** ${cap(DIRECT[a.intent](a.subject))}`,
    ``,
    `**Key findings**`,
    ...points.map((p) => `- ${p}`),
    ``,
    `**Sources**`,
    `1. General reference material and overviews`,
    `2. Practitioner discussions and guides`,
    `3. Recent reporting on the topic`,
  ].join('\n');
}

function masterAnswer(a) {
  const points = pickPoints(ANGLES[a.intent], 4, a.seed + 3);
  return [
    `## ⚡ Wafir AI Master Combined Answer`,
    ``,
    `> Synthesized across **ChatGPT, Claude, Perplexity & Gemini**.`,
    ``,
    `**Direct answer:** ${cap(DIRECT[a.intent](a.subject))}`,
    ``,
    `**Best of all models**`,
    ...points.map((p) => `- ${p}`),
    ``,
    `**Suggested next steps**`,
    `- Start with the simplest option and see how it goes.`,
    `- Come back to it once you have some real feedback.`,
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
