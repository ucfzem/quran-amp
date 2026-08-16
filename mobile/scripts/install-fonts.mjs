import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WWW = path.join(ROOT, 'www');
const FONTS_DIR = path.join(WWW, 'fonts');
const CSS_DIR = path.join(WWW, 'css');
const FONTS_CSS = path.join(CSS_DIR, 'fonts.css');

const FAMILIES =
  'family=Amiri:ital,wght@0,400;0,700;1,400&family=VT323&family=Tajawal:wght@400;700';
const CSS_URL = `https://fonts.googleapis.com/css2?${FAMILIES}&display=swap`;
const OLD_UA =
  'Mozilla/5.0 (Linux; U; Android 4.4; en-us; Nexus 5 Build/IMM76I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

function parseBlocks(css) {
  const blocks = [];
  const re = /@font-face\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const body = m[1];
    const get = (prop) => {
      const p = new RegExp(prop + '\\s*:\\s*([^;]+);').exec(body);
      return p ? p[1].trim() : null;
    };
    const src = /url\(([^)]+)\)/.exec(get('src') || '');
    blocks.push({
      family: get('font-family'),
      style: get('font-style') || 'normal',
      weight: get('font-weight') || '400',
      url: src ? src[1].replace(/["']/g, '') : null,
      range: get('unicode-range') || null,
    });
  }
  return blocks.filter((b) => b.url);
}

export async function installFonts(force = false) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  fs.mkdirSync(CSS_DIR, { recursive: true });

  if (!force && fs.existsSync(FONTS_CSS) && fs.readdirSync(FONTS_DIR).some((f) => f.endsWith('.ttf'))) {
    console.log('[fonts] déjà présents, skip.');
    return;
  }

  console.log('[fonts] téléchargement des polices Google Fonts (TTF)...');
  const res = await fetch(CSS_URL, { headers: { 'User-Agent': OLD_UA } });
  if (!res.ok) throw new Error('Google Fonts CSS: HTTP ' + res.status);
  const css = await res.text();
  const blocks = parseBlocks(css);
  console.log('[fonts]', blocks.length, 'blocs @font-face trouvés');

  const seen = new Set();
  let i = 0;
  for (const b of blocks) {
    if (!b.url || seen.has(b.url)) continue;
    seen.add(b.url);
    let name = path.basename(b.url.split('?')[0]);
    if (!/\.(ttf|otf)$/i.test(name)) name += '.ttf';
    let fname = name;
    let n = 1;
    while (fs.existsSync(path.join(FONTS_DIR, fname)) && n < 50) {
      fname = `${path.basename(name, path.extname(name))}_${n}${path.extname(name)}`;
      n++;
    }
    const fr = await fetch(b.url, { headers: { 'User-Agent': OLD_UA } });
    if (!fr.ok) { console.log('[fonts] ECHEC', b.url, fr.status); continue; }
    const buf = Buffer.from(await fr.arrayBuffer());
    fs.writeFileSync(path.join(FONTS_DIR, fname), buf);
    b.localFile = fname;
    i++;
    console.log('[fonts]', fname, buf.length, 'o');
  }

  const cssLines = blocks
    .filter((b) => b.localFile)
    .map((b) => {
      let rule = `@font-face {\n  font-family: '${b.family.replace(/'/g, "\\'")}';\n  font-style: ${b.style};\n  font-weight: ${b.weight};\n  src: url('../fonts/${b.localFile}') format('${b.url && /\.otf$/i.test(b.url.split('?')[0]) ? 'opentype' : 'truetype'}');`;
      if (b.range) rule += `\n  unicode-range: ${b.range};`;
      rule += '\n}\n';
      return rule;
    })
    .join('\n');

  fs.writeFileSync(FONTS_CSS, cssLines);
  console.log('[fonts] OK:', i, 'fichiers, css/fonts.css écrit.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  installFonts(process.argv.includes('--force')).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
