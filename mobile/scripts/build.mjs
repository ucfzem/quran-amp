import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installFonts } from './install-fonts.mjs';
import { obfuscate } from './obfuscate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(__dirname, '..', '..', 'index.html');
const WWW = path.join(ROOT, 'www');
const OUT_HTML = path.join(WWW, 'index.html');
const BRIDGE = path.join(WWW, 'js', 'native-bridge.js');

const GOOGLE_FONTS_RE = /<link[^>]*fonts\.googleapis\.com[^>]*>/i;
const NATIVE_STYLE = '<style>html, body { overscroll-behavior: none; }</style>';
const BRIDGE_TAG = '<script src="js/native-bridge.js"></script>';

export async function build(doObfuscate = true) {
  if (!fs.existsSync(SRC)) throw new Error('Source introuvable: ' + SRC);
  fs.mkdirSync(path.join(WWW, 'js'), { recursive: true });
  fs.mkdirSync(path.join(WWW, 'fonts'), { recursive: true });
  fs.mkdirSync(path.join(WWW, 'css'), { recursive: true });

  await installFonts(process.argv.includes('--force-fonts'));

  let html = fs.readFileSync(SRC, 'utf8');

  if (!GOOGLE_FONTS_RE.test(html)) throw new Error('Lien Google Fonts introuvable dans la source');
  html = html.replace(GOOGLE_FONTS_RE, '<link href="css/fonts.css" rel="stylesheet">');

  const m = /<script(?![^>]*\bsrc=)[^>]*>/.exec(html);
  if (!m) throw new Error('<script> principal introuvable');
  html = html.slice(0, m.index) + BRIDGE_TAG + '\n' + NATIVE_STYLE + '\n' + html.slice(m.index);

  fs.writeFileSync(OUT_HTML, html);

  const bridgeSrc = fs.readFileSync(path.join(__dirname, '..', 'www', 'js', 'native-bridge.js'), 'utf8');
  fs.writeFileSync(BRIDGE, bridgeSrc);

  if (doObfuscate) obfuscate(OUT_HTML);
  console.log('[build] www/ prêt:', OUT_HTML, fs.statSync(OUT_HTML).size, 'octets');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build().catch((e) => {
    console.error('[build] ERREUR:', e.message);
    process.exit(1);
  });
}
