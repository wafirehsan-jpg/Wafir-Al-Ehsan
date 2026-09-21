import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server/index.js';
import { generateMultiAiResponses } from '../server/aiService.js';

describe('Wafir AI Multimodal Backend Suite', () => {
  it('should generate chat mode responses', async () => {
    const result = await generateMultiAiResponses('Explain AI', 'chat');
    expect(result.options.option4.isCombined).toBe(true);
  });

  it('should support image generation mode', async () => {
    const result = await generateMultiAiResponses('Futuristic city', 'image');
    expect(result).toHaveProperty('mediaUrls');
    expect(result.mediaUrls).toHaveProperty('option4');
  });

  it('should support website generation mode with code artifact', async () => {
    const result = await generateMultiAiResponses('Portfolio site', 'website');
    expect(result).toHaveProperty('code');
    expect(result.code).toContain('<!DOCTYPE html>');
  });

  it('should support agent generation mode with agent spec', async () => {
    const result = await generateMultiAiResponses('Web Scraper', 'agent');
    expect(result).toHaveProperty('agentSpec');
    expect(result.agentSpec.tools).toContain('Web Search');
  });

  it('should handle POST /api/chat with different modes', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ prompt: 'Build a task tracker app', mode: 'app' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('artifactType', 'react');
  });
});
