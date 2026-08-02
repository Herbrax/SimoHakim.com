/**
 * Static site generator for simohakim.com.
 *
 * Renders one fully static page per language that data.json provides content
 * for: the default language at /index.html, every other at /<lang>/index.html.
 * No client-side templating, nothing to fetch before first paint.
 *
 * Run: node tools/build.mjs      (from the repo root)
 */
import fs from 'node:fs';
import path from 'node:path';
import { LOCALES, L, t, languagesIn } from './i18n.mjs';

const root = path.resolve('.');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data.json'), 'utf8'));
const lqip = JSON.parse(fs.readFileSync(path.join(root, 'assets/img/placeholders.json'), 'utf8'));

const DEFAULT_LANG = data.defaultLanguage || 'en';
const LANGS = languagesIn(data);
if (!LANGS.includes(DEFAULT_LANG)) LANGS.unshift(DEFAULT_LANG);

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* --------------------------------------------------------------- icon set */
const icons = {
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>',
  up: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5,12 12,5 19,12"/>',
  menu: '<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="15" y2="17"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  check: '<polyline points="20,6 9,17 4,12"/>',
};
const ico = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;

const SECTIONS = [
  { id: 'about', num: '01', key: 'about' },
  { id: 'skills', num: '02', key: 'skills' },
  { id: 'experience', num: '03', key: 'career' },
  { id: 'projects', num: '04', key: 'projects' },
  { id: 'contact', num: '05', key: 'contact' },
];

const LEVELS = { Beginner: 20, Intermediate: 60, Advanced: 80 };
const isCurrent = (period) => /present|ongoing|current/i.test(period);
const shown = (rows) => rows.filter((r) => (r.showInResume ?? 'Y').toUpperCase() === 'Y');

/** Where a language's page lives, relative to the site root. */
const pageHref = (lang) => (lang === DEFAULT_LANG ? '/' : `/${lang}/`);
/** How deep that page sits, for relative asset URLs. */
const assetPrefix = (lang) => (lang === DEFAULT_LANG ? '' : '../');
/** One resume for everyone: every language is bound into the same PDF. */
const RESUME_FILE = 'Resume.pdf';

/* ------------------------------------------------------------ page render */
function renderPage(lang) {
  const s = t(lang);
  const dir = LOCALES[lang].dir;
  const p = assetPrefix(lang);
  const l = (v) => L(v, lang, DEFAULT_LANG);

  const me = data.personalInfo;
  const social = data.socialLinks;
  const fullName = `${me.surname} ${me.lastname}`;
  const title = l(me.title);
  const location = l(me.contact.location);
  const email = me.contact.email;

  const navItems = SECTIONS.map(
    (sec, i) =>
      `<li style="--i:${i}"><a href="#${sec.id}" class="nav__link" data-nav="${sec.id}"><span>${
        sec.num
      }</span>${esc(s.nav[sec.key])}</a></li>`
  ).join('\n              ');

  const shead = (num, parts, kicker) => `<header class="shead reveal">
            <span class="shead__num">${num} /</span>
            <h2 class="shead__title">${esc(parts[0])} <em>${esc(parts[1])}</em></h2>
            <p class="shead__meta mono">${esc(kicker)}</p>
          </header>`;

  /* ------------------------------------------------------------- skills */
  const skillsHtml = data.skills
    .map(
      (group) => `<div class="skillset reveal">
              <h3 class="skillset__title"><span>${esc(l(group.category))}</span><span>${
        group.skills.length
      }</span></h3>
              ${group.skills
                .map((sk, j) => {
                  const pct = LEVELS[sk.level] ?? 20;
                  const label = s.level[sk.level] || sk.level;
                  return `<div class="skill">
                <div class="skill__head">
                  <h4 class="skill__name">${esc(sk.name)}</h4>
                  <span class="skill__lvl">${esc(label)}</span>
                </div>
                <div class="skill__bar" role="img" aria-label="${esc(sk.name)}: ${esc(label)}">
                  <span class="skill__fill" style="--pct:${pct}%;--j:${j}"></span>
                </div>
              </div>`;
                })
                .join('\n              ')}
            </div>`
    )
    .join('\n            ');

  /* ----------------------------------------------------------- timeline */
  const note = (text) => (text?.trim() ? `<p class="tl__note">${esc(text)}</p>` : '');
  const timeline = (entries, render) =>
    entries
      .map((entry, i) => {
        const side = i % 2 === 0 ? 'is-left' : 'is-right';
        return `<article class="tl__item ${side} reveal" style="grid-row:${i + 1};--d:${i * 70}">
                  <span class="tl__dot" aria-hidden="true"></span>
                  ${render(entry)}
                </article>`;
      })
      .join('\n                ');

  const workHtml = timeline(
    data.workExperience,
    (w) => `<h4 class="tl__title">${esc(l(w.position))}</h4>
                  <span class="tl__org">${esc(l(w.company))}</span>
                  <span class="tl__when">${esc(w.years)}${
                    isCurrent(w.years) ? `<span class="tl__tag">${esc(s.ui.current)}</span>` : ''
                  }</span>
                  ${note(l(w.details))}`
  );

  const eduHtml = timeline(
    data.education,
    (e) => `<span class="tl__degree">${esc(l(e.degree))}</span>
                  <h4 class="tl__title">${esc(l(e.field))}</h4>
                  <span class="tl__org">${esc(l(e.institution))}</span>
                  <span class="tl__when">${esc(e.year)}${
                    isCurrent(e.year) || /^\s*(ongoing|en cours)/i.test(l(e.details))
                      ? `<span class="tl__tag">${esc(s.ui.ongoing)}</span>`
                      : ''
                  }</span>
                  ${note(l(e.details))}`
  );

  /* ----------------------------------------------------------- projects */
  const projectsHtml = data.projects
    .map((pr, i) => {
      const name = l(pr.name);
      const titleHtml = pr.link
        ? `<a class="project__link" href="${esc(pr.link)}" target="_blank" rel="noopener">${esc(
            name
          )}<span class="project__ext" aria-hidden="true">↗</span><span class="sr-only"> (${esc(
            s.ui.newTab
          )})</span></a>`
        : esc(name);
      return `<article class="project reveal${pr.link ? ' has-link' : ''}">
              <span class="project__num">${String(i + 1).padStart(2, '0')}</span>
              <h3 class="project__name">${titleHtml}</h3>
              <p class="project__desc">${esc(l(pr.description))}</p>
            </article>`;
    })
    .join('\n            ');

  /* -------------------------------------------------------- testimonials */
  const avatarFor = (i) => (i % 2 === 0 ? 'avatar-b' : 'avatar-a');
  const quotesHtml = data.testimonials
    .map(
      (q, i) => `<figure class="quote reveal" style="--d:${i * 90}">
              <blockquote class="quote__text">${esc(l(q.testimonial))}</blockquote>
              <figcaption class="quote__by">
                <picture>
                  <source srcset="${p}assets/img/${avatarFor(i)}-160.webp" type="image/webp">
                  <img src="${p}assets/img/${avatarFor(
        i
      )}-160.png" alt="" width="160" height="160" loading="lazy" decoding="async">
                </picture>
                <div>
                  <div class="quote__name">${esc(l(q.name))}</div>
                  <div class="quote__role">${esc(l(q.role))}</div>
                </div>
              </figcaption>
            </figure>`
    )
    .join('\n            ');

  /* --------------------------------------------------------------- stats */
  const yearsOfWork = (() => {
    const years = data.workExperience
      .map((w) => (w.years.match(/(19|20)\d{2}/) || [])[0])
      .filter(Boolean)
      .map(Number);
    return years.length ? new Date().getFullYear() - Math.min(...years) : 0;
  })();
  /* `projects` is the personal shortlist, not a count of everything shipped at
     work — the last two are floors, not derived totals. */
  const statsHtml = [
    [`${yearsOfWork}+`, s.ui.statYears],
    ['50+', s.ui.statProjects],
    ['20+', s.ui.statTools],
  ]
    .map(
      ([n, lab]) =>
        `<div class="stat"><div class="stat__n">${esc(n)}</div><span class="stat__l mono">${esc(
          lab
        )}</span></div>`
    )
    .join('\n              ');

  /* ----------------------------------------------------- language switch */
  const langOptions = LANGS.map(
    (code) =>
      `<li><a href="${pageHref(code)}" lang="${code}" hreflang="${code}" class="langmenu__item${
        code === lang ? ' is-current' : ''
      }" data-lang="${code}">${esc(LOCALES[code].name)}${
        code === lang ? ico('check', 'ico langmenu__check') : ''
      }</a></li>`
  ).join('\n              ');

  const hreflangs = LANGS.map(
    (code) => `<link rel="alternate" hreflang="${code}" href="${pageHref(code)}">`
  )
    .concat(`<link rel="alternate" hreflang="x-default" href="${pageHref(DEFAULT_LANG)}">`)
    .join('\n    ');

  /* Config main.js needs at runtime: UI strings, plus the mail credentials if
     they are configured. Without all three EmailJS ids the form is not
     rendered at all — a form that silently drops messages is worse than none. */
  const mail = data.emailjs || {};
  const mailReady = Boolean(mail.publicKey && mail.serviceId && mail.templateId);

  const runtime = JSON.stringify({
    emailjs: mailReady ? { ...mail, to: email } : null,
    errName: s.ui.errName,
    errEmail: s.ui.errEmail,
    errMessage: s.ui.errMessage,
    toastFix: s.ui.toastFix,
    toastSent: s.ui.toastSent,
    toastFail: s.ui.toastFail.replace('{email}', email),
    send: s.ui.send,
    sending: s.ui.sending,
    themeDark: s.ui.themeDark,
    themeLight: s.ui.themeLight,
    subjectFallback: `${s.nav.contact} — simohakim.com`,
  });

  const description = `${fullName} — ${title}, ${location}.`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" data-theme="light">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(fullName)} — ${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="author" content="${esc(fullName)}">
    <meta name="theme-color" content="#f6f3ee" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#0d0c0b" media="(prefers-color-scheme: dark)">

    <meta property="og:type" content="website">
    <meta property="og:locale" content="${lang}">
    <meta property="og:title" content="${esc(fullName)} — ${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="/assets/img/about-1000.jpg">
    <meta name="twitter:card" content="summary_large_image">

    ${hreflangs}

    <link rel="icon" href="${p}assets/favicon/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="${p}assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${p}assets/favicon/favicon-16x16.png">
    <link rel="apple-touch-icon" href="${p}assets/favicon/apple-touch-icon.png">
    <link rel="manifest" href="${p}assets/favicon/site.webmanifest">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap">
    <link rel="stylesheet" href="${p}assets/css/styles.css">

    <script>
      // Applied before first paint so the correct theme is never repainted.
      (function () {
        try {
          var saved = localStorage.getItem('theme');
          var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.dataset.theme = dark ? 'dark' : 'light';
        } catch (e) {}
      })();
    </script>
${
  lang === DEFAULT_LANG
    ? `    <script>
      // Language routing, in priority order:
      //   1. the "lang" cookie — an explicit pick, remembered for a year
      //   2. the browser's own languages, consulted once per session
      //   3. this page (the default language)
      (function () {
        var available = ${JSON.stringify(LANGS)};
        var go = function (code) { location.replace('/' + code + '/' + location.hash); };
        try {
          var saved = (document.cookie.match(/(?:^|;\\s*)lang=([^;]*)/) || [])[1];
          if (saved) {
            saved = decodeURIComponent(saved);
            if (saved !== '${DEFAULT_LANG}' && available.indexOf(saved) !== -1) go(saved);
            return;
          }
          if (sessionStorage.getItem('lang-detected')) return;
          sessionStorage.setItem('lang-detected', '1');
          var wanted = (navigator.languages || [navigator.language || 'en'])
            .map(function (x) { return String(x).toLowerCase().split('-')[0]; });
          for (var i = 0; i < wanted.length; i++) {
            if (wanted[i] === '${DEFAULT_LANG}') return;
            if (available.indexOf(wanted[i]) !== -1) return go(wanted[i]);
          }
        } catch (e) {}
      })();
    </script>
`
    : ''
}  </head>

  <body>
    <a class="skip-link" href="#about">${esc(s.ui.skip)}</a>

    <!-- ============================================================ header -->
    <header class="header" id="header">
      <nav class="nav wrap" aria-label="${esc(s.nav.about)}">
        <a href="#top" class="nav__logo">${esc(fullName)}</a>

        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
              ${navItems}
          </ul>
          <button class="icon-btn nav__close" id="nav-close" type="button" aria-label="${esc(
            s.ui.closeMenu
          )}">${ico('close')}</button>
        </div>

        <div class="nav__tools">
          <div class="langmenu" id="langmenu">
            <button class="icon-btn langmenu__btn" id="lang-btn" type="button"
                    aria-label="${esc(s.ui.language)}" aria-haspopup="true" aria-expanded="false">
              ${ico('globe')}<span class="langmenu__code">${lang.toUpperCase()}</span>
            </button>
            <ul class="langmenu__list" id="lang-list" role="menu" aria-label="${esc(s.ui.language)}">
              ${langOptions}
            </ul>
          </div>
          <button class="icon-btn theme-btn" id="theme-btn" type="button" aria-label="${esc(
            s.ui.themeDark
          )}" aria-pressed="false">
            ${ico('moon', 'ico ico--moon')}${ico('sun', 'ico ico--sun')}
          </button>
          <button class="icon-btn nav__toggle" id="nav-toggle" type="button" aria-label="${esc(
            s.ui.openMenu
          )}" aria-expanded="false" aria-controls="nav-menu">${ico('menu')}</button>
        </div>
        <span class="progress" id="progress" aria-hidden="true"></span>
      </nav>
    </header>

    <!-- ========================================================== backdrop -->
    <!-- Fixed behind the whole page: full strength over the hero, then faded
         to a trace by the scroll handler so the shape stays visible. -->
    <div class="backdrop" id="backdrop" aria-hidden="true">
      <div class="hero__media hero__media--light">
        <img data-hero="light" alt="" width="2400" height="1350" fetchpriority="high" decoding="async"
             data-src="${p}assets/img/hero-light-1600.webp"
             data-srcset="${p}assets/img/hero-light-960.webp 960w, ${p}assets/img/hero-light-1600.webp 1600w, ${p}assets/img/hero-light-2400.webp 2400w"
             sizes="100vw"
             style="background:#cfe0ea url(${lqip.heroLight}) center/cover">
      </div>
      <div class="hero__media hero__media--dark">
        <img data-hero="dark" alt="" width="2400" height="1600" fetchpriority="high" decoding="async"
             data-src="${p}assets/img/hero-dark-1600.webp"
             data-srcset="${p}assets/img/hero-dark-960.webp 960w, ${p}assets/img/hero-dark-1600.webp 1600w, ${p}assets/img/hero-dark-2400.webp 2400w"
             sizes="100vw"
             style="background:#131722 url(${lqip.heroDark}) center/cover">
      </div>

      <script>
        // Only the hero for the active theme is fetched; the other stays a
        // blurred 24px placeholder until the visitor flips the switch.
        (function () {
          var img = document.querySelector('[data-hero="' + document.documentElement.dataset.theme + '"]');
          if (img) { img.srcset = img.dataset.srcset; img.src = img.dataset.src; }
        })();
      </script>
    </div>

    <!-- ============================================================== hero -->
    <section class="hero" id="top">
      <div class="hero__inner wrap">
        <p class="hero__eyebrow mono" data-anim style="--d:0">${esc(location)}${
    l(me.availability) ? ` · ${esc(l(me.availability))}` : ''
  }</p>
        <h1 class="hero__title" data-anim style="--d:120">${esc(me.surname)} <span class="accent"><em>${esc(
    me.lastname
  )}</em></span></h1>
        <p class="hero__sub" data-anim style="--d:240">${esc(title)}</p>

        <div class="hero__row" data-anim style="--d:360">
          <div class="hero__socials">
            <a href="${esc(social.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ico(
    'linkedin'
  )}</a>
            <a href="${esc(social.github)}" target="_blank" rel="noopener" aria-label="GitHub">${ico('github')}</a>
            <a href="${esc(social.twitter)}" target="_blank" rel="noopener" aria-label="Twitter">${ico('twitter')}</a>
            <a href="mailto:${esc(email)}" aria-label="${esc(s.ui.email)}">${ico('mail')}</a>
          </div>
          <a href="#about" class="hero__scroll mono" aria-label="${esc(s.ui.scroll)}">
            ${esc(s.ui.scroll)}
            <span class="mousey" aria-hidden="true"><span class="scroller"></span></span>
          </a>
        </div>
      </div>
    </section>

    <main class="main">
      <!-- ========================================================== about -->
      <section class="section" id="about" data-section="about">
        <div class="wrap">
          ${shead('01', s.head.about, s.kicker.about)}

          <div class="about__grid">
            <figure class="about__figure reveal">
              <picture>
                <source srcset="${p}assets/img/portrait-520.webp 520w, ${p}assets/img/portrait-900.webp 900w" sizes="(min-width: 56em) 21rem, 60vw" type="image/webp">
                <img src="${p}assets/img/portrait-900.png" alt="${esc(
    fullName
  )}" width="900" height="930" loading="lazy" decoding="async">
              </picture>
            </figure>

            <div>
              <p class="about__text reveal" style="--d:80">${esc(l(data.about.description))}</p>
              <p class="about__text reveal" style="--d:140">${esc(l(data.home.description))}</p>

              <div class="stats reveal" style="--d:220">
              ${statsHtml}
              </div>

              <div class="about__actions reveal" style="--d:260">
                <a class="btn" href="${p}assets/pdf/${RESUME_FILE}" download><span>${esc(
    s.ui.downloadCv
  )}</span>${ico('download', 'ico btn__ico')}</a>
                <a class="btn btn--ghost" href="#contact"><span>${esc(s.ui.getInTouch)}</span>${ico(
    'arrow',
    'ico btn__ico'
  )}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================= skills -->
      <section class="section" id="skills" data-section="skills">
        <div class="wrap">
          ${shead('02', s.head.skills, s.kicker.skills)}
          <div class="skills__grid">
            ${skillsHtml}
          </div>
        </div>
      </section>

      <!-- ===================================================== experience -->
      <section class="section" id="experience" data-section="experience">
        <div class="wrap">
          ${shead('03', s.head.career, s.kicker.career)}
          <div class="cv__split">
            <div class="cv__col">
              <h3 class="cv__label">${esc(s.ui.education)}</h3>
              <div class="tl">
                ${eduHtml}
              </div>
            </div>
            <div class="cv__col">
              <h3 class="cv__label">${esc(s.ui.work)}</h3>
              <div class="tl">
                ${workHtml}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================================================= projects -->
      <section class="section" id="projects" data-section="projects">
        <div class="wrap">
          ${shead('04', s.head.projects, s.kicker.projects)}
          <div class="projects">
            ${projectsHtml}
          </div>
        </div>
      </section>

      <!-- =================================================== testimonials -->
      <section class="section" id="references">
        <div class="wrap">
          ${shead('05', s.head.references, s.kicker.references)}
          <div class="quotes">
            ${quotesHtml}
          </div>
        </div>
      </section>

      <!-- ======================================================== contact -->
      <section class="section" id="contact" data-section="contact">
        <div class="wrap">
          ${shead('06', s.head.contact, s.kicker.contact)}

          <div class="contact__grid${mailReady ? '' : ' contact__grid--solo'}">
            <div>
              <p class="contact__lede reveal">${esc(s.ui.contactLede)}</p>
              <div class="cinfo reveal" style="--d:80">
                <a href="tel:${esc(me.contact.phone.replace(/[^\d+]/g, ''))}">
                  ${ico('phone')}<span><span class="cinfo__k">${esc(
    s.ui.phone
  )}</span><span class="cinfo__v">${esc(me.contact.phone)}</span></span>
                </a>
                <a href="mailto:${esc(email)}">
                  ${ico('mail')}<span><span class="cinfo__k">${esc(
    s.ui.email
  )}</span><span class="cinfo__v">${esc(email)}</span></span>
                </a>
                <div>
                  ${ico('pin')}<span><span class="cinfo__k">${esc(
    s.ui.location
  )}</span><span class="cinfo__v">${esc(location)}</span></span>
                </div>
              </div>
            </div>

            ${
              !mailReady
                ? ''
                : `<form class="form reveal" id="contact-form" style="--d:120" novalidate>
              <div class="form__row">
                <div class="field">
                  <label for="fullName">${esc(s.ui.fullName)}</label>
                  <input type="text" id="fullName" name="fullName" placeholder="${esc(
                    s.ui.phName
                  )}" autocomplete="name" required>
                  <span class="field__err" id="fullName-error" aria-live="polite"></span>
                </div>
                <div class="field">
                  <label for="email_id">${esc(s.ui.email)}</label>
                  <input type="email" id="email_id" name="email_id" placeholder="${esc(
                    s.ui.phEmail
                  )}" autocomplete="email" required>
                  <span class="field__err" id="email_id-error" aria-live="polite"></span>
                </div>
              </div>
              <div class="field">
                <label for="subject">${esc(s.ui.subject)}</label>
                <input type="text" id="subject" name="subject" placeholder="${esc(s.ui.phSubject)}">
                <span class="field__err" id="subject-error" aria-live="polite"></span>
              </div>
              <div class="field">
                <label for="message">${esc(s.ui.message)}</label>
                <textarea id="message" name="message" rows="6" placeholder="${esc(
                  s.ui.phMessage
                )}" required></textarea>
                <span class="field__err" id="message-error" aria-live="polite"></span>
              </div>
              <div class="form__foot">
                <button class="btn" type="submit" id="send-btn"><span>${esc(s.ui.send)}</span>${ico(
    'arrow',
    'ico btn__ico'
  )}</button>
                <span class="mono" style="color:var(--ink-faint)">${esc(s.ui.replyTime)}</span>
              </div>
            </form>`
            }
          </div>
        </div>
      </section>
    </main>

    <!-- ============================================================ footer -->
    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div>
            <a href="#top" class="footer__name">${esc(fullName)}</a>
            <p class="footer__tag">${esc(title)} — ${esc(location)}.</p>
          </div>
          <nav class="footer__links" aria-label="${esc(s.nav.contact)}">
              ${SECTIONS.map((sec) => `<a href="#${sec.id}">${esc(s.nav[sec.key])}</a>`).join('\n              ')}
          </nav>
          <div class="footer__socials">
            <a href="${esc(social.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ico(
    'linkedin'
  )}</a>
            <a href="${esc(social.github)}" target="_blank" rel="noopener" aria-label="GitHub">${ico('github')}</a>
            <a href="${esc(social.twitter)}" target="_blank" rel="noopener" aria-label="Twitter">${ico('twitter')}</a>
          </div>
        </div>
        <div class="footer__base mono">
          <span>© ${new Date().getFullYear()} ${esc(fullName)} · ${esc(s.ui.rights)}</span>
          <span>v2.0</span>
        </div>
      </div>
    </footer>

    <a href="#top" class="to-top" id="to-top" aria-label="${esc(s.ui.backToTop)}">${ico('up')}</a>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>

    <script id="site-config" type="application/json">${runtime}</script>
${
  mailReady
    ? '    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" defer></script>\n'
    : ''
}    <script src="${p}assets/js/main.js" defer></script>
  </body>
</html>
`;
}

/* ------------------------------------------------------------------ write */
for (const lang of LANGS) {
  const dir = lang === DEFAULT_LANG ? root : path.join(root, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPage(lang));
}

console.log(
  `${LANGS.length} page(s) written — ` +
    LANGS.map((c) => `${c}${c === DEFAULT_LANG ? '*' : ''}`).join(', ')
);
