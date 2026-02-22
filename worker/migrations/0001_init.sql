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
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  last_request_at TEXT NOT NULL
);
