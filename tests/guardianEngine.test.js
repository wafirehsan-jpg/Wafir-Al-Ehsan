import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server/index.js';
import {
  analyzePeopleEvent,
  analyzeWaterResource,
  analyzeTextPrivacy,
  analyzeScamText,
  analyzeScamUrl,
  calculateRiskLevel
} from '../server/guardianEngine.js';

describe('AI UAE GUARDIAN Core Engine Unit Tests', () => {
  it('calculates risk levels accurately', () => {
    expect(calculateRiskLevel(15)).toBe('LOW');
    expect(calculateRiskLevel(40)).toBe('MODERATE');
    expect(calculateRiskLevel(65)).toBe('HIGH');
    expect(calculateRiskLevel(90)).toBe('CRITICAL');
  });

  it('analyzes people guardian events correctly', () => {
    const result = analyzePeopleEvent('person fall');
    expect(result.guardian).toBe('PEOPLE_GUARDIAN');
    expect(result.riskScore).toBe(94);
    expect(result.riskLevel).toBe('CRITICAL');
    expect(result.eventName).toBe('Possible Person Fall Detected');
    expect(result.notice).toContain('No facial recognition');
  });

  it('analyzes water resource leak anomaly', () => {
    const result = analyzeWaterResource(31, 45, 12);
    expect(result.guardian).toBe('RESOURCE_GUARDIAN');
    expect(result.riskScore).toBeGreaterThan(50);
    expect(result.potentialWaste.dailyLiters).toBeGreaterThan(0);
  });

  it('detects text privacy risks and provides safe rewrite', () => {
    const text = "My name is Ahmed and I live in Villa 24. Call me at 0501234567.";
    const result = analyzeTextPrivacy(text);
    expect(result.riskScore).toBeGreaterThan(50);
    expect(result.detectedTypes).toContain('Phone Number');
    expect(result.safeRewrite).not.toContain('0501234567');
  });

  it('detects scam warning signs in suspicious text', () => {
    const msg = "Congratulations! You won AED 50,000! Click link immediately!";
    const result = analyzeScamText(msg);
    expect(result.riskScore).toBeGreaterThan(70);
    expect(result.riskLevel).toBe('CRITICAL');
    expect(result.factors.length).toBeGreaterThan(0);
    expect(result.safeReply).toBeDefined();
  });

  it('analyzes URL safety parameters', () => {
    const url = "http://pay-verify-uae-portal.xyz/login";
    const result = analyzeScamUrl(url);
    expect(result.riskScore).toBeGreaterThan(60);
    expect(result.httpsAvailable).toBe(false);
  });
});

describe('AI UAE GUARDIAN Express API Integration Tests', () => {
  it('POST /api/people/analyze', async () => {
    const res = await request(app)
      .post('/api/people/analyze')
      .send({ scenario: 'smoke detected' });
    expect(res.status).toBe(200);
    expect(res.body.riskScore).toBe(88);
    expect(res.body.eventName).toBe('Visual Smoke Condition Detected');
  });

  it('POST /api/resources/analyze', async () => {
    const res = await request(app)
      .post('/api/resources/analyze')
      .send({ currentFlowRate: 31, durationMins: 45, baselineFlowRate: 12 });
    expect(res.status).toBe(200);
    expect(res.body.guardian).toBe('RESOURCE_GUARDIAN');
    expect(res.body.potentialWaste.dailyLiters).toBeDefined();
  });

  it('POST /api/privacy/analyze-text', async () => {
    const res = await request(app)
      .post('/api/privacy/analyze-text')
      .send({ text: 'Contact 0501234567 at ABC School' });
    expect(res.status).toBe(200);
    expect(res.body.detectedTypes).toContain('Phone Number');
  });

  it('POST /api/scams/analyze-text', async () => {
    const res = await request(app)
      .post('/api/scams/analyze-text')
      .send({ message: 'Pay AED 5 to reschedule your package delivery immediately' });
    expect(res.status).toBe(200);
    expect(res.body.category).toBe('DELIVERY_SCAM');
    expect(res.body.riskScore).toBeGreaterThan(50);
  });

  it('GET /api/demo/run returns 90s Expo demo script', async () => {
    const res = await request(app).get('/api/demo/run');
    expect(res.status).toBe(200);
    expect(res.body.durationSeconds).toBe(90);
    expect(res.body.script.length).toBe(5);
  });
});
