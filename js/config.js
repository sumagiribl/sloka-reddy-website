/* ============================================================
   SLOKA REDDY — Site Configuration
   Edit this file to update content, links, and labels.
   Never edit index.html or style.css for content changes.
   ============================================================ */

const CONFIG = {

  /* ── Artist ──────────────────────────────────────────────── */
  artist: {
    name:    'SLOKA REDDY',
    tagline: 'SINGER · SONGWRITER · PERFORMER',
    email:   'slokapreddy@gmail.com',
    copyright: `${new Date().getFullYear()} Sloka Reddy. All rights reserved.`,
  },

  /* ── Social links ────────────────────────────────────────── */
  social: {
    instagram:  'https://www.instagram.com/sloka.reddyy',
    tiktok:     'https://www.tiktok.com/@sloka.reddyy',
    spotify:    'https://open.spotify.com/artist/6qt8eRlnpL6IKgFVHahoSp?si=NKRjLdn6TVScPHVKx1Jj-Q&nd=1&dlsi=4b6e9075453b4189',
    youtube:    'https://www.youtube.com/@Sloka_Reddy',
    appleMusic: 'https://music.apple.com/us/artist/sloka-reddy/6779884821',
    facebook:   'https://www.facebook.com/share/1ELKQKo2Jr/?mibextid=wwXIfr',
    linktree:   'https://linktr.ee/slokapinnapureddy?utm_source=linktree_profile_share',
  },

  /* ── Latest release ──────────────────────────────────────── */
  release: {
    title:           'Shine Like Me',
    status:          'Out Now',
    albumArt:        'images/shine-like-me.jpg',
    trackName:       'Shine Like Me',
    artistName:      'Sloka Reddy',
    durationLabel:   '3:24',
    durationSeconds: 204,

    /* ── Pre-save / release toggle ─────────────────────────────
       Before the song is live, the section shows the DistroKid
       hyperfollow (pre-save) call-to-action. On release day it
       automatically flips to the live player + streaming links.

       mode:
         'auto'    → shows pre-save until releaseDate, then live
         'presave' → force the pre-save CTA (preview it anytime)
         'live'    → force the live player (preview it anytime)
       releaseDate is the local date the song goes live (YYYY-MM-DD).
       ──────────────────────────────────────────────────────── */
    mode:        'auto',
    releaseDate: '2026-07-16',
    preSave: {
      badge:    'Coming July 16',
      heading:  'Pre-save “Shine Like Me”',
      subtext:  'Be the first to hear it. Pre-save now and it lands in your library the moment it drops.',
      ctaLabel: 'PRE-SAVE ON YOUR PLATFORM',
      url:      'https://distrokid.com/hyperfollow/slokareddy/shine-like-me',
    },

    streaming: {
      spotify:    'https://open.spotify.com/track/REPLACE_WITH_TRACK_ID',
      appleMusic: 'https://music.apple.com/REPLACE_WITH_TRACK_LINK',
      youtube:    'https://youtube.com/watch?v=REPLACE_WITH_VIDEO_ID',
    },
  },

  /* ── About ───────────────────────────────────────────────── */
  about: {
    photo: 'images/about_blend.png',
    bio: `Sloka Reddy is a teenage singer-songwriter from Minnesota. Singing since age four, she blends pop, R&amp;B, Bollywood, and contemporary influences into her music. Her cover songs on Instagram, YouTube, and TikTok have built a growing fanbase, and her debut original single <em>Shine Like Me</em> marks an exciting new chapter. Her goal is to create songs that inspire and connect with people around the world.`,
  },

  /* ── Featured videos ─────────────────────────────────────────
     `id` is the 11-character YouTube video ID (the part after
     watch?v= ). Thumbnails are pulled from YouTube automatically.
     ──────────────────────────────────────────────────────────── */
  videos: [
    {
      title:      'Shine Like Me',
      subtitle:   '(Official Music Video)',
      comingSoon: true,                    // native premiere slide with countdown + pre-save
      id:         'REPLACE_WITH_VIDEO_ID',
    },
    {
      title: 'Cover: Hate That I Made You Love Me',
      id:    'FwSoyPuBL5c',
    },
    {
      title: 'Cover: Human Nature by Michael Jackson',
      id:    'NVrTMkO8MEg',
    },
  ],

  /* ── Analytics ──────────────────────────────────────────────
     Paste your GA4 Measurement ID (G-XXXXXXXXXX) below.
     Get one free at analytics.google.com → create property.
     Leave blank to disable tracking.
     ──────────────────────────────────────────────────────────── */
  analytics: {
    ga4: '',
  },

  /* ── Press & EPK ─────────────────────────────────────────── */
  press: {
    epk:         'images/Sloka-Reddy-EPK.pdf',
    description: 'For press inquiries, interviews, or booking,\nplease download my EPK.',
  },

};
