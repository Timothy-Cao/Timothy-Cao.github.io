# Timothy Cao — Personal Web Profile Design Spec

## Overview

A dark, slick, interactive personal portfolio website for Timothy Cao. Built with Next.js App Router, styled with Tailwind CSS, animated with Framer Motion, and enhanced with cherry-picked components from Aceternity UI, Magic UI, and shadcn/ui. The site features five pages, a custom cursor, page transitions, scroll animations, 3D effects, and an easter egg.

## Tech Stack

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **UI Libraries (copy-paste):**
  - Aceternity UI — spotlight effect, 3D tilt cards, text reveal animations
  - Magic UI — particles background, border beam, meteors, confetti, animated beams
  - shadcn/ui — buttons, inputs, cards, separators, toast
- **Typing animation:** `react-type-animation` or custom hook
- **Form backend:** UI-only initially (no backend); form validates and shows a success toast on submit. Formspree can be wired in later by adding an action URL.
- **Optional:** `html2pdf.js` for resume download

## Color Palette

| Token       | Value                        |
|-------------|------------------------------|
| Background  | `#0a0a0a`                    |
| Surface     | `#111111`                    |
| Accent      | `#00e5ff` (electric cyan)    |
| Accent glow | `rgba(0, 229, 255, 0.15)`   |
| Text primary| `#e0e0e0`                    |
| Text muted  | `#888888`                    |

## Project Structure

```
src/
  app/
    layout.tsx          — root layout (navbar, custom cursor, global styles)
    page.tsx            — landing/hero page
    about/page.tsx      — biography
    case-study/page.tsx — cybersecurity case study
    resume/page.tsx     — embedded resume
    contact/page.tsx    — contact form + socials
  components/
    ui/                 — shadcn/aceternity/magic UI components
    navbar.tsx          — top nav with scroll blur effect
    cursor.tsx          — custom glowing cursor
    page-transition.tsx — framer motion wrapper
    particles.tsx       — interactive particle background
    footer.tsx
  lib/
    utils.ts
  assets/
    profile.jpg         — anime profile picture
  styles/
    globals.css
```

## Pages

### 1. Landing / Hero (`/`)

- Full-viewport hero section
- **Interactive particle background** — cursor-reactive, cyan particles on dark background
- Anime profile picture in circular frame with **cyan glow border beam** animation
- "Timothy Cao" displayed with **text reveal animation** (characters animate in sequentially)
- **Typing animation** cycling through: "Cybersecurity Analyst", "Developer", "Problem Solver"
- CTA button "Explore My Work" with glow hover effect, navigates to `/about`
- Subtle **meteor** effects drifting across the background

### 2. Biography (`/about`)

- Profile picture (smaller) alongside bio paragraph
- **Scroll-triggered fade-in** sections for: Background, Skills, Interests
- Skills displayed as glowing cyan pill/badge components with hover glow effect
- Timeline component showing career milestones (fabricated but realistic)
- Each timeline entry animates in on scroll with staggered delays

### 3. Cybersecurity Case Study (`/case-study`)

- Hero banner with title: "Operation Shadow Gate: Enterprise Network Penetration Assessment"
- **3D tilt cards** (Aceternity) for each engagement phase:
  - Reconnaissance — OSINT, network mapping, attack surface enumeration
  - Exploitation — vulnerability chaining, privilege escalation, lateral movement
  - Post-Exploitation — data exfiltration simulation, persistence mechanisms
  - Remediation — findings report, risk scoring, hardening recommendations
- Each card has a cyan icon, phase description, and key findings
- Terminal-style code blocks showing example commands/outputs
- Results summary with **animated stat counters**:
  - "12 Critical Vulnerabilities Found"
  - "47 Systems Assessed"
  - "98% Remediation Rate"
  - "3-Week Engagement"

### 4. Resume (`/resume`)

- Styled `div` designed to look like an embedded PDF document:
  - White `#ffffff` page on dark background
  - Subtle drop shadow and page border
  - A4-like proportions
- Fabricated but impressive content:
  - **Education:** B.S. Computer Science, notable university
  - **Experience:** Security Engineer roles at recognizable companies
  - **Certifications:** OSCP, CISSP, CEH, CompTIA Security+
  - **Skills:** Penetration Testing, Network Security, Python, Go, Cloud Security (AWS/GCP)
  - **Projects:** Open-source security tools, CTF competition placements
- "Download PDF" button with glow effect (generates PDF via html2pdf or is decorative initially)

### 5. Contact (`/contact`)

- Contact form with fields: Name, Email, Message
- Styled with shadcn inputs, cyan focus rings, glow on focus
- Submit button with hover glow effect
- Form submission is UI-only: validates inputs, shows success toast on submit. No backend wired initially.
- Social links row below form: GitHub, LinkedIn, Twitter/X, Email
- Each social icon has a **hover glow** effect (scale up + cyan glow)
- Subtle **animated beam** decoration connecting form area to social links

## Delight Features

### Custom Cursor

- Default cursor hidden via `cursor: none` on `body`
- Replaced with two elements:
  - Small inner cyan dot (~8px)
  - Larger trailing ring (~32px) that follows with spring-based delay
- On hover over interactive elements (links, buttons, cards):
  - Ring expands (~48px)
  - Glow intensifies
- Rendered as a global component in root `layout.tsx`

### Page Transitions

- Framer Motion `AnimatePresence` wrapper around route content
- Enter: fade in + slide up 20px, duration 300ms, ease-out
- Exit: fade out, duration 200ms
- Applied consistently across all route changes

### Scroll-Triggered Animations

- All major sections use Framer Motion `whileInView`
- Elements fade up from 20px below with opacity 0 → 1
- Staggered delays (50-100ms) for lists, grids, and sequential content
- `once: true` — animations trigger only on first scroll into view

### 3D Tilt Cards

- Applied to case study phase cards
- Card surface tilts toward cursor position (max ~15deg)
- Subtle light/glare overlay follows cursor across card surface
- Spring-based return to flat on mouse leave (stiffness: 150, damping: 15)

### Typing Animation

- Located in hero section below the name
- Cycles through role titles with blinking cursor character
- Type speed: ~80ms per character
- Pause between phrases: ~2 seconds
- Delete speed: ~40ms per character

### Easter Egg — Konami Code

- Listens for key sequence: Up Up Down Down Left Right Left Right B A
- On completion: full-screen **confetti explosion** via Magic UI confetti component
- Toast notification appears: "You found the secret!"
- Confetti auto-clears after 3 seconds
- Works on any page

### Navbar

- Fixed position at top, full-width
- Initial state: fully transparent background
- On scroll (>50px):
  - Background transitions to `rgba(10, 10, 10, 0.8)`
  - `backdrop-filter: blur(12px)` applied
  - Subtle bottom border appears (`rgba(0, 229, 255, 0.1)`)
  - Height shrinks slightly (64px → 56px)
- Navigation links: Home, About, Case Study, Resume, Contact
- Active page link has cyan underline indicator
- Hover state: text color transitions to cyan

## Responsive Considerations

- Mobile-first Tailwind breakpoints
- Custom cursor hidden on touch devices (fall back to default)
- Particle count reduced on mobile for performance
- Navbar collapses to hamburger menu on small screens
- 3D tilt effects disabled on touch devices
- Resume page scrollable on mobile (maintains PDF-like styling)

## Dependencies

```json
{
  "next": "^14",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "react-type-animation": "^3",
  "@tsparticles/react": "^3",
  "tsparticles": "^3",
  "lucide-react": "^0.4"
}
```

Plus copy-pasted components from Aceternity UI, Magic UI, and shadcn/ui (no npm packages — source copied into `components/ui/`).
