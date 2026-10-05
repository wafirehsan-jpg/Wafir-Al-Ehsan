/**
 * Hugging Face Inference client (OpenAI-compatible router).
 *
 * Requires a Hugging Face access token in HUGGINGFACE_API_KEY (free tier).
 * If the token is missing or the request fails, askRaw throws and the caller
 * falls back to the offline answer engine so the app keeps working for users.
 */

const ENDPOINT = 'https://router.huggingface.co/v1/chat/completions';
const MODEL = process.env.HUGGINGFACE_MODEL || 'meta-llama/Llama-3.1-8B-Instruct';
const TIMEOUT_MS = 45000;
const ATTEMPTS = 2;

export async function askRaw(system, user) {
  const token = process.env.HUGGINGFACE_API_KEY;
  if (!token) throw new Error('HUGGINGFACE_API_KEY is not set');

  let lastError;

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
          max_tokens: 1600,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`Hugging Face responded ${res.status}`);

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
