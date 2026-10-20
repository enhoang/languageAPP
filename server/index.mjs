// Conversation Practice backend. Holds the Anthropic API key (env ANTHROPIC_API_KEY) on the server; the browser
// only ever talks to this server. Deploy as a Node web service (e.g. Render "Web Service"), separate from the
// static frontend. See server/README.md.
import { createServer } from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import Anthropic from '@anthropic-ai/sdk';
import { InputError, UpstreamError, config, parseRequest, runAction } from './conversation.mjs';

const MAX_BODY = 200_000;

/** Fixed-window rate limit per client IP. */
export function rateLimiter({ limit, windowMs, now = () => Date.now() }) {
  const hits = new Map();
  return (key) => {
    const t = now();
    const h = hits.get(key);
    if (!h || t - h.start >= windowMs) {
      hits.set(key, { start: t, count: 1 });
      if (hits.size > 10_000) for (const [k, v] of hits) if (t - v.start >= windowMs) hits.delete(k);
      return true;
    }
    h.count += 1;
    return h.count <= limit;
  };
}

const sameSecret = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

/** Build the request handler. `client` is injectable for tests. */
export function createHandler({ client, env = process.env }) {
  const cfg = config(env);
  const origins = (env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const accessCode = env.CONVERSATION_ACCESS_CODE || '';
  const allow = rateLimiter({ limit: Number(env.RATE_LIMIT ?? 60), windowMs: Number(env.RATE_WINDOW_MINUTES ?? 15) * 60_000 });

  const cors = (req, res) => {
    const origin = req.headers.origin;
    if (origin && (origins.includes('*') || origins.includes(origin))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Access-Code');
      res.setHeader('Access-Control-Max-Age', '600');
    }
  };
  const send = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(body));
  };

  return async (req, res) => {
    cors(req, res);
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (req.method === 'OPTIONS') return res.writeHead(204).end();
    if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/api/conversation/health')) {
      return send(res, 200, { ok: true, service: 'conversation', model: cfg.model, accessCodeRequired: Boolean(accessCode) });
    }
    if (url.pathname !== '/api/conversation') return send(res, 404, { error: 'not found' });
    if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });
    if (req.headers.origin && !(origins.includes('*') || origins.includes(req.headers.origin))) return send(res, 403, { error: 'origin not allowed' });
    if (accessCode && !sameSecret(req.headers['x-access-code'] ?? '', accessCode)) return send(res, 401, { error: 'access code required' });
    const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? '').split(',')[0].trim();
    if (!allow(ip)) return send(res, 429, { error: 'Too many requests. Wait a few minutes and try again.' });

    let raw = '';
    try {
      for await (const chunk of req) {
        raw += chunk;
        if (raw.length > MAX_BODY) return send(res, 413, { error: 'request too large' });
      }
      const parsed = parseRequest(JSON.parse(raw));
      const result = await runAction(client, parsed, cfg);
      return send(res, 200, result);
    } catch (e) {
      if (e instanceof SyntaxError) return send(res, 400, { error: 'invalid JSON' });
      if (e instanceof InputError) return send(res, 400, { error: e.message });
      if (e instanceof UpstreamError) return send(res, e.status, { error: e.message });
      console.error(e);
      return send(res, 500, { error: 'internal error' });
    }
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set. Set it in the server environment (never in the frontend).');
    process.exit(1);
  }
  if (!process.env.ALLOWED_ORIGINS) console.warn('ALLOWED_ORIGINS is not set: browsers will be refused. Set it to your site URL, e.g. https://your-app.onrender.com');
  const port = Number(process.env.PORT ?? 8787);
  createServer(createHandler({ client: new Anthropic() })).listen(port, () => console.log(`Conversation server on :${port} (model ${config().model})`));
}
