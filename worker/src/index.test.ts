import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { env, SELF } from 'cloudflare:test';

declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database;
  }
}

const CREATE_ENQUIRIES = `
  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    operator TEXT NOT NULL,
    agent_id TEXT,
    model TEXT,
    use_case TEXT NOT NULL,
    scale TEXT,
    questions_json TEXT,
    contact_email TEXT NOT NULL,
    contact_webhook TEXT,
    created_at TEXT NOT NULL
  )
`;

const CREATE_RATE_LIMITS = `
  CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    last_request_at TEXT NOT NULL
  )
`;

const BASE_URL = 'http://example.com';
const ENDPOINT = `${BASE_URL}/api/agent-enquiry`;

const VALID_BODY = {
  operator: 'Acme Corp',
  use_case:
    'We run an AI agent that generates trading signals for a DeFi protocol and require Proof of Inference on each output.',
  contact: { email: 'eng@acmecorp.com' },
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return SELF.fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

beforeAll(async () => {
  await env.DB.batch([
    env.DB.prepare(CREATE_ENQUIRIES),
    env.DB.prepare(CREATE_RATE_LIMITS),
  ]);
});

beforeEach(async () => {
  await env.DB.prepare('DELETE FROM enquiries').run();
  await env.DB.prepare('DELETE FROM rate_limits').run();
});

describe('POST /api/agent-enquiry', () => {
  describe('202 accepted', () => {
    it('accepts a valid minimal request', async () => {
      const res = await post(VALID_BODY);
      expect(res.status).toBe(202);
      const body = await res.json<Record<string, unknown>>();
      expect(body.status).toBe('accepted');
      expect(body.reference_id).toMatch(/^enq_[0-9a-f]{8}$/);
      expect(body.message).toBeTypeOf('string');
      expect(body.estimated_response).toBe('P1D');
    });

    it('accepts all optional fields', async () => {
      const res = await post({
        ...VALID_BODY,
        agent_id: 'acme-trading-agent-v2',
        model: 'claude-sonnet-4-6',
        scale: '~50k inferences/day',
        questions: ['What latency overhead?', 'Do you support custom architectures?'],
        contact: { email: 'eng@acmecorp.com', webhook: 'https://acmecorp.com/webhooks/il' },
      });
      expect(res.status).toBe(202);
    });

    it('stores the enquiry in D1', async () => {
      await post(VALID_BODY);
      const row = await env.DB.prepare('SELECT * FROM enquiries').first<Record<string, unknown>>();
      expect(row).not.toBeNull();
      expect(row!.operator).toBe('Acme Corp');
      expect(row!.contact_email).toBe('eng@acmecorp.com');
      expect(row!.id).toMatch(/^enq_[0-9a-f]{8}$/);
    });

    it('stores questions as JSON', async () => {
      const questions = ['Question one?', 'Question two?'];
      await post({ ...VALID_BODY, questions });
      const row = await env.DB.prepare('SELECT questions_json FROM enquiries').first<{
        questions_json: string;
      }>();
      expect(JSON.parse(row!.questions_json)).toEqual(questions);
    });
  });

  describe('400 bad request', () => {
    it('rejects non-JSON body', async () => {
      const res = await SELF.fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not valid json{',
      });
      expect(res.status).toBe(400);
    });

    it('rejects missing operator', async () => {
      const { operator: _, ...body } = VALID_BODY;
      expect((await post(body)).status).toBe(400);
    });

    it('rejects empty operator', async () => {
      expect((await post({ ...VALID_BODY, operator: '   ' })).status).toBe(400);
    });

    it('rejects missing use_case', async () => {
      const { use_case: _, ...body } = VALID_BODY;
      expect((await post(body)).status).toBe(400);
    });

    it('rejects use_case shorter than 50 characters', async () => {
      const res = await post({ ...VALID_BODY, use_case: 'Too short.' });
      expect(res.status).toBe(400);
      const body = await res.json<{ message: string }>();
      expect(body.message).toContain('50 characters');
    });

    it('rejects missing contact', async () => {
      const { contact: _, ...body } = VALID_BODY;
      expect((await post(body)).status).toBe(400);
    });

    it('rejects contact without email', async () => {
      expect((await post({ ...VALID_BODY, contact: {} })).status).toBe(400);
    });

    it('rejects malformed contact.email', async () => {
      expect(
        (await post({ ...VALID_BODY, contact: { email: 'not-an-email' } })).status,
      ).toBe(400);
    });

    it('rejects questions with more than 10 items', async () => {
      const res = await post({ ...VALID_BODY, questions: new Array(11).fill('Question?') });
      expect(res.status).toBe(400);
    });

    it('rejects questions that is not an array', async () => {
      expect((await post({ ...VALID_BODY, questions: 'not an array' })).status).toBe(400);
    });
  });

  describe('429 rate limiting', () => {
    it('rejects a second submission from the same IP within 24 hours', async () => {
      await post(VALID_BODY);
      const res = await post(VALID_BODY);
      expect(res.status).toBe(429);
    });

    it('rate-limits by agent_id when provided, regardless of IP', async () => {
      const body = { ...VALID_BODY, agent_id: 'my-agent-id' };
      await post(body, { 'CF-Connecting-IP': '1.2.3.4' });
      const res = await post(body, { 'CF-Connecting-IP': '5.6.7.8' });
      expect(res.status).toBe(429);
    });

    it('allows a different agent_id through after the first is rate-limited', async () => {
      await post({ ...VALID_BODY, agent_id: 'agent-alpha' });
      const res = await post({ ...VALID_BODY, agent_id: 'agent-beta' });
      expect(res.status).toBe(202);
    });

    it('returns a rate limit error body', async () => {
      await post(VALID_BODY);
      const res = await post(VALID_BODY);
      const body = await res.json<{ error: string; message: string }>();
      expect(body.error).toBe('rate_limit_exceeded');
      expect(body.message).toBeTypeOf('string');
    });
  });
});
