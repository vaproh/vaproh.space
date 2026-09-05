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

  // =============================================
  // Direction-aware nav underline
  // =============================================
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.top-nav-link').forEach(function(link) {
      ['mouseenter', 'mouseleave'].forEach(function(evt) {
        link.addEventListener(evt, function(e) {
          var rect = link.getBoundingClientRect();
          var isRight = (e.clientX - rect.left) > (rect.width / 2);
          link.style.setProperty('--origin', isRight ? 'right' : 'left');
        });
      });
    });
  });

})();

// Tag filtering
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.tag-filter-btn');
  const archiveItems = document.querySelectorAll('.archive-item');
  const archiveYears = document.querySelectorAll('.archive-year');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterTag = btn.dataset.tag;

        archiveItems.forEach(item => {
          const itemTag = item.querySelector('.archive-tag')?.textContent.trim();
          if (filterTag === 'all' || itemTag === filterTag) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });

        archiveYears.forEach(yearDiv => {
          const listDiv = yearDiv.nextElementSibling;
          if (listDiv && listDiv.classList.contains('archive-list')) {
            const visibleItems = Array.from(listDiv.querySelectorAll('.archive-item')).filter(i => i.style.display !== 'none');
            if (visibleItems.length === 0) {
              yearDiv.style.display = 'none';
              listDiv.style.display = 'none';
            } else {
              yearDiv.style.display = 'block';
              listDiv.style.display = 'block';
            }
          }
        });
      });
    });
  }
});

// =============================================
// Scroll progress bar
// =============================================
document.addEventListener('scroll', function() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;
  const scrollTotal = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (scrollTotal / height) : 0;
  progress.style.transform = `scaleX(${scrolled})`;
});

// =============================================
// Live local time in footer
// =============================================
function updateTime() {
  const timeEl = document.getElementById('footer-time');
  if (timeEl) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    timeEl.textContent = `local time: ${timeString}`;
  }
}
setInterval(updateTime, 1000);
document.addEventListener('DOMContentLoaded', updateTime);

// =============================================
// Dynamic Favicon (Sleepy face)
// =============================================
document.addEventListener('visibilitychange', function() {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  if (document.hidden) {
    link.dataset.original = link.href;
    link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💤</text></svg>';
    document.title = 'brb... — vaproh';
  } else {
    link.href = link.dataset.original || '/favicon.ico';
    document.title = 'vaproh';
  }
});

// =============================================
// Cmd+K Menu
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('cmd-menu');
  if (!dialog) return;
  const input = document.getElementById('cmd-input');
  const items = Array.from(document.querySelectorAll('#cmd-list li'));
  let visibleLinks = items.map(li => li.querySelector('a, button'));
  let selectedIndex = 0;

  function updateSelection() {
    visibleLinks.forEach((l, i) => l.classList.toggle('selected', i === selectedIndex));
    if (visibleLinks[selectedIndex]) {
      visibleLinks[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      dialog.showModal();
      input.value = '';
      items.forEach(li => li.style.display = '');
      visibleLinks = items.map(li => li.querySelector('a, button'));
      selectedIndex = 0;
      updateSelection();
    }
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    visibleLinks = [];
    items.forEach(li => {
      const match = li.textContent.toLowerCase().includes(q);
      li.style.display = match ? '' : 'none';
      if (match) visibleLinks.push(li.querySelector('a, button'));
    });
    selectedIndex = 0;
    items.forEach(li => {
      const el = li.querySelector('a, button');
      if (el) el.classList.remove('selected');
    });
    updateSelection();
  });

  dialog.addEventListener('keydown', (e) => {
    if (visibleLinks.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % visibleLinks.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + visibleLinks.length) % visibleLinks.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleLinks[selectedIndex]) visibleLinks[selectedIndex].click();
    }
  });

  const themeToggle = document.getElementById('cmd-theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const toggleBtn = document.querySelector('.theme-toggle');
      if(toggleBtn) toggleBtn.click();
      dialog.close();
    });
  }
});

// =============================================
// Image Lightbox
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.post-content img, .photo-grid img, .photo-gallery img, .about-content img');
  if (images.length === 0) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const imgClone = document.createElement('img');
  overlay.appendChild(imgClone);
  document.body.appendChild(overlay);

  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      imgClone.src = img.src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// =============================================
// Live Age Counter
// =============================================
function updateAge() {
  const ageEl = document.getElementById('age-counter');
  if (!ageEl) return;
  const birthDate = new Date('2008-01-18T00:00:00Z');
  const now = new Date();
  const diffTime = now - birthDate;
  const age = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  ageEl.textContent = age.toFixed(1);
}
document.addEventListener('DOMContentLoaded', updateAge);
