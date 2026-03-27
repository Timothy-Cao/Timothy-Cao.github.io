# Portfolio Migration Design Spec

## Overview

Migrate all content from Timothy Cao's old portfolio (`Timothy-Cao.github.io`, React+Vite SPA) into the new Next.js 16 portfolio. Replace fabricated cybersecurity persona with real biographical info. Keep the dark/cyan aesthetic and all existing delight features (custom cursor, particles, page transitions, Konami easter egg, scroll animations). Add a "Playground" hub page to house all migrated interactive content.

## Navigation

```
Home | About | Playground | Resume | Contact
```

## Route Structure

```
/                          → Hero landing (existing, update typing roles)
/about                     → Real bio (migrated from old site)
/playground                → Interactive card grid hub
/playground/music          → 15 compositions with audio players
/playground/gallery        → 64-photo masonry + lightbox
/playground/videos         → 22 curated video essays
/playground/piano          → 11 piano YouTuber accordions
/playground/fermi          → Interactive dial estimation game
/playground/games          → Board games hub + brain teasers
/playground/games/scrabble → Scrabble trainer
/playground/games/24       → Math Game 24
/playground/math-art       → Desmos embeds + math art sections
/playground/astronomy      → NASA APOD (ISR, revalidate: 3600)
/resume                    → Placeholder "Coming Soon"
/contact                   → Contact form (Formspree myzyavkz) + social links
```

## Data Architecture

Content data extracted into `/src/data/` as typed TypeScript arrays/objects:
- `music.ts` — 15 tracks with title, year, description, audioFile, isFavorite, youtubeUrl
- `videos.ts` — 22 entries with title, creator, youtubeId, description
- `piano.ts` — 11 channels with name, handle, genres, videoIds[]
- `scrabble.ts` — 50 word sets with letters and valid words
- `24table.json` — ~1000 math puzzles (copied from old site)
- `brain-teasers.ts` — 3 puzzles with image, solution image/gif
- `math-art.ts` — 11 sections with type (iframe/video/images/text), content, descriptions
- `about.ts` — bio text, hobbies, career timeline entries

Media assets copied to `public/assets/media/` preserving old structure:
- `audio/` — 15 MP3 files
- `Photo Gallery/` — 64 JPGs
- `desmos/` — 4 PNGs
- `puzzles/` — 6 images/GIFs
- `games/` — 5 cover images
- `blog_covers/` — 7 cover images
- `about/` — rabbit.jpg, waterloo.png

## Page Designs

### Home (`/`)
- Keep existing hero: particles, meteors, profile pic with glow, character reveal animation
- Update typing roles: "Software Engineer" | "Security Engineer" | "Composer" | "Fullstack Developer"
- Keep CTA button + scroll indicator

### About (`/about`)

**Hero section:**
- Anime profile pic with cyan glow border
- "Hi! I'm Timothy Cao"
- Bio: 25 years old, Markham Canada, MBTI INTP/ENFP, bouncy walk, persistent backpack

**Professional section (scroll-triggered):**
- Education: BCS from University of Waterloo (2023)
- Animated timeline: Pharmacy → Math tutoring → Software internships (government, startups, big tech, AR) → Canadian startup → Real estate freelance → ByteDance California

**Personal section (scroll-triggered):**
- Hobbies as interactive pill tags: racquet sports, rock climbing, composition, piano, boardgames, videogames
- Pudding card: rabbit photo, "4kg, hates vacuums"

**Credits footer:**
- Built with: Next.js, Tailwind, Framer Motion, Vercel
- Disclaimers (no affiliation with Desmos, NASA, etc.)

### Playground Hub (`/playground`)

Responsive grid: 2 cols mobile → 3 tablet → 4 desktop. 8 interactive cards:

| Card | Cover | Hover Effect | Subtitle |
|------|-------|--------------|----------|
| Gallery | me_1.jpg | Cycles through gallery photos | "A year in the life of Tim Cao" |
| Music | music.png | Plays audio preview | "Sample some of my past works!" |
| Video Recs | thinker.jpg | Film-grain overlay | "Thought-provoking video essays" |
| Board Games | checkers.jpg | Card spin/flip | "A guide to ruining boardgame night" |
| Math Art | math.png | Parallax depth shift | "How bored have you gotten in math class?" |
| Fermi | fermi.jpg | Dial rotation animation | "For those with itchy brains" |
| Piano YouTubers | piano cover | Keys light up | "Curated piano channels" |
| Astronomy | nasa.png | Star-field twinkle | "Your daily dose of NASA" |

Shared styling: dark surface (#111), subtle border, cyan glow on hover, title + subtitle, scale 1.02x on hover.

### Music (`/playground/music`)
- Header + disclaimer ("I am not liable to headaches induced by my songs")
- 15 compositions: title, year, description, favorite star badge
- Custom audio player: play/pause, progress bar, dark + cyan styling
- Dodoman's Theme: YouTube embed instead of audio
- Favorites pinned to top

### Gallery (`/playground/gallery`)
- "Looking back on 2024" subtitle
- Masonry grid: 2 → 3 → 4 columns responsive
- 64 images lazy-loaded with blur placeholders
- Click opens lightbox: full-screen, dark overlay, prev/next nav, close button

### Video Recommendations (`/playground/videos`)
- 22 videos in vertical list
- Each: lazy YouTube iframe, title + creator, description
- Ordered as in old site

### Piano YouTubers (`/playground/piano`)
- 11 accordion sections
- Channel name, handle, genre tags (pills)
- Expanded: horizontal scroll row of 4 YouTube embeds
- Iframes lazy-loaded on accordion open

### Fermi Estimations (`/playground/fermi`)
- Rotatable SVG dial (touch + mouse)
- Range: -50 to 50 exponent
- Fetches questions from GitHub JSON
- Score panel: running score, accuracy %, previous answers
- Scoring: 5 pts exact, 3 pts ±1, 1 pt ±2, 0 otherwise

### Board Games Hub (`/playground/games`)
- Card grid: Scrabble, Math 24, Chinese Checkers (external link), Prime Climb ("Coming Soon"), Othello ("Coming Soon")
- Brain Teasers section at bottom: chess puzzle, tetris puzzle, triangle puzzle with solution reveal on click

### Scrabble Trainer (`/playground/games/scrabble`)
- 50 most-likely letter combos
- Guess words from scrambled letters
- Shuffle, "Check Answers" reveal, next question
- Educational note about alphabetical tile sorting

### Math Game 24 (`/playground/games/24`)
- 4 number cards displayed
- Text input for expression
- Safe recursive descent parser (port from old site)
- Validates numbers used + result = 24
- "Check Answer" reveals solution

### Math Art (`/playground/math-art`)
- 10-11 accordion sections
- Content types: Desmos iframes, YouTube videos, images with captions, text
- "Your Turn" section with blank Desmos calculator
- Lazy-load embeds on accordion open

### Astronomy (`/playground/astronomy`)
- Server component with ISR (revalidate: 3600)
- NASA APOD fetch with DEMO_KEY
- Displays image/video, title, explanation
- Source attribution
- Loading skeleton

### Resume (`/resume`)
- Placeholder page
- "Resume — Coming Soon" centered
- Animated border beam around empty document silhouette

### Contact (`/contact`)
- Keep existing form design
- Formspree endpoint: myzyavkz
- Real social links from old site
- Tagline: "Message me about anything except my car's extended warranty."

## Global Features (existing, unchanged)
- Custom cursor: cyan glow dot + trailing ring
- Page transitions: fade/slide via AnimatePresence
- Scroll-triggered animations: whileInView fade-up
- Konami code easter egg: confetti explosion
- Navbar: transparent → blur on scroll, active link cyan underline
- 3D tilt cards on playground hub + games hub
- Responsive: mobile-first with md breakpoint

## Technical Details

### NASA Caching
- Server component or API route at `/api/nasa` or inline in astronomy page
- `revalidate: 3600` (ISR, once per hour)
- Uses `DEMO_KEY` (env variable `NASA_API_KEY` for future upgrade)
- Eliminates rate limit concerns

### Asset Migration
- Copy all media from `Timothy-Cao.github.io/public/assets/media/` to `profile_example/public/assets/media/`
- Maintain directory structure
- Audio files: 15 MP3s in `audio/`
- Gallery: 64 JPGs in `Photo Gallery/`

### Component Structure
New components needed:
- `AudioPlayer` — custom styled audio player
- `Lightbox` — full-screen image viewer with navigation
- `Accordion` — expandable sections (for piano, math art)
- `FermiDial` — rotatable SVG dial
- `MathExpressionParser` — recursive descent evaluator (port from old site)
- `PlaygroundCard` — interactive card with per-card hover behavior
- `MasonryGrid` — responsive masonry layout
- `Timeline` — career timeline (update existing with real data)

Reuse existing components:
- `ScrollReveal`, `TiltCard`, `AnimatedCounter`, `BorderBeam`, `Meteors`, `Particles`
- `Navbar` (add Playground + Resume links + theme toggle dropdown)
- `PageTransition`, `CustomCursor`, `KonamiEasterEgg`

## Theme Toggle

A dropdown in the navbar that switches between 6 color schemes. Each theme changes the accent color + subtle background tint while keeping the dark base.

### Themes

| Theme | Accent | Vibe |
|-------|--------|------|
| **Cyber Cyan** (default) | `#00e5ff` | Current look |
| **Neon Purple** | `#b388ff` | Modern/trendy |
| **Matrix Green** | `#00ff41` | Terminal hacker |
| **Solar Gold** | `#ffd740` | Warm/premium |
| **Sakura Pink** | `#ff80ab` | Anime/soft |
| **Arctic White** | `#e0e0e0` | Clean/minimal |

### Implementation
- CSS custom properties: `--accent`, `--accent-glow`, `--accent-dim` swapped per theme
- `ThemeProvider` React context wrapping the app
- Persisted to `localStorage` — remembers user's choice across sessions
- Dropdown in navbar: small color swatch circle next to each theme name
- All existing cyan references in components/CSS replaced with `var(--accent)`
- Glow effects, border beams, hover states, cursor, skill pills — all inherit from the CSS variable
- Smooth 300ms transition when switching themes
