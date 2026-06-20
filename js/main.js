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

  // YouTube subscribe link (adds the one-click subscribe prompt)
  const ytSub = document.getElementById('ytSubscribe');
  if (ytSub && CONFIG.social.youtube) {
    const base = CONFIG.social.youtube;
    ytSub.href = base.includes('sub_confirmation')
      ? base
      : base + (base.includes('?') ? '&' : '?') + 'sub_confirmation=1';
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


// ── Featured videos carousel ──────────────────────────────────
(function () {
  const stage = document.getElementById('videoStage');
  if (!stage) return;

  const videos = CONFIG.videos || [];
  if (!videos.length) return;

  let active = 0;

  const escapeAttr = s => String(s || '').replace(/"/g, '&quot;');
  const thumbUrl   = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  // Render the click-to-play facade for the active video.
  function renderFacade() {
    const v = videos[active];
    stage.innerHTML = `
      <div class="vstage-facade">
        <img class="vstage-thumb" src="${thumbUrl(v.id)}" alt="${escapeAttr(v.title)}" onerror="this.style.display='none'" />
        <div class="vstage-placeholder"></div>
        <div class="vstage-shade"></div>
        <button class="vstage-play" aria-label="Play ${escapeAttr(v.title)}">
          <span class="vstage-play-ring">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 21,12 5,21"/></svg>
          </span>
        </button>
        <div class="vstage-caption">
          <span class="vstage-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3 3 0 00-2.12-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.57A3 3 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3 3 0 002.12 2.12C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.57a3 3 0 002.12-2.12C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.52v-7.04L15.86 12l-6.11 3.52z"/></svg>
            YOUTUBE
          </span>
          <h3 class="vstage-title">${escapeAttr(v.title)}</h3>
          ${v.subtitle ? `<p class="vstage-subtitle">${escapeAttr(v.subtitle)}</p>` : ''}
        </div>
      </div>`;
    stage.querySelector('.vstage-play').addEventListener('click', playActive);
  }

  // Swap in the official YouTube embed. A user-initiated play through
  // this player is what registers toward the public view count.
  function playActive() {
    const v = videos[active];
    const src = `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`;
    stage.innerHTML = `
      <iframe class="vstage-iframe" src="${src}" title="${escapeAttr(v.title)}"
        allow="accelerated-encoding; autoplay; encrypted-media; picture-in-picture; web-share"
        allowfullscreen></iframe>`;
  }

  function go(i) {
    active = (i + videos.length) % videos.length;
    renderFacade();
  }

  document.getElementById('videoPrev')?.addEventListener('click', () => go(active - 1));
  document.getElementById('videoNext')?.addEventListener('click', () => go(active + 1));

  renderFacade();
})();
