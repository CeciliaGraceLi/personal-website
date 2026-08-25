/* ============================================================
   Cecilia Li — Site Behavior
   ------------------------------------------------------------
   Plain vanilla JS, no build step, no dependencies. Organized in
   numbered sections like style.css. Every section is independent —
   if a page doesn't have a particular element (e.g. no #statsGrid),
   that section just does nothing, so this one file is safe to
   include on every page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. Loading screen =====
     Shown instantly (it's actual HTML, not injected), then faded
     out once the page is ready. The min-time guard keeps it from
     flickering on/off in under a frame on fast loads, while never
     holding the page hostage for more than ~700ms. */
  const loader = document.querySelector('.loader');
  const heroSignature = document.getElementById('heroSignature');
  if (loader) {
    const MIN_MS = 450;
    const start = performance.now();
    const hide = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => {
        loader.classList.add('loader-hidden');
        setTimeout(() => loader.remove(), 500);
        // The signature "writes itself" once the loader is out of the
        // way, so the two animations never compete for attention.
        if (heroSignature) heroSignature.classList.add('signature-write');
      }, wait);
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide);
  } else if (heroSignature) {
    // no loader on this page — write the signature in immediately
    requestAnimationFrame(() => heroSignature.classList.add('signature-write'));
  }

  /* ===== 2. Dark mode toggle =====
     Theme is stored as a data-theme="dark" attribute on <html>,
     which style.css keys off of to swap CSS variables. localStorage
     remembers the choice; if the user has never chosen, we fall
     back to their OS-level preference (prefers-color-scheme). */
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const STORAGE_KEY = 'cecilia-site-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ===== 3. Scroll progress bar =====
     Width (as a %) mirrors how far down the page the user has
     scrolled. Recalculated on scroll and on resize (since page
     height can change when the viewport does). */
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  /* ===== 4. Mobile nav toggle ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('nav-links-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close the menu after tapping a link, so it doesn't stay open
    // once the page has scrolled to the new section
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('nav-links-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== 5. Scroll-spy nav highlighting =====
     Watches each <section id="..."> and toggles .active on the nav
     link whose href matches whichever section is currently most in
     view. IntersectionObserver is used instead of scroll-position
     math because it's cheaper (the browser only tells us when
     visibility actually changes, no per-frame scroll listener). */
  const sections = document.querySelectorAll('main section[id], header[id]');
  const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && spyLinks.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          spyLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => spyObserver.observe(s));
  }

  /* ===== 6. Reveal-on-scroll =====
     Elements with class="reveal" start hidden (see style.css) and
     get .in-view added the first time they cross into the viewport,
     which triggers the CSS transition. unobserve() after firing so
     it never re-animates while scrolling back up. */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach((el) => revealObserver.observe(el));
    } else {
      // no IntersectionObserver support — just show everything
      revealEls.forEach((el) => el.classList.add('in-view'));
    }
  }

  /* ===== 6b. Word-by-word reveal animation =====
     Splits an element's text into individual <span class="word"> pieces
     and fades/slides each one in with a small stagger, so a heading
     feels like it's being "typed out" as it scrolls into view. Runs
     once per element (splitting text twice would double-wrap it). */
  const wordRevealEls = document.querySelectorAll('.word-reveal');
  if (wordRevealEls.length) {
    wordRevealEls.forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.transitionDelay = `${Math.min(i * 45, 500)}ms`;
        el.appendChild(span);
        // a real space node between words (outside the animated span)
        // keeps normal word-wrapping behavior at the edge of the box
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });

    if ('IntersectionObserver' in window) {
      const wordObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      wordRevealEls.forEach((el) => wordObserver.observe(el));
    } else {
      wordRevealEls.forEach((el) => el.classList.add('in-view'));
    }
  }

  /* ===== 7. Animated stat counters =====
     Counts up from 0 to data-target once the stat scrolls into
     view. Values are formatted with commas via toLocaleString. */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1200;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - startTime) / duration);
        // ease-out cubic — starts fast, settles gently instead of
        // stopping abruptly, which reads as more "designed"
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(eased * target);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ===== 8. Subtle parallax on full-bleed photo backgrounds =====
     Any element with class="parallax-bg" (the hero photo, the
     Photography banner) drifts a few percent slower than the page as
     you scroll — a classic cinematic touch. Kept small (0.12) and
     GPU-friendly (transform only, updated via requestAnimationFrame)
     so it stays "elegant, not flashy" per the brief, and does nothing
     at all if the user has reduced motion enabled. */
  const parallaxEls = document.querySelectorAll('.parallax-bg');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (parallaxEls.length && !prefersReducedMotion) {
    let ticking = false;
    const updateParallax = () => {
      parallaxEls.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        // only bother updating elements actually near the viewport
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = rect.top * 0.12;
        el.style.transform = `translateY(${offset}px)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ===== 9. Photography banner — rotating background =====
     Crossfades between a curated set of landscape shots behind the
     "Photography" section headline. Two stacked <div class="photo-
     banner-bg"> layers swap which one is .active every few seconds;
     CSS handles the opacity transition, this just flips the class. */
  const bannerLayers = document.querySelectorAll('.photo-banner-bg');
  if (bannerLayers.length > 1) {
    let activeIndex = 0;
    setInterval(() => {
      const next = (activeIndex + 1) % bannerLayers.length;
      bannerLayers[activeIndex].classList.remove('active');
      bannerLayers[next].classList.add('active');
      activeIndex = next;
    }, 5000);
  }

});
