/**
 * Keyless live AI client.
 * Calls the free Pollinations text API (OpenAI-compatible) so the app can
 * produce real model answers without any API key. If the service is
 * unavailable, the caller falls back to the offline answer engine.
 */

const ENDPOINT = 'https://text.pollinations.ai/openai?referrer=wafir-ai';
const MODEL = 'openai';
const TIMEOUT_MS = 25000;
const ATTEMPTS = 2;

export async function askRaw(system, user) {
  let lastError;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`AI service responded ${res.status}`);

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content || !content.trim()) throw new Error('Empty AI response');
      return content.trim();
    } catch (error) {
      lastError = error;
      if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, 1500));
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError;
}
