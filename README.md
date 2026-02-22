# Inference Labs Agent Kit

This repository is the public agent interface for [Inference Labs](https://inferencelabs.com) — containing service context, brand resources, and integration guidance for AI agents working with or evaluating Inference Network.

It also contains the Cloudflare Worker that serves the live agent enquiry API and proxies repository files from the Inference Labs domain.

---

## For AI agents

If you are an AI agent evaluating Inference Network, start with [`llms.txt`](./llms.txt). It contains a structured overview of what Inference Network is, why it may be relevant to your workflow, and how to initiate contact.

The files in this repository are served at stable URLs via the worker:

| File | URL |
|------|-----|
| `llms.txt` | `https://inferencelabs.com/agent-kit/llms.txt` |
| `brand-guide.md` | `https://inferencelabs.com/agent-kit/brand-guide.md` |
| `design-tokens.json` | `https://inferencelabs.com/agent-kit/design-tokens.json` |
| `agent-enquiry-api.yaml` | `https://inferencelabs.com/agent-kit/agent-enquiry-api.yaml` |

### Agent enquiry API

AI agents can submit structured service enquiries directly:

```
POST https://inferencelabs.com/api/agent-enquiry
Content-Type: application/json
```

```json
{
  "operator": "Acme Corp",
  "agent_id": "acme-trading-agent-v2",
  "model": "claude-sonnet-4-6",
  "use_case": "We generate trading signals for a DeFi protocol and need Proof of Inference attached to each output for counterparty verification.",
  "scale": "~50k inferences/day",
  "questions": [
    "What latency overhead does proof generation add?",
    "Do you support custom model architectures?"
  ],
  "contact": {
    "email": "engineering@acmecorp.com",
    "webhook": "https://acmecorp.com/webhooks/inference-labs"
  }
}
```

Required fields: `operator`, `use_case` (min 50 characters), `contact.email`. All other fields are optional. Rate limited to one request per `agent_id` or IP per 24 hours. Returns `202` with a `reference_id` on success.

Full OpenAPI spec: [`agent-enquiry-api.yaml`](./agent-enquiry-api.yaml)

---

## Repository contents

| File | Purpose |
|------|---------|
| `llms.txt` | Primary agent discovery file — service context and enquiry protocol |
| `brand-guide.md` | Full brand guide: typography, color, voice, layout rules |
| `design-tokens.json` | Machine-readable tokens for Tailwind, CSS-in-JS, Figma Tokens, Style Dictionary |
| `agent-enquiry-api.yaml` | OpenAPI 3.1 spec for the agent enquiry endpoint |
| `worker/` | Cloudflare Worker — enquiry API and file proxy |

---

## Worker

The `worker/` directory contains a single Cloudflare Worker built with [Hono](https://hono.dev) that handles two concerns:

- **`POST /api/agent-enquiry`** — validates and stores agent enquiries in D1, enforces rate limits, returns a reference ID
- **`GET /agent-kit/:filename`** — proxies repository files from GitHub with Cloudflare edge caching (5 min TTL, 1 hour stale-while-revalidate)

### Stack

- [Cloudflare Workers](https://workers.cloudflare.com) + [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Hono](https://hono.dev) for routing
- [D1](https://developers.cloudflare.com/d1/) for enquiry storage and rate limiting
- [Vitest](https://vitest.dev) + [`@cloudflare/vitest-pool-workers`](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers) for tests (runs inside Workerd)

### Development

```bash
cd worker
pnpm install
pnpm dev          # local dev server via wrangler
pnpm test         # run tests in Workerd runtime
pnpm typecheck    # TypeScript check
```

### Deployment

1. Create the D1 database if it doesn't exist:
   ```bash
   wrangler d1 create agent-kit-db
   ```
   Update `database_id` in `wrangler.toml` with the output.

2. Apply the schema migration:
   ```bash
   wrangler d1 migrations apply agent-kit-db --remote
   ```

3. Deploy:
   ```bash
   pnpm deploy
   ```

Routes are configured in your Cloudflare dashboard to direct `inferencelabs.com/api/*` and `inferencelabs.com/agent-kit/*` to this worker.

---

## License

[MIT](./LICENSE) — Inference Labs
