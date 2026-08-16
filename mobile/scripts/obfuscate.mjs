import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import JavaScriptObfuscator from 'javascript-obfuscator';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HTML = path.join(ROOT, 'www', 'index.html');

const OBFUSCATOR_OPTIONS = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: false,
  splitStrings: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  target: 'browser',
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
};

function extractInlineScripts(html) {
  const out = [];
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) out.push({ start: m.index, end: m.index + m[0].length, code: m[1] });
  return out;
}

export function obfuscate(htmlPath = HTML) {
  if (!fs.existsSync(htmlPath)) throw new Error('introuvable: ' + htmlPath);
  let html = fs.readFileSync(htmlPath, 'utf8');
  const blocks = extractInlineScripts(html);
  if (!blocks.length) throw new Error('aucun <script> inline à obfusquer');

  for (const b of blocks) {
    if (!b.code.trim()) continue;
    const result = JavaScriptObfuscator.obfuscate(b.code, OBFUSCATOR_OPTIONS);
    const obfuscated = result.getObfuscatedCode();
    html = html.slice(0, b.start) + html.slice(b.start, b.end).replace(b.code, obfuscated) + html.slice(b.end);
  }

  fs.writeFileSync(htmlPath, html);

  const check = extractInlineScripts(html)[0];
  if (check) {
    const tmp = path.join(ROOT, 'www', '.check.js');
    fs.writeFileSync(tmp, check.code);
    try {
      execFileSync('node', ['--check', tmp], { stdio: 'pipe' });
    } catch (e) {
      throw new Error('JS obfusqué invalide: ' + e.message);
    } finally {
      fs.unlinkSync(tmp);
    }
  }
  console.log('[obfuscate] OK:', blocks.length, 'script(s) obfusqué(s).');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    obfuscate();
  } catch (e) {
    console.error('[obfuscate] ERREUR:', e.message);
    process.exit(1);
  }
}
