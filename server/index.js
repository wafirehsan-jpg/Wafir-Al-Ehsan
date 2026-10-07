import express from 'express';
import cors from 'cors';
import {
  analyzePeopleEvent,
  analyzeWaterResource,
  analyzeTextPrivacy,
  analyzeImagePrivacy,
  analyzeScamText,
  analyzeScamUrl,
  analyzeQrSafety,
  getExpoDemoScript
} from './guardianEngine.js';
import { generateMultiAiResponses } from './aiService.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Existing Chat & Multimodal endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, mode } = req.body;
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const responses = await generateMultiAiResponses(prompt.trim(), mode || 'chat');
    return res.json(responses);
  } catch (error) {
    console.error('Error generating Wafir AI responses:', error);
    return res.status(500).json({ error: 'Failed to process request in Wafir AI backend.' });
  }
});

// ==========================================
// AI UAE GUARDIAN - SPECIALIZED API ROUTES
// ==========================================

// 1. People Guardian Analysis
app.post('/api/people/analyze', (req, res) => {
  try {
    const { scenario, customData } = req.body || {};
    const result = analyzePeopleEvent(scenario, customData);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze people event.' });
  }
});

// 2. Resource Guardian Water Analysis
app.post('/api/resources/analyze', (req, res) => {
  try {
    const { currentFlowRate, durationMins, baselineFlowRate } = req.body || {};
    const flow = typeof currentFlowRate === 'number' ? currentFlowRate : 31;
    const dur = typeof durationMins === 'number' ? durationMins : 45;
    const base = typeof baselineFlowRate === 'number' ? baselineFlowRate : 12;

    const result = analyzeWaterResource(flow, dur, base);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze water resources.' });
  }
});

// 3. Privacy Guardian - Text Scanner
app.post('/api/privacy/analyze-text', (req, res) => {
  try {
    const { text } = req.body || {};
    const result = analyzeTextPrivacy(text);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze text privacy.' });
  }
});

// 4. Privacy Guardian - Image Scanner
app.post('/api/privacy/analyze-image', (req, res) => {
  try {
    const { imageName } = req.body || {};
    const result = analyzeImagePrivacy(imageName || 'Uploaded Image');
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze image privacy.' });
  }
});

// 5. Scam Guardian - Text Scanner
app.post('/api/scams/analyze-text', (req, res) => {
  try {
    const { message } = req.body || {};
    const result = analyzeScamText(message || '');
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze scam text.' });
  }
});

// 6. Scam Guardian - URL Scanner
app.post('/api/scams/analyze-url', (req, res) => {
  try {
    const { url } = req.body || {};
    const result = analyzeScamUrl(url || '');
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze URL.' });
  }
});

// 7. Scam Guardian - QR Code Scanner
app.post('/api/scams/analyze-qr', (req, res) => {
  try {
    const { imageName } = req.body || {};
    const result = analyzeQrSafety(imageName || 'Uploaded QR');
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to analyze QR code.' });
  }
});

// 8. Central Risk & Explainability Endpoint
app.post('/api/risk/explain', (req, res) => {
  try {
    const { score, category, factors } = req.body || {};
    return res.json({
      score: score || 87,
      level: score > 75 ? 'HIGH' : score > 50 ? 'MODERATE' : 'LOW',
      factors: factors || [],
      confidence: 90,
      formula: 'DETECT → EXPLAIN → RECOMMEND → HUMAN DECIDES',
      isDemo: true
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate explainability.' });
  }
});

// 9. Expo Demo Script Endpoint
app.get('/api/demo/run', (req, res) => {
  try {
    const script = getExpoDemoScript();
    return res.json({ script, durationSeconds: 90, totalSteps: script.length });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load expo demo script.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    name: 'AI UAE GUARDIAN Engine Core',
    version: '3.0.0',
    expoReady: true
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`AI UAE GUARDIAN Engine running on port ${PORT}`);
  });
}

export default app;
