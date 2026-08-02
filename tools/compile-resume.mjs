/**
 * Compiles every resume.<lang>.tex and binds them into ONE assets/pdf/Resume.pdf
 * — the single file every "Download CV" button points at, whatever language the
 * visitor is reading. The default language leads, the rest follow in the order
 * declared in data.json.
 *
 * Two pdflatex passes per language: moderncv needs the second one to settle its
 * bookmarks. Aux files land in .build/ so they never clutter the repo root.
 *
 * Run: node tools/compile-resume.mjs      (from the repo root)
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { languagesIn } from './i18n.mjs';

const root = path.resolve('.');
const BUILD = path.join(root, '.build');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data.json'), 'utf8'));
const DEFAULT_LANG = data.defaultLanguage || 'en';
const LANGS = languagesIn(data);
if (!LANGS.includes(DEFAULT_LANG)) LANGS.unshift(DEFAULT_LANG);

fs.mkdirSync(BUILD, { recursive: true });

const compiled = [];
let failures = 0;

for (const lang of LANGS) {
  const tex = path.join(root, `resume.${lang}.tex`);
  if (!fs.existsSync(tex)) {
    console.error(`resume.${lang}.tex is missing — run \`npm run build\` first.`);
    failures++;
    continue;
  }

  let ok = true;
  for (const pass of [1, 2]) {
    try {
      execFileSync(
        'pdflatex',
        ['-interaction=nonstopmode', '-halt-on-error', `-output-directory=${BUILD}`, tex],
        { stdio: 'pipe' }
      );
    } catch (err) {
      const log = path.join(BUILD, `resume.${lang}.log`);
      console.error(`pdflatex failed on ${lang}, pass ${pass}.`);
      if (fs.existsSync(log)) {
        const lines = fs.readFileSync(log, 'utf8').split('\n');
        const firstError = lines.findIndex((line) => line.startsWith('!'));
        console.error(lines.slice(Math.max(0, firstError), firstError + 12).join('\n'));
      }
      ok = false;
      failures++;
      break;
    }
  }
  if (!ok) continue;
  compiled.push({ lang, pdf: path.join(BUILD, `resume.${lang}.pdf`) });
}

if (!compiled.length) {
  console.error('nothing compiled — Resume.pdf left untouched');
  process.exit(1);
}

/* Default language first, then the rest in data.json order. */
compiled.sort((a, b) => (a.lang === DEFAULT_LANG ? -1 : b.lang === DEFAULT_LANG ? 1 : 0));

const OUT = path.join(root, 'assets/pdf/Resume.pdf');
const parts = compiled.map((c) => c.pdf);

if (parts.length === 1) {
  fs.copyFileSync(parts[0], OUT);
} else {
  /* Prefer poppler's pdfunite; fall back to a pdfpages wrapper so the merge
     works anywhere pdflatex does. */
  let merged = false;
  try {
    execFileSync('pdfunite', [...parts, OUT], { stdio: 'pipe' });
    merged = true;
  } catch (err) {
    const wrapper = path.join(BUILD, 'merged.tex');
    fs.writeFileSync(
      wrapper,
      `\\documentclass{article}\n\\usepackage{pdfpages}\n\\begin{document}\n` +
        parts.map((f) => `\\includepdf[pages=-]{${f.replace(/\\/g, '/')}}`).join('\n') +
        `\n\\end{document}\n`
    );
    execFileSync('pdflatex', ['-interaction=nonstopmode', `-output-directory=${BUILD}`, wrapper], {
      stdio: 'pipe',
    });
    fs.copyFileSync(path.join(BUILD, 'merged.pdf'), OUT);
    merged = true;
  }
  if (!merged) process.exit(1);
}

console.log(
  `assets/pdf/Resume.pdf — ${compiled.map((c) => c.lang).join(' + ')} ` +
    `(${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`
);
process.exit(failures ? 1 : 0);
