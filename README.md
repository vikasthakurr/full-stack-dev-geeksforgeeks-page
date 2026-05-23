# GFG MERN Stack Full Program — Landing Page

A production-ready marketing landing page for the **GeeksforGeeks MERN Stack Full Program**, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS with CSS variable-based dark/light theming
- **Animations** — Framer Motion
- **Icons** — FontAwesome (solid + brands)
- **Theme** — next-themes
- **UI extras** — Lucide React

---

## Getting Started

```bash
# Install dependencies
cd next-app
npm install

# Run dev server
npm run dev

# Production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
next-app/
├── public/
│   └── assets/          # Instructor images (vikas.jpeg, pratyush.jpeg)
├── src/
│   ├── app/
│   │   ├── globals.css  # CSS variables, theme tokens, marquee keyframes
│   │   ├── layout.tsx   # Root layout, ThemeProvider, Navbar, Footer
│   │   └── page.tsx     # Home page — all sections composed here
│   └── components/
│       ├── Navbar.tsx         # Fixed nav, anchor links, theme toggle, hamburger
│       ├── Hero.tsx           # Canvas bg animation, orbit animation, count-up stats
│       ├── Overview.tsx       # Course overview tabs + IBM cert + alumni marquee
│       ├── WhyChoose.tsx      # Support pillars + sticky scroll-stack cards
│       ├── Skills.tsx         # Dual-row marquee of skills
│       ├── Curriculum.tsx     # 11-phase sidebar with arrow connectors + topic grid
│       ├── Instructor.tsx     # Two mentor cards with stats and bio
│       ├── Reviews.tsx        # Auto-advancing review carousel
│       ├── UpcomingBatch.tsx  # Live countdown + batch cards with seat bar
│       ├── Enroll.tsx         # FAQ accordion + sticky enroll card
│       ├── Footer.tsx         # Nav links + social icons
│       ├── PromoBanner.tsx    # Dismissible promo strip (localStorage)
│       ├── Icon.tsx           # FontAwesome wrapper with singleton library.add()
│       └── ThemeProvider.tsx  # next-themes wrapper
├── tailwind.config.ts   # Semantic color tokens mapped to CSS vars
└── tsconfig.json
```

---

## Features

- **Single-page** — all sections on `/`, navbar uses `#anchor` links with IntersectionObserver active state
- **Dark / Light mode** — CSS variable-based, toggled via next-themes, consistent across all components
- **Animated hero** — canvas particle background (code symbols + connection lines), orbiting tech icons, floating notification cards, count-up stats
- **Sticky scroll-stack cards** — WhyChoose section cards stack on top of each other as you scroll
- **Live countdown** — UpcomingBatch section counts down to the next batch start time
- **Continuous marquees** — alumni placements, skills, and careers company cards all use CSS marquee animations
- **Curriculum sidebar** — arrow-connected step flow with 11 phases and detailed topic grids
- **IBM Certification block** — embedded in Overview with certificate image
- **Lazy loading** — all below-fold components use `next/dynamic` for code splitting
- **Mobile responsive** — hamburger menu with scroll lock + Escape key, responsive grids throughout

---

## Deployment

Optimised for **Vercel**. Push to GitHub and import — Next.js is auto-detected, no config needed.

```bash
# Vercel CLI (optional)
npx vercel
```

---

## Customisation

| What | Where |
|------|-------|
| Batch dates & seats | `UpcomingBatch.tsx` — top constants |
| Instructor details | `Instructor.tsx` — `mentors` array |
| Curriculum phases | `Curriculum.tsx` — `phases` array |
| Alumni placements | `Overview.tsx` — `placements` array |
| Brand colors | `tailwind.config.ts` + `globals.css` |
| Promo banner text | `PromoBanner.tsx` |

---

## License

Private — GeeksforGeeks internal use.
