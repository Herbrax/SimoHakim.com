/* =============================================================================
   simohakim.com — interactions
   Vanilla, dependency-free (EmailJS is the only external, and it degrades
   gracefully to a mailto: link if the CDN is blocked).
   ========================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* UI strings and mail credentials for this page, emitted by the generator. */
  const T = (() => {
    try {
      return JSON.parse($('#site-config').textContent);
    } catch (e) {
      return {};
    }
  })();

  /* --------------------------------------------------------- language menu */
  const langWrap = $('#langmenu');
  const langBtn = $('#lang-btn');

  if (langWrap && langBtn) {
    const setLangMenu = (open) => {
      langWrap.classList.toggle('is-open', open);
      langBtn.setAttribute('aria-expanded', String(open));
    };

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setLangMenu(!langWrap.classList.contains('is-open'));
    });
    document.addEventListener('click', (e) => {
      if (!langWrap.contains(e.target)) setLangMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setLangMenu(false);
    });

    // Choosing a language is an explicit decision: store it in a cookie for a
    // year so every later visit — including to the bare domain — lands there.
    $$('.langmenu__item').forEach((link) =>
      link.addEventListener('click', () => {
        const secure = location.protocol === 'https:' ? '; Secure' : '';
        document.cookie =
          `lang=${encodeURIComponent(link.dataset.lang)}; path=/; max-age=31536000; SameSite=Lax${secure}`;
      })
    );
  }

  /* ------------------------------------------------------------- mobile nav */
  const menu = $('#nav-menu');
  const toggle = $('#nav-toggle');
  const closeBtn = $('#nav-close');

  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle?.addEventListener('click', () => setMenu(true));
  closeBtn?.addEventListener('click', () => setMenu(false));
  $$('.nav__link').forEach((l) => l.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });

  /* ----------------------------------------------------------------- theme */
  const themeBtn = $('#theme-btn');
  const root = document.documentElement;

  /** The hero for a theme is only fetched the first time that theme is shown. */
  const loadHeroFor = (theme) => {
    const img = $(`[data-hero="${theme}"]`);
    if (img && !img.src) {
      img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
    }
  };

  const syncThemeButton = () => {
    const dark = root.dataset.theme === 'dark';
    themeBtn?.setAttribute('aria-pressed', String(dark));
    themeBtn?.setAttribute('aria-label', dark ? T.themeLight : T.themeDark);
  };
  syncThemeButton();

  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    loadHeroFor(root.dataset.theme);
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch (e) {
      /* private mode — theme just won't persist */
    }
    syncThemeButton();
  });

  /* --------------------------------------------- scroll: header, progress, spy */
  const header = $('#header');
  const progress = $('#progress');
  const toTop = $('#to-top');
  const navLinks = $$('[data-nav]');
  const sections = $$('section[data-section]');

  /* The wallpaper stays pinned; it just fades fast, bottoming out at a trace
     so the shape stays readable behind the rest of the page. */
  const BACKDROP_MIN = 0.05;
  const BACKDROP_FADE = 0.7; // fully faded this far into the first viewport

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;

    const fadeOver = Math.max(window.innerHeight * BACKDROP_FADE, 1);
    const backdrop = Math.max(1 - y / fadeOver, BACKDROP_MIN);
    root.style.setProperty('--backdrop-o', backdrop.toFixed(3));

    header.classList.toggle('is-stuck', y > window.innerHeight * 0.86);
    toTop.classList.toggle('is-on', y > window.innerHeight);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    // section spy — the section covering the upper third of the viewport wins
    const line = y + window.innerHeight * 0.33;
    let current = '';
    for (const s of sections) if (s.offsetTop <= line) current = s.dataset.section;
    navLinks.forEach((l) => l.classList.toggle('is-active', l.dataset.nav === current));

    ticking = false;
  };

  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* --------------------------------------------------------- scroll reveal */
  const revealables = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------------- toast */
  const toastEl = $('#toast');
  let toastTimer;
  const toast = (msg, kind = 'ok') => {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.dataset.kind = kind;
    toastEl.classList.add('is-on');
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 4500);
  };

  /* ---------------------------------------------------------- contact form */
  /* The generator only emits the form when data.json carries a full set of
     EmailJS ids, so reaching here means EMAILJS is populated. */
  const EMAILJS = T.emailjs || {};

  const form = $('#contact-form');
  if (form) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const rules = {
      fullName: (v) => (v.trim().length >= 2 ? '' : T.errName),
      email_id: (v) => (emailRe.test(v.trim()) ? '' : T.errEmail),
      message: (v) => (v.trim().length >= 10 ? '' : T.errMessage),
    };

    const validate = (id) => {
      const input = $(`#${id}`);
      const error = rules[id](input.value);
      $(`#${id}-error`).textContent = error;
      input.closest('.field').classList.toggle('has-error', Boolean(error));
      input.setAttribute('aria-invalid', String(Boolean(error)));
      return !error;
    };

    Object.keys(rules).forEach((id) => {
      const input = $(`#${id}`);
      // Validate on blur, then live-correct once the field has been touched.
      input.addEventListener('blur', () => validate(id));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('has-error')) validate(id);
      });
    });

    const sendBtn = $('#send-btn');
    const sendLabel = sendBtn.querySelector('span');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const ok = Object.keys(rules).map(validate).every(Boolean);
      if (!ok) {
        toast(T.toastFix, 'error');
        return;
      }

      const params = {
        from_name: $('#fullName').value.trim(),
        email_id: $('#email_id').value.trim(),
        subject: $('#subject').value.trim() || T.subjectFallback,
        message: $('#message').value.trim(),
      };

      if (typeof emailjs === 'undefined') {
        // CDN blocked or offline — hand the message to the user's mail client.
        location.href =
          `mailto:${EMAILJS.to}?subject=${encodeURIComponent(params.subject)}` +
          `&body=${encodeURIComponent(`${params.message}\n\n— ${params.from_name} (${params.email_id})`)}`;
        return;
      }

      sendBtn.disabled = true;
      sendLabel.textContent = T.sending;
      try {
        emailjs.init({ publicKey: EMAILJS.publicKey });
        await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params);
        form.reset();
        toast(T.toastSent);
      } catch (err) {
        console.error(err);
        toast(T.toastFail, 'error');
      } finally {
        sendBtn.disabled = false;
        sendLabel.textContent = T.send;
      }
    });
  }

  /* --------------------------------------------------------------- niceties */
  $('#year') && ($('#year').textContent = new Date().getFullYear());
})();
