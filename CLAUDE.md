# Portfolio — Agent Development Guide

## Project Overview

Personal portfolio website for Timothy Cao. React SPA with interactive games, music compositions, photo gallery, blog content, and external project links. Deployed on Vercel.

## Tech Stack

- **Framework**: React 18 + Vite 7
- **Styling**: Tailwind CSS 3 (primary) + MUI 6 (complex components only)
- **Routing**: React Router 7 with lazy-loaded routes
- **Deployment**: Vercel (see `vercel.json`)
- **Forms**: Formspree (`@formspree/react`)
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

## Project Structure

```
src/
├── main.jsx                    # Entry point + ErrorBoundary
├── App.jsx                     # Router + lazy route definitions
├── index.css                   # Tailwind directives + global styles
├── components/                 # Shared UI components
│   ├── Sidebar.jsx             # Desktop nav (>768px)
│   └── TopNavMenu.jsx          # Mobile nav (≤768px)
├── pages/                      # Route-level page components
│   ├── Home.jsx                # Landing page with blog grid
│   ├── About.jsx               # Tabbed about section
│   ├── Contact.jsx             # Formspree contact form
│   └── blogs/                  # Content pages
│       ├── Music.jsx           # Audio/video compositions
│       ├── Gallery.jsx         # Photo masonry grid + lightbox
│       ├── Astronomy.jsx       # NASA APOD integration
│       ├── Youtube.jsx         # Video recommendations
│       ├── Piano.jsx           # Piano YouTuber accordions
│       ├── Guess.jsx           # Fermi estimation game wrapper
│       ├── Scrabble.jsx        # Scrabble word trainer
│       ├── TwentyFour.jsx      # Make-24 math game
│       ├── Othello.jsx         # Placeholder page
│       ├── BoardGamesPage.jsx  # Game hub with cards
│       ├── MathArt.jsx         # Desmos art blog
│       ├── MathArt/            # MathArt sub-components
│       │   ├── MathArtSection.jsx
│       │   └── mathArtTopics.jsx    # Data file (camelCase)
│       ├── PrimeClimb.jsx      # Game theory article
│       └── PrimeClimb/         # PrimeClimb sub-components
│           ├── PrimeClimbGame.jsx
│           ├── GameTheorySection.jsx
│           └── GameTheoryTopics.jsx  # Data file
├── utils/                      # Utilities and data
│   ├── FermiQuestions.jsx      # Interactive dial game component
│   ├── 24table.json            # Make-24 puzzle data
│   ├── num_properties.json     # PrimeClimb number data
│   └── property_nums.json      # PrimeClimb lookup data
└── styles/
    └── ButtonShimmer.css       # Sidebar hover animation
```

## Conventions

### File Naming
- **Components**: PascalCase (`MathArtSection.jsx`)
- **Data files**: camelCase (`mathArtTopics.jsx`)
- **JSON data**: camelCase (`24table.json`)

### Component Patterns
- Arrow function components: `const MyComponent = () => { ... };`
- `export default` at file bottom
- Imports ordered: React → external libs → local components → styles

### Styling Priority
1. **Tailwind classes** — default for all layout, spacing, color, typography
2. **MUI `sx` prop** — only for MUI-specific components (Accordion, Tabs, Modal)
3. **Inline `style`** — only for truly dynamic values or iframe borders
4. Never use deprecated HTML attributes (`frameBorder` → `style={{ border: "none" }}`)

### Data & Keys
- Use unique string keys for `.map()` rendering (titles, IDs) — never array index
- Static data arrays live at module scope above the component
- External links use `<a>` with `target="_blank" rel="noopener noreferrer"`
- Internal links use React Router's `<Link to={...}>`

### State
- All state management via `useState` / `useEffect` hooks
- No global state management library — keep state local
- Clean up intervals/timeouts/event listeners in `useEffect` return

### Environment Variables
- Prefix with `VITE_` for client access (Vite convention)
- Store secrets in `.env` (gitignored), use fallback for public APIs
- Example: `const key = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";`

## Adding a New Page

1. Create `src/pages/blogs/NewPage.jsx`
2. Add lazy import in `App.jsx`: `const NewPage = lazy(() => import("./pages/blogs/NewPage"));`
3. Add route: `<Route path="/blogs/new-page" element={<NewPage />} />`
4. Add to `Sidebar.jsx` blogItems and `TopNavMenu.jsx` menuItems
5. Optionally add a card to `Home.jsx` blogs array

## Adding a New Blog Card on Home

Add an entry to the `blogs` array in `Home.jsx`:
```js
{
  title: "My New Thing",
  subtitle: "Description here",
  href: "/blogs/new-page",         // or "https://external.com"
  image: "/assets/media/blog_covers/image.jpg",
  hoverEffect: undefined,          // optional: "gallery" | "music" | "spin"
}
```
External `href` values automatically render as `<a>` tags with `target="_blank"`.

## Security Notes
- Never hardcode API keys in source — use `VITE_*` env vars
- Never use `eval()` — use safe parsers (see `safeEvaluate` in TwentyFour.jsx)
- Always use `rel="noopener noreferrer"` on external links
- Validate/sanitize user input before processing

## Testing

No test suite currently configured. When adding tests:
- Use Vitest (already in devDependencies)
- Place test files next to source: `Component.test.jsx`
- Run with `npx vitest`
