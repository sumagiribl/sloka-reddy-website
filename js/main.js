/* ============================================================
   SLOKA REDDY — Main JS
   ============================================================ */

// ── Hydrate page from CONFIG (defined in config.js) ──────────
function hydrateFromConfig() {
  // Simple text/html fields via data-config attribute
  document.querySelectorAll('[data-config]').forEach(el => {
    const keys = el.dataset.config.split('.');
    const value = keys.reduce((obj, k) => obj?.[k], CONFIG);
    if (value !== undefined) el.innerHTML = value;
  });

  // Social links (appear in mobile menu, footer, videos CTA)
  document.querySelectorAll('[data-social]').forEach(el => {
    const url = CONFIG.social[el.dataset.social];
    if (url) el.href = url;
  });

  // Streaming buttons
  document.querySelectorAll('[data-stream]').forEach(el => {
    const url = CONFIG.release.streaming[el.dataset.stream];
    if (url) el.href = url;
  });

  // Album art
  const albumImg = document.getElementById('albumArtImg');
  if (albumImg) albumImg.src = CONFIG.release.albumArt;

  // Album placeholder title (split on spaces for line breaks)
  const words = CONFIG.release.title.split(' ');
  const mid   = Math.ceil(words.length / 2);
  const ph    = document.getElementById('albumPlaceholderTitle');
  if (ph) ph.innerHTML = `${words.slice(0, mid).join(' ')}<br>${words.slice(mid).join(' ')}`;

  // About photo & bio
  const aboutImg = document.getElementById('aboutImg');
  if (aboutImg) aboutImg.src = CONFIG.about.photo;
  const aboutBio = document.getElementById('aboutBio');
  if (aboutBio) aboutBio.innerHTML = CONFIG.about.bio;

  // Videos grid
  const grid = document.getElementById('videosGrid');
  if (grid) {
    grid.innerHTML = CONFIG.videos.map(v => `
      <div class="video-card">
        <div class="video-thumb">
          <img src="${v.thumb}" alt="${v.title}" onerror="this.style.display='none'" />
          <div class="video-thumb-placeholder"></div>
          <a href="${v.url}" target="_blank" rel="noopener" class="video-play-btn" aria-label="Play ${v.title}">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><polygon points="4,2 16,9 4,16"/></svg>
          </a>
        </div>
        <p class="video-label">${v.title}${v.subtitle ? `<br><span>${v.subtitle}</span>` : ''}</p>
      </div>`).join('');
  }

  // EPK download link
  const epkLink = document.getElementById('epkLink');
  if (epkLink) epkLink.href = CONFIG.press.epk;

  // Contact email
  const emailLink = document.getElementById('contactEmail');
  if (emailLink) emailLink.href = `mailto:${CONFIG.artist.email}`;

  // Player duration
  const durEl = document.querySelector('.player-duration');
  if (durEl) durEl.textContent = CONFIG.release.durationLabel;
}

hydrateFromConfig();


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
function syncHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });


// ── Simulated audio player ────────────────────────────────────
const playBtn      = document.getElementById('playBtn');
const playIcon     = document.getElementById('playIcon');
const pauseIcon    = document.getElementById('pauseIcon');
const progressFill = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const progressWrap = document.getElementById('progressWrap');
const currentTimeEl = document.getElementById('currentTime');

const TRACK_DURATION = CONFIG.release.durationSeconds;
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
