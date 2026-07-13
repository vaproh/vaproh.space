// vaproh.space — main.js

(function () {
  'use strict';

  // =============================================
  // Theme: light / dark (respects prefers-color-scheme)
  // =============================================
  const html = document.documentElement;
  const STORAGE_KEY = 'vaproh-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const resolved = theme === 'auto' ? getSystemTheme() : theme;
    html.setAttribute('data-theme', resolved);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Init
  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved && (saved === 'dark' || saved === 'light') ? saved : 'auto');

  // Follow system when on auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!localStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY) === 'auto') {
      html.setAttribute('data-theme', getSystemTheme());
    }
  });

  // Wire all toggle buttons
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // =============================================
  // Mobile nav
  // =============================================
  document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay   = document.getElementById('nav-overlay');

    if (!navToggle || !mobileNav) return;

    function openNav() {
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      if (overlay) { overlay.classList.add('visible'); overlay.setAttribute('aria-hidden', 'false'); }
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      if (overlay) { overlay.classList.remove('visible'); overlay.setAttribute('aria-hidden', 'true'); }
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
      mobileNav.classList.contains('open') ? closeNav() : openNav();
    });

    if (overlay) overlay.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeNav();
        navToggle.focus();
      }
    });

    mobileNav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  });

})();
