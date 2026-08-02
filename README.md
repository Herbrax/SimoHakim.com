# simohakim.com

Personal site and resume, both generated from a single `data.json`.

```
data.json ──┬── tools/build.mjs        ──> index.html, <lang>/index.html
            └── tools/build-resume.mjs ──> resume.<lang>.tex ──> assets/pdf/Resume*.pdf
source/     ─── tools/optimize-images.mjs ──> assets/img (compressed derivatives)
```

`source/` holds the full-resolution originals and is never deployed —
everything the browser downloads lives in `assets/`.

## What changed in v2

This replaced a hand-maintained `index.html` driven by a Python generator.

**Design** — an editorial "technical dossier" look: Instrument Serif display,
Archivo body, JetBrains Mono microcopy, numbered sections on a ruled grid, a
warm paper light theme and an ink dark theme (both derived from the navy/orange
brand colours already in `data.json`). Grain overlay, staggered hero entrance,
scroll-reveal, reading-progress bar, section spy in the nav.

**Kept from V1** by request:
- Skills as horizontal progress bars with the same 20 / 60 / 80% level mapping.
- Education and Work as two side-by-side zigzag timelines with a spine and dots.

**New** — a Projects section (the `projects` array in `data.json` was never
rendered on V1), derived stat tiles, a real `<form>` with inline validation and
a toast instead of `alert()`/SweetAlert.

**Code** — `assets/js/main.js` is readable vanilla JS (V1's was minified and
obfuscated). No jQuery, no Swiper, no SweetAlert. The only external runtime
dependency is EmailJS, and the contact form falls back to a `mailto:` link if
that CDN is unreachable.

## Performance

Measured on a cold load at 1440×900, both served locally from this repo:

| | V1 | V2 |
|---|---|---|
| Page weight (first load) | **37.1 MB** | **236 KB** (−99.4%) |
| Requests | 15 | 12 |
| `load` event | 817 ms | 325 ms |
| Images on disk | 43.5 MB | 0.88 MB (−98%) |
| Hero image (light) | 8.75 MB PNG | 21 KB WebP |
| Hero image (dark) | 22.4 MB PNG | 46 KB WebP |
| Portrait cut-out | 5.5 MB PNG | 22 KB WebP |

How: WebP at three widths with `srcset`, JPEG/PNG fallbacks, 24px inline blur
placeholders behind each hero, and only the *active* theme's hero is fetched —
the other loads on demand when the theme is toggled.

## Build

```sh
npm install          # sharp, for the image pipeline only
npm run images       # re-encode ../assets/img -> assets/img  (rarely needed)
npm run build        # data.json -> pages AND resume.<lang>.tex
npm run resume:pdf   # resume.<lang>.tex -> assets/pdf/Resume.pdf  (needs LaTeX)
npm run serve        # local preview
```

`data.json` drives both outputs:

| output | generator | format |
|---|---|---|
| `index.html`, `<lang>/index.html` | `tools/build.mjs` | static HTML, no client-side templating |
| `resume.<lang>.tex` | `tools/build-resume.mjs` | moderncv / banking, `\customcventry` macros |
| `assets/pdf/Resume.pdf` | `tools/compile-resume.mjs` | every language bound into one file |

All are generated and committed. Edit `data.json` (or the generators) and
re-run `npm run build` — do not hand-edit `index.html` or the `.tex` files.

**One resume, all languages.** `npm run resume:pdf` compiles each
`resume.<lang>.tex`, then binds them into a single `assets/pdf/Resume.pdf` —
default language first, the rest in `languages` order. Every "Download CV"
button on every page points at that one file, so a French reader still gets the
English pages too. Merging uses `pdfunite` (poppler) when available and falls
back to a `pdfpages` wrapper compiled with pdflatex.

## Contact form

The form has no backend — it posts straight to [EmailJS](https://www.emailjs.com)
from the browser. Its credentials live in `data.json`:

```json
"emailjs": {
  "publicKey": "…",
  "serviceId": "…",
  "templateId": "…"
}
```

**All three are required. Remove the block, or leave any field blank, and the
form is not rendered at all** — the contact section falls back to just the phone,
email and location details. A form that silently drops messages is worse than no
form, so this is deliberate rather than a soft failure.

The template is sent four variables — `from_name`, `email_id`, `subject`,
`message`. Rename them only if you rename them in the EmailJS template too.

If the EmailJS CDN is blocked or the visitor is offline, submitting falls back
to a prefilled `mailto:` to the address in `personalInfo.contact.email`.

> The public key is visible in the page source — that is how EmailJS works, it
> is not a secret. What stops other people spending your quota is the
> **Allowed Domains** list in the EmailJS dashboard: set it to your domain.
> There is no captcha or honeypot on the form.

## Languages

Any prose field in `data.json` may be either a plain string (same in every
language — names, dates, URLs, tech) or a translation map:

```json
"title": { "en": "Software Engineer", "fr": "Ingénieur logiciel" }
```

`languages` at the top of the file lists what gets built. The default language
renders to `/index.html`, every other to `/<lang>/index.html`, each a complete
static page with `hreflang` tags. A missing translation falls back to the
default language rather than rendering blank, so a half-translated file still
ships.

**Adding a language** is a content job only: add its code to `languages`, add
the strings, rebuild. The UI chrome (nav, form, buttons, section headings) is
already translated for:

`en` `fr` `es` `pt` `de` `nl` `it` `pl` `sv` `tr` `bs` `ru` `uk` `ja` `ko` `ar`

For anything outside that list, add a block to `STRINGS` in `tools/i18n.mjs`;
missing keys fall back to English, so a partial block is fine. Arabic is set to
`dir="rtl"` in `LOCALES` and the stylesheet mirrors the layout accordingly.

**How a visitor lands on a language**, in priority order:

1. **The `lang` cookie.** Picking a language from the globe menu writes it for a
   year (`path=/`, `SameSite=Lax`, `Secure` over HTTPS). Every later visit —
   including to the bare domain — routes there.
2. **The browser's own languages**, read once per session on the default page.
3. **The default language**, if neither matches — a German browser with no
   German build stays on English.

### Fields the resume uses

- `resumeSummary` — the ABOUT paragraph (falls back to `about.description`).
- `resumeSkills.{programming,data,miscellaneous}` — the SKILLS lines.
- `resumeDetails` on each role/project — split into one `\item` per sentence;
  a single-sentence entry is rendered inline instead of as a list.
- `showInResume: "Y"` — set to anything else to omit an entry from the PDF
  while keeping it on the website.
- `location` on education entries; work locations are parsed off the end of
  `company` ("LXT AI, Montreal, QC" → org + location), since the website wants
  the combined string.

## Notes

- V1's `Generator.py` still owns `../index.html` and `../main.tex`; this folder
  is independent of it and only *reads* a copy of `data.json`.
- The `colors` block in `data.json` is unused here — V2 defines its own tokens
  at the top of `assets/css/styles.css`.
- Testimonials in `data.json` are still Lorem Ipsum placeholders.
