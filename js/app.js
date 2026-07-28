/* ============================================================
   app.js – Dynamic rendering & interactivity for Portfolio
   ============================================================ */

(async function () {
  'use strict';

  /* ---------- ICON SVGs ---------- */
  const ICONS = {
    twitter: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>`,
    github: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    linkedin: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    instagram: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
  };

  /* ---------- HELPERS ---------- */
  function $(selector) { return document.querySelector(selector); }
  function $$(selector) { return document.querySelectorAll(selector); }

  function getColorClasses(color, type) {
    const palette = {
      blue:    { bg: 'bg-blue-100',    text: 'text-blue-700',    bar: 'bg-blue-500' },
      yellow:  { bg: 'bg-yellow-100',  text: 'text-yellow-700',  bar: 'bg-yellow-500' },
      cyan:    { bg: 'bg-cyan-100',    text: 'text-cyan-700',    bar: 'bg-cyan-500' },
      teal:    { bg: 'bg-teal-100',    text: 'text-teal-700',    bar: 'bg-teal-500' },
      green:   { bg: 'bg-green-100',   text: 'text-green-700',   bar: 'bg-green-500' },
      purple:  { bg: 'bg-purple-100',  text: 'text-purple-700',  bar: 'bg-purple-500' },
      orange:  { bg: 'bg-orange-100',  text: 'text-orange-700',  bar: 'bg-orange-500' },
      indigo:  { bg: 'bg-indigo-100',  text: 'text-indigo-700',  bar: 'bg-indigo-500' },
      red:     { bg: 'bg-red-100',     text: 'text-red-700',     bar: 'bg-red-500' },
      pink:    { bg: 'bg-pink-100',    text: 'text-pink-700',    bar: 'bg-pink-500' },
      gray:    { bg: 'bg-gray-100',    text: 'text-gray-700',    bar: 'bg-gray-500' }
    };
    return (palette[color] || palette.gray)[type];
  }

  /* ---------- LOAD DATA ---------- */
  let data;
  try {
    const resp = await fetch('data/portfolio.json');
    data = await resp.json();
  } catch (err) {
    console.error('Failed to load portfolio data:', err);
    return;
  }

  /* ---------- RENDER HERO ---------- */
  function renderHero() {
    const hero = $('#home');
    if (!hero || !data.profile) return;
    hero.querySelector('.absolute').style.backgroundImage = `url('${data.profile.heroImage}')`;
    hero.querySelector('img').src = data.profile.avatar;
    hero.querySelector('img').alt = data.profile.name;
    hero.querySelector('h1').innerHTML = `Hi, I'm <span class="text-blue-300">${data.profile.name.split(' ').slice(-1)[0]}</span>`;
    hero.querySelector('h1').closest('.relative').querySelector('h1').textContent = '';
    hero.querySelector('h1').closest('.relative').querySelector('h1').innerHTML = `Hi, I'm <span class="text-blue-300">${data.profile.name.split(' ').slice(-1)[0]}</span>`;

    const nameEl = hero.querySelector('.mb-6 + p');
    if (nameEl) nameEl.textContent = data.profile.description;
  }

  /* ---------- RENDER SKILLS ---------- */
  function renderSkills() {
    const grid = $('#skills-grid');
    if (!grid) return;
    grid.innerHTML = data.skills.map((skill, i) => `
      <div class="animate-on-scroll bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border group hover:-translate-y-1" style="transition-delay: ${i * 80}ms">
        <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">${skill.icon}</div>
        <h3 class="font-semibold text-lg mb-2">${skill.name}</h3>
        <p class="text-gray-500 text-sm mb-4">${skill.description}</p>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="skill-bar ${getColorClasses(skill.color, 'bar')} h-2 rounded-full" style="width: 0%" data-level="${skill.level}"></div>
        </div>
        <span class="text-xs text-gray-400 mt-2 inline-block skill-level">${skill.level}%</span>
      </div>
    `).join('');
  }

  /* ---------- RENDER PROJECTS ---------- */
  let activeFilter = 'all';

  function renderProjects(filter) {
    activeFilter = filter || 'all';
    const grid = $('#projects-grid');
    if (!grid) return;

    const filtered = activeFilter === 'all'
      ? data.projects
      : data.projects.filter(p => p.featured || activeFilter === 'all');

    grid.innerHTML = filtered.map((project, i) => `
      <div class="animate-on-scroll bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1" style="transition-delay: ${i * 100}ms">
        <div class="overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">${project.title}</h3>
          <p class="text-gray-600 mb-4 text-sm">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.tags.map(tag => `
              <span class="${getColorClasses(tag.color, 'bg')} ${getColorClasses(tag.color, 'text')} text-xs font-medium px-3 py-1 rounded-full">${tag.name}</span>
            `).join('')}
          </div>
          <a href="${project.link}" class="text-blue-600 font-semibold hover:underline text-sm">View Project →</a>
        </div>
      </div>
    `).join('');

    // Re-run scroll animation for new elements
    observeAnimations();
  }

  /* ---------- RENDER FOOTER SOCIAL ---------- */
  function renderFooterSocial() {
    const container = $('#footer-social');
    if (!container || !data.social) return;
    container.innerHTML = data.social.map(s => `
      <a href="${s.url}" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:${s.hoverColor} transition">
        ${ICONS[s.icon] || ''}
      </a>
    `).join('');
  }

  /* ---------- SCROLL ANIMATIONS ---------- */
  function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill bars
          entry.target.querySelectorAll('.skill-bar').forEach(bar => {
            const level = bar.getAttribute('data-level');
            setTimeout(() => { bar.style.width = level + '%'; }, 300);
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $$('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  /* ---------- NAVBAR SCROLL EFFECT ---------- */
  function initNavScroll() {
    const header = $('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md');
        header.classList.remove('shadow-sm');
      } else {
        header.classList.remove('shadow-md');
        header.classList.add('shadow-sm');
      }
    });
  }

  /* ---------- MOBILE MENU ---------- */
  function initMobileMenu() {
    const btn = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---------- INIT ---------- */
  renderHero();
  renderSkills();
  renderProjects('all');
  renderFooterSocial();
  observeAnimations();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();

})();