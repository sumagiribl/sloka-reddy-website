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
    email:   'contact@slokareddyofficial.com',
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
    mode:        'live',
    releaseDate: '2026-07-16',
    preSave: {
      badge:    'Coming July 16',
      heading:  'Pre-save “Shine Like Me”',
      subtext:  'Be the first to hear it. Pre-save now and it lands in your library the moment it drops. Produced by Grammy-nominated producer Roy Hamilton III.',
      ctaLabel: 'PRE-SAVE ON YOUR PLATFORM',
      url:      'https://distrokid.com/hyperfollow/slokareddy/shine-like-me',
    },

    streaming: {
      spotify:    'https://open.spotify.com/album/4orAhHAwFslLeEw7G8Axsr',
      appleMusic: 'https://music.apple.com/us/song/shine-like-me/6788676990',
      youtube:    'https://www.youtube.com/watch?v=1VeXYRrW7o8',
    },
  },

  /* ── About ───────────────────────────────────────────────── */
  about: {
    photo: 'images/about_blend.png',
    bio: `Sloka Reddy is a 15-year-old singer-songwriter from Minnesota. Singing since age four, she has performed at the Minnesota State Fair and local showcases across the Twin Cities. She trains under S.P. Shailaja, an award-winning Indian cinema playback singer with more than 5,000 film songs to her name.<br><br>Sloka blends pop, R&amp;B, Bollywood, and contemporary influences into her music. After sharing vocal covers on Instagram, YouTube, and TikTok, she built a following of more than 100,000 in just over a year. Her debut original single <em>Shine Like Me</em>, produced by multi-platinum, Grammy-nominated producer Roy Hamilton III (Michael Jackson, Britney Spears, *NSYNC), marks an exciting new chapter. Her goal is to create songs that inspire and connect with people around the world.`,
  },

  /* ── Featured videos ─────────────────────────────────────────
     `id` is the 11-character YouTube video ID (the part after
     watch?v= ). Thumbnails are pulled from YouTube automatically.
     ──────────────────────────────────────────────────────────── */
  videos: [
    {
      title:      'Shine Like Me',
      subtitle:   '(Official Music Video)',
      id:         '1VeXYRrW7o8',
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
    epk:         'images/Sloka-Reddy-EPK-v1a.pdf',
    description: 'For press inquiries, interviews, or booking,\nplease download my EPK.',

    /* As Featured In — citation cards. `link` opens the live article;
       `images` (no link) opens an archival clipping in a lightbox. */
    featured: [
      {
        outlet:    'Pioneer Press',
        meta:      'TwinCities.com · July 2017',
        headline:  'Minnesota’s got talent',
        quote:     'Featured among the young performers who auditioned for a spot on the Minnesota State Fair amateur talent show stage.',
        link:      'http://www.twincities.com/2017/07/29/local-talent-auditions-at-leinie-lodge-at-the-minnesota-state-fair/',
        linkLabel: 'Read article',
      },
      {
        outlet:    'Woodbury Bulletin',
        meta:      'Print edition · August 12, 2015',
        headline:  'Sloka & the Snowgirl',
        quote:     'Woodbury 4-year-old advances to Minnesota State Fair talent show.',
        images:    ['images/press-woodbury-article.jpg', 'images/press-woodbury-front.jpg'],
        linkLabel: 'View clipping',
        archived:  true,
      },
    ],
  },

};
