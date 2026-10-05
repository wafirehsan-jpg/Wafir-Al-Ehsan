/**
 * Live multi-voice answers via Hugging Face inference.
 * One request per user prompt returns all four option answers, each written in
 * that model's voice.
 */

import { askRaw } from './huggingfaceClient.js';

const SYSTEM_PROMPT = `You are Wafir AI, an assistant that answers a user's question in four distinct expert voices.
Return ONLY the following markers, each on its own line, with that voice's answer beneath it. Do not add any other text or commentary.

<<<CHATGPT>>>
Answer as ChatGPT by OpenAI: a concise direct answer, then a short structured breakdown. Markdown allowed.
<<<CLAUDE>>>
Answer as Claude by Anthropic: a thoughtful, nuanced, well-reasoned response with a few supporting points. Markdown allowed.
<<<PERPLEXITY>>>
Answer as Perplexity and Gemini: a direct factual answer, then key findings as bullets, then a short "Sources" list. Markdown allowed.
<<<COMBINED>>>
Answer as Wafir AI Master: the single best, most complete answer, with a direct answer, key points, and suggested next steps. Markdown allowed.`;

const MARKERS = [
  ['chatgpt', '<<<CHATGPT>>>'],
  ['claude', '<<<CLAUDE>>>'],
  ['perplexity', '<<<PERPLEXITY>>>'],
  ['combined', '<<<COMBINED>>>'],
];

function parseMarkers(raw) {
  const found = [];
  for (const [key, marker] of MARKERS) {
    const index = raw.indexOf(marker);
    if (index === -1) return null;
    found.push({ key, marker, index });
  }

  found.sort((a, b) => a.index - b.index);

  const answers = {};
  for (let i = 0; i < found.length; i++) {
    const start = found[i].index + found[i].marker.length;
    const end = i + 1 < found.length ? found[i + 1].index : raw.length;
    const text = raw.slice(start, end).trim();
    if (!text) return null;
    answers[found[i].key] = text;
  }

  return answers;
}

export async function fetchLiveAnswers(prompt) {
  const raw = await askRaw(SYSTEM_PROMPT, prompt);
  const answers = parseMarkers(raw);
  if (!answers) throw new Error('Could not parse AI response');
  return answers;
}
