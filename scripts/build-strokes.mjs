// Builds src/courses/zh/strokes/data.json: stroke-order data for every character the Chinese course uses
// (the `text` of each word in src/courses/zh/words.ts and the `chars` of every `strokes` lesson section).
//
// Source: the `hanzi-writer-data` package (devDependency), derived from Make Me a Hanzi
// (https://github.com/skishore/makemeahanzi), whose stroke graphics come from fonts by Arphic Technology
// released under the Arphic Public License (see node_modules/hanzi-writer-data/ARPHICPL.TXT).
//
// Usage: npm run strokes
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const zh = path.join(root, 'src/courses/zh');
const require = createRequire(import.meta.url);
const dataDir = path.dirname(require.resolve('hanzi-writer-data/package.json'));

const isHan = (c) => /\p{Script=Han}/u.test(c);
const chars = new Set();
const addAll = (str) => { for (const c of str) if (isHan(c)) chars.add(c); };

// Word texts: `text: '…'` entries in words.ts.
const words = fs.readFileSync(path.join(zh, 'words.ts'), 'utf8');
for (const m of words.matchAll(/\btext: '([^']*)'/g)) addAll(m[1]);

// `strokes` sections in the lessons: { kind: 'strokes', …, chars: ['一', …] }.
const lessonDir = path.join(zh, 'lessons');
for (const file of fs.readdirSync(lessonDir).filter((f) => f.endsWith('.ts')).sort()) {
  const src = fs.readFileSync(path.join(lessonDir, file), 'utf8');
  for (const m of src.matchAll(/kind: 'strokes'[\s\S]*?chars: \[([^\]]*)\]/g)) {
    for (const s of m[1].matchAll(/'([^']*)'/g)) addAll(s[1]);
  }
}

const out = {};
const missing = [];
for (const c of [...chars].sort()) {
  const file = path.join(dataDir, `${c}.json`);
  if (!fs.existsSync(file)) { missing.push(c); continue; }
  const { strokes, medians, radStrokes } = JSON.parse(fs.readFileSync(file, 'utf8'));
  out[c] = radStrokes ? { strokes, medians, radStrokes } : { strokes, medians };
}

const target = path.join(zh, 'strokes/data.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify(out) + '\n');
const kb = (fs.statSync(target).size / 1024).toFixed(1);
console.log(`strokes: ${Object.keys(out).length} characters, ${kb} KB → ${path.relative(root, target)}`);
if (missing.length) console.warn(`strokes: no data for ${missing.join(' ')}`);
