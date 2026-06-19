/* ============================================================
   SLOKA REDDY — Main JS
   ============================================================ */

// ── Mobile menu ──────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay    = document.getElementById('overlay');
const menuClose  = document.getElementById('menuClose');

function openMenu() {
  mobileMenu.classList.add('open');
  overlay.classList.add('visible');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('visible');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});


// ── Active nav link on scroll ─────────────────────────────────
const sections  = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))}px 0px 0px 0px` });

sections.forEach(s => observer.observe(s));


// ── Header shadow on scroll ───────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 16px rgba(180, 60, 100, 0.12)'
    : 'none';
}, { passive: true });


// ── Simulated audio player ────────────────────────────────────
const playBtn      = document.getElementById('playBtn');
const playIcon     = document.getElementById('playIcon');
const pauseIcon    = document.getElementById('pauseIcon');
const progressFill = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const progressWrap = document.getElementById('progressWrap');
const currentTimeEl = document.getElementById('currentTime');

const TRACK_DURATION = 204; // 3:24 in seconds
let playing  = false;
let progress = 0;        // 0–100
let ticker   = null;

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateUI() {
  progressFill.style.width        = `${progress}%`;
  progressThumb.style.left        = `${progress}%`;
  progressWrap.setAttribute('aria-valuenow', Math.round(progress));
  currentTimeEl.textContent       = formatTime((progress / 100) * TRACK_DURATION);
}

function startTick() {
  ticker = setInterval(() => {
    progress += 100 / TRACK_DURATION;
    if (progress >= 100) {
      progress = 0;
      playing  = false;
      playIcon.style.display  = '';
      pauseIcon.style.display = 'none';
      clearInterval(ticker);
      ticker = null;
    }
    updateUI();
  }, 1000);
}

playBtn.addEventListener('click', () => {
  playing = !playing;
  playIcon.style.display  = playing ? 'none' : '';
  pauseIcon.style.display = playing ? ''     : 'none';

  if (playing) {
    startTick();
  } else {
    clearInterval(ticker);
    ticker = null;
  }
});

// Click on progress bar to seek
progressWrap.addEventListener('click', e => {
  const rect = progressWrap.getBoundingClientRect();
  const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  progress   = pct * 100;
  updateUI();
});


// ── Smooth scroll for all anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
