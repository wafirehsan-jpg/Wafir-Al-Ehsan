import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server/index.js';
import { generateMultiAiResponses } from '../server/aiService.js';

describe('Wafir AI Backend Engine Tests', () => {
  it('should generate multi-AI responses including Option 1, 2, 3, and Option 4 (Combined)', async () => {
    const result = await generateMultiAiResponses('What is artificial intelligence?');

    expect(result).toHaveProperty('options');
    expect(result.options).toHaveProperty('option1');
    expect(result.options).toHaveProperty('option2');
    expect(result.options).toHaveProperty('option3');
    expect(result.options).toHaveProperty('option4');

    expect(result.options.option4.isCombined).toBe(true);
    expect(result.options.option4.content).toContain('Wafir AI Master Combined Answer');
  });

  it('should respond to POST /api/chat with 200 and option payload', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ prompt: 'Explain quantum computing simply' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('options');
    expect(res.body.options.option4.title).toContain('Option 4');
  });

  it('should return 400 when prompt is empty', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ prompt: '' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
