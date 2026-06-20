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
    email:   'slokapinnapureddy@gmail.com',
    copyright: '2024 Sloka Reddy. All rights reserved.',
  },

  /* ── Social links ────────────────────────────────────────── */
  social: {
    instagram:  'https://www.instagram.com/sloka.reddyy',
    tiktok:     'https://www.tiktok.com/@sloka.reddyy',
    spotify:    'https://open.spotify.com/artist/6qt8eRlnpL6IKgFVHahoSp?si=NKRjLdn6TVScPHVKx1Jj-Q&nd=1&dlsi=4b6e9075453b4189',
    youtube:    'https://www.youtube.com/@Sloka_Reddy',
    appleMusic: 'https://music.apple.com/us/artist/sloka-reddy/6779884821',
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
      title:    'Shine Like Me',
      subtitle: '(Official Music Video)',
      id:       'REPLACE_WITH_VIDEO_ID',
    },
    {
      title: 'Cover: Until I Found You',
      id:    'REPLACE_WITH_VIDEO_ID',
    },
    {
      title: 'Behind The Scenes',
      id:    'REPLACE_WITH_VIDEO_ID',
    },
  ],

  /* ── Press & EPK ─────────────────────────────────────────── */
  press: {
    epk:         'images/Sloka-Reddy-EPK.pdf',
    description: 'For press inquiries, interviews, or booking,\nplease download my EPK.',
  },

};
