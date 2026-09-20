import express from 'express';
import cors from 'cors';
import { generateMultiAiResponses } from './aiService.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint for Wafir AI Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const responses = await generateMultiAiResponses(prompt.trim());
    return res.json(responses);
  } catch (error) {
    console.error('Error generating Wafir AI responses:', error);
    return res.status(500).json({ error: 'Failed to process request in Wafir AI backend.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Wafir AI Engine', version: '1.0.0' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Wafir AI Server running on port ${PORT}`);
  });
}

export default app;
