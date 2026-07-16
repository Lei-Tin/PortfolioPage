(function () {
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  function getSavedTheme() {
    try { return localStorage.getItem('theme'); }
    catch (error) { return null; }
  }

  function saveTheme(theme) {
    try { localStorage.setItem('theme', theme); }
    catch (error) { /* Continue with an in-memory preference. */ }
  }

  function applyTheme(theme, source) {
    root.dataset.theme = theme;
    root.dataset.themeSource = source;
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#201d18' : '#fbf7ee');
    if (themeToggle) {
      var nextTheme = theme === 'dark' ? 'light' : 'dark';
      themeToggle.setAttribute('aria-label', 'Switch to ' + nextTheme + ' theme');
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  applyTheme(root.dataset.theme || (systemTheme.matches ? 'dark' : 'light'), root.dataset.themeSource || 'system');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      saveTheme(nextTheme);
      applyTheme(nextTheme, 'user');
    });
  }

  var handleSystemThemeChange = function (event) {
    if (!getSavedTheme()) applyTheme(event.matches ? 'dark' : 'light', 'system');
  };

  if (systemTheme.addEventListener) systemTheme.addEventListener('change', handleSystemThemeChange);
  else systemTheme.addListener(handleSystemThemeChange);

  var mobileNavButton = document.querySelector('.nav-menu-toggle');
  var mobileNav = document.querySelector('.mobile-links');
  if (mobileNavButton && mobileNav) {
    function closeMobileNav() {
      mobileNav.classList.add('hidden');
      mobileNavButton.classList.remove('close');
      mobileNavButton.setAttribute('aria-expanded', 'false');
      mobileNavButton.setAttribute('aria-label', 'Open navigation');
    }

    mobileNavButton.setAttribute('aria-expanded', 'false');
    mobileNavButton.addEventListener('click', function () {
      if (!window.matchMedia('(max-width: 700px)').matches) return;
      var willOpen = mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden', !willOpen);
      mobileNavButton.classList.toggle('close', willOpen);
      mobileNavButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      mobileNavButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    window.addEventListener('resize', function () {
      if (!window.matchMedia('(max-width: 700px)').matches) closeMobileNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileNav.classList.contains('hidden')) {
        closeMobileNav();
        mobileNavButton.focus();
      }
    });
  }

  var otherLinks = document.querySelector('.hero__others');
  if (otherLinks) {
    var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    var otherLinksCloseTimer;

    otherLinks.addEventListener('mouseenter', function () {
      if (supportsHover.matches) {
        window.clearTimeout(otherLinksCloseTimer);
        otherLinks.classList.remove('is-closing');
        otherLinks.open = true;
      }
    });

    otherLinks.addEventListener('mouseleave', function () {
      if (supportsHover.matches) {
        otherLinks.classList.add('is-closing');
        otherLinksCloseTimer = window.setTimeout(function () {
          otherLinks.open = false;
          otherLinks.classList.remove('is-closing');
        }, 170);
      }
    });

    otherLinks.addEventListener('focusout', function (event) {
      if (!otherLinks.contains(event.relatedTarget)) otherLinks.open = false;
    });

    otherLinks.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        otherLinks.classList.remove('is-closing');
        otherLinks.open = false;
        otherLinks.querySelector('summary').focus();
      }
    });
  }

  var revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }
}());
