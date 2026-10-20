# Conversation Practice server

A small Node server for the app's **Conversation practice** feature. It keeps the Anthropic API key on the server
and calls Claude for each conversation turn, word suggestion and end-of-session summary. The browser only talks to
this server, never to Anthropic directly. No API key ever goes into the frontend code or into `VITE_*` variables,
which Vite bundles into the browser.

Without this server the app still works: Conversation practice runs in **demo mode**, a set of prewritten scenario
dialogues. The demo is clearly labelled and does not pretend to understand what the learner writes.

## Cost

The Anthropic API is **paid per use**, billed to the account that owns `ANTHROPIC_API_KEY`. The default model is
`claude-opus-5-5` ($4 per million input tokens, $20 per million output tokens). One conversation turn sends the
scenario instructions plus the transcript so far and gets back the reply, feedback and suggested answers. Expect
roughly 1–3 US cents per turn, more for long conversations. To lower the cost, set a cheaper model:
`CONVERSATION_MODEL=claude-sonnet-5-5` ($2 / $10) or `claude-haiku-5-5` ($0.10 / $0.50). Quality of feedback and
pronunciation details drops with smaller models. Set a monthly spend limit in the Anthropic Console.

## Run locally

```bash
cd server
npm install
ANTHROPIC_API_KEY=sk-ant-... ALLOWED_ORIGINS=http://localhost:5173 npm start
# → Conversation server on :8787
```

Then in the app open **Conversation practice → AI connection**, enter `http://localhost:8787`, and press
**Test connection**.

## Deploy on Render

The frontend can stay a Render **Static Site**. Add a second service for this server:

1. Render → New → **Web Service** → this repository.
2. Root directory: `server`. Build command: `npm install`. Start command: `npm start`. Runtime: Node.
3. Environment variables:
   - `ANTHROPIC_API_KEY`: from console.anthropic.com. Secret; set it only here.
   - `ALLOWED_ORIGINS`: your static site URL, e.g. `https://your-app.onrender.com`. Use a comma-separated list for
     several URLs. Requests from other websites are refused.
   - `CONVERSATION_ACCESS_CODE` (recommended): any passphrase. Anyone who finds the server URL could otherwise use
     your API credit. Learners enter this code once in the app's connection settings.
   - Optional: `CONVERSATION_MODEL`, `CONVERSATION_EFFORT` (`low` by default), `RATE_LIMIT` (requests per IP per
     window, default 60), `RATE_WINDOW_MINUTES` (default 15), `CONVERSATION_FALLBACKS=off`.
4. Point the app at the server, in either of two ways:
   - Learners enter the server URL in **AI connection**.
   - Set `VITE_CONVERSATION_API_URL=https://your-server.onrender.com` on the **static site** and redeploy. This is a
     public URL, not a secret.

On Render's free plan, a web service sleeps after a period without traffic. The first request after that can take up
to a minute or so.

## API

`GET /health` → `{ ok, service, model, accessCodeRequired }`

`POST /api/conversation` with JSON `{ action, setup, history, feedback?, hintLevel? }`:
- `action`: `start` | `reply` | `suggest` | `summary`
- `setup`: `{ lang: zh|en|ko, level: beginner|elementary|intermediate|advanced, scenario, customTopic?, mode: guided|free, explainLang: vi|en|zh }`
- `history`: `[{ role: partner|learner, text }]`, at most 80 messages of at most 1000 characters each

Header `X-Access-Code` when `CONVERSATION_ACCESS_CODE` is set.

The model returns JSON in a fixed schema (structured outputs). The server checks it before passing it on:
- Replies must be in the target language's script.
- Pronunciation fields from another language's system are removed: only pinyin for Chinese, IPA and respelling for
  English, romanization and the Hangul actual pronunciation for Korean.
- AI-generated pronunciations are marked as such, and the app shows that label.

Refusals and errors come back as `{ error }` with an HTTP status: 400 input, 401 access code, 403 origin,
429/503 busy, 422 declined, 502 upstream.

## Tests

`npx vitest run server/server.test.mjs` from the repository root. The tests use a stand-in for the Anthropic client,
so they need no API key and cost nothing.
