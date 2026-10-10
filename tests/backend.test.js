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

  describe('EduVerse AI Platform API Endpoints', () => {
    it('should retrieve demo account role info', async () => {
      const res = await request(app).get('/api/eduverse/auth/current?role=teacher');
      expect(res.status).toBe(200);
      expect(res.body.account.name).toBe('Dr. Sarah Al-Maktoum');
      expect(res.body.allRoles).toContain('student');
    });

    it('should search OER library textbooks', async () => {
      const res = await request(app).get('/api/eduverse/library/search?query=fractions');
      expect(res.status).toBe(200);
      expect(res.body.results.length).toBeGreaterThan(0);
      expect(res.body.results[0].title).toContain('Mathematics');
    });

    it('should create and evaluate a custom AI agent in Agent Studio', async () => {
      const createRes = await request(app)
        .post('/api/eduverse/agents/create')
        .send({ name: 'Science Explorer Agent', supportedSubject: 'Science' });

      expect(createRes.status).toBe(201);
      const agentId = createRes.body.agent.id;

      const evalRes = await request(app).post(`/api/eduverse/agents/${agentId}/evaluate`);
      expect(evalRes.status).toBe(200);
      expect(evalRes.body.agent.published).toBe(true);
      expect(evalRes.body.agent.evalReport.subjectAccuracy).toContain('Passed');
    });

    it('should execute the 1-click Competition Demo Scenario and calculate score improvement', async () => {
      const res = await request(app).post('/api/eduverse/nova/demo-scenario');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.latestRecord.percentagePointImprovement).toBe(40);
    });
  });
});
