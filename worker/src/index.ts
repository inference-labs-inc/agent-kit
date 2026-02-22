import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface Env {
  DB: D1Database;
}

interface ContactInput {
  email: string;
  webhook?: string;
}

interface EnquiryInput {
  operator: string;
  agent_id?: string;
  model?: string;
  use_case: string;
  scale?: string;
  questions?: string[];
  contact: ContactInput;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateReferenceId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `enq_${hex}`;
}

function validate(body: unknown): { data: EnquiryInput } | { errors: string[] } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { errors: ['Request body must be a JSON object'] };
  }

  const raw = body as Record<string, unknown>;
  const errors: string[] = [];

  if (!raw.operator || typeof raw.operator !== 'string' || raw.operator.trim() === '') {
    errors.push('operator is required');
  }

  if (!raw.use_case || typeof raw.use_case !== 'string') {
    errors.push('use_case is required');
  } else if (raw.use_case.length < 50) {
    errors.push('use_case must be at least 50 characters');
  }

  if (!raw.contact || typeof raw.contact !== 'object' || Array.isArray(raw.contact)) {
    errors.push('contact is required');
  } else {
    const contact = raw.contact as Record<string, unknown>;
    if (!contact.email || typeof contact.email !== 'string') {
      errors.push('contact.email is required');
    } else if (!isValidEmail(contact.email)) {
      errors.push('contact.email must be a valid email address');
    }
    if (contact.webhook !== undefined && typeof contact.webhook !== 'string') {
      errors.push('contact.webhook must be a string URI');
    }
  }

  if (raw.questions !== undefined) {
    if (!Array.isArray(raw.questions)) {
      errors.push('questions must be an array');
    } else if (raw.questions.length > 10) {
      errors.push('questions must not exceed 10 items');
    } else if (raw.questions.some((q) => typeof q !== 'string')) {
      errors.push('questions must be an array of strings');
    }
  }

  if (raw.agent_id !== undefined && typeof raw.agent_id !== 'string') {
    errors.push('agent_id must be a string');
  }
  if (raw.model !== undefined && typeof raw.model !== 'string') {
    errors.push('model must be a string');
  }
  if (raw.scale !== undefined && typeof raw.scale !== 'string') {
    errors.push('scale must be a string');
  }

  if (errors.length > 0) {
    return { errors };
  }

  const contact = raw.contact as Record<string, unknown>;
  return {
    data: {
      operator: (raw.operator as string).trim(),
      agent_id: raw.agent_id as string | undefined,
      model: raw.model as string | undefined,
      use_case: raw.use_case as string,
      scale: raw.scale as string | undefined,
      questions: raw.questions as string[] | undefined,
      contact: {
        email: contact.email as string,
        webhook: contact.webhook as string | undefined,
      },
    },
  };
}

const CONTENT_TYPES: Record<string, string> = {
  txt: 'text/plain; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  json: 'application/json',
  yaml: 'application/yaml',
};

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/inference-labs-inc/agent-kit/main';

const PROXIED_FILES = new Set([
  'llms.txt',
  'llms-full.txt',
  'inference-labs-brand-guide.md',
  'design-tokens.json',
  'agent-enquiry-api.yaml',
]);

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({ origin: '*' }));

app.get('/api/', async (c) => {
  return c.json({ message: 'Hello, world!' });
});

app.get('/agent-kit/:filename', async (c) => {
  const filename = c.req.param('filename');

  if (!PROXIED_FILES.has(filename)) {
    return c.json({ error: 'not_found', message: 'File not available at this endpoint.' }, 404);
  }

  const cache = caches.default;
  const cacheKey = new Request(c.req.url);

  const cached = await cache.match(cacheKey);
  if (cached) {
    const dateHeader = cached.headers.get('Date');
    const age = dateHeader
      ? Math.max(0, Math.floor((Date.now() - new Date(dateHeader).getTime()) / 1000))
      : 0;
    const headers = new Headers(cached.headers);
    headers.set('Age', String(age));
    headers.set('X-Cache', 'HIT');
    return new Response(cached.body, { status: cached.status, headers });
  }

  const ext = filename.split('.').pop() ?? '';
  const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';
  const githubUrl = `${GITHUB_RAW_BASE}/${filename}`;

  const upstream = await fetch(githubUrl);
  const body = await upstream.arrayBuffer();

  const responseHeaders = new Headers({
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    'X-Cache': 'MISS',
  });

  // Cache 2xx and 4xx; skip 5xx so transient GitHub errors don't poison the cache
  if (upstream.status < 500) {
    c.executionCtx.waitUntil(
      cache.put(cacheKey, new Response(body.slice(0), { status: upstream.status, headers: responseHeaders }))
    );
  }

  return new Response(body, { status: upstream.status, headers: responseHeaders });
});

app.post('/api/agent-enquiry', async (c) => {
  let rawBody: unknown;
  try {
    rawBody = await c.req.json();
  } catch {
    return c.json({ error: 'bad_request', message: 'Request body must be valid JSON' }, 400);
  }

  const result = validate(rawBody);
  if ('errors' in result) {
    return c.json({ error: 'bad_request', message: result.errors.join('; ') }, 400);
  }

  const { data } = result;

  const ip =
    c.req.header('CF-Connecting-IP') ||
    c.req.header('X-Forwarded-For')?.split(',')[0].trim() ||
    'unknown';
  const rateLimitKey = data.agent_id ? `agent:${data.agent_id}` : `ip:${ip}`;

  const now = new Date();
  const windowStart = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const rateRow = await c.env.DB.prepare(
    'SELECT last_request_at FROM rate_limits WHERE key = ?'
  )
    .bind(rateLimitKey)
    .first<{ last_request_at: string }>();

  if (rateRow && rateRow.last_request_at > windowStart) {
    return c.json(
      {
        error: 'rate_limit_exceeded',
        message: 'You may submit one enquiry per 24 hours. Please wait before submitting again.',
      },
      429
    );
  }

  const referenceId = generateReferenceId();
  const nowIso = now.toISOString();

  await c.env.DB.prepare(
    `INSERT INTO enquiries
       (id, operator, agent_id, model, use_case, scale, questions_json, contact_email, contact_webhook, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      referenceId,
      data.operator,
      data.agent_id ?? null,
      data.model ?? null,
      data.use_case,
      data.scale ?? null,
      data.questions ? JSON.stringify(data.questions) : null,
      data.contact.email,
      data.contact.webhook ?? null,
      nowIso
    )
    .run();

  await c.env.DB.prepare(
    `INSERT INTO rate_limits (key, last_request_at) VALUES (?, ?)
     ON CONFLICT (key) DO UPDATE SET last_request_at = excluded.last_request_at`
  )
    .bind(rateLimitKey, nowIso)
    .run();

  return c.json(
    {
      reference_id: referenceId,
      status: 'accepted',
      message:
        'Your enquiry has been received. The Inference Labs team will respond within 1 business day via your provided contact channel.',
      estimated_response: 'P1D',
    },
    202
  );
});

export default app;
