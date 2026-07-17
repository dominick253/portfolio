# AGENTS.md — dominick253/portfolio

> **Canonical AI Agent Protocol**
> Auto-generated from repo analysis. This file is the single source of truth for any AI agent operating on this repository.

---

## 1. Repository Identity

| Field | Value |
|---|---|
| **Name** | `dominickp-portfolio` |
| **Version** | 2.0.0 |
| **Owner** | Dominick Pescetto |
| **Role** | Senior AI Engineer |
| **Stack** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion |
| **Type** | Public personal portfolio website |
| **Deployment** | Docker (standalone output) → Vercel (recommended) |
| **Branch** | `main` |

This is a **Next.js 16 App Router** portfolio with a dark theme, animated Perlin noise background, and a Linear/NVIDIA/SpaceX-inspired design system. It showcases AI engineering and CTV platform architecture work.

---

## 2. File Tree

```
portfolio/
├── .github/
│   └── workflows/              # GitHub Actions CI
├── public/                     # Static assets (images, fonts, etc.)
├── src/
│   ├── app/
│   │   ├── page.tsx            # Root page (client component)
│   │   ├── layout.tsx          # Root layout (metadata, fonts, JSON-LD)
│   │   └── globals.css         # Global CSS + Tailwind @theme + @layer
│   ├── components/
│   │   ├── backgrounds/
│   │   │   └── PerlinNoiseBg.tsx  # Animated flow-field canvas background
│   │   ├── About.tsx           # About section
│   │   ├── ContactForm.tsx     # Contact form component
│   │   ├── FeaturedProjects.tsx # Projects grid
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Hero.tsx            # Hero/landing section
│   │   ├── Navigation.tsx      # Top navigation bar
│   │   └── ProjectCard.tsx     # Individual project card
│   └── data/
│       └── projects.ts         # Static project data (Project[] + BlogPost[])
├── .gitignore
├── Dockerfile                  # Production Docker build (standalone output)
├── README.md
├── AGENTS.md                   # This file
├── CLAUDE.md                   # Claude-specific overrides
├── eslint.config.mjs           # ESLint 9 flat config
├── next.config.ts              # Next.js config (standalone output, turbopack)
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 3. Tech Stack & Dependencies

### Core
- **Framework**: Next.js 16.2.10 (App Router, `"output: standalone"` in next.config.ts)
- **UI Library**: React 19.2.4
- **Language**: TypeScript 5 (strict mode, `@/*` path alias → `./src/*`)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/postcss` with `@theme inline` CSS custom properties
- **Animation**: Framer Motion 12.42.2
- **Icons**: Lucide React 1.24.0

### Utilities
- `clsx` — Conditional className merging
- `tailwind-merge` — Tailwind className deduplication

### Dev Tooling
- ESLint 9 (flat config `eslint.config.mjs`)
- PostCSS 4 (via `@tailwindcss/postcss`)
- TypeScript type definitions for Node and React

---

## 4. Development Protocol

### Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (standalone output)
npm run start        # Start production server
npm run lint         # Run ESLint

# Git workflow
git checkout -b feat/<feature-name>
git commit -m "feat: <description>"
git push origin feat/<feature-name>
```

### Code Standards
- **File naming**: PascalCase for components (e.g., `Hero.tsx`, `ProjectCard.tsx`)
- **Imports**: Use `@/` alias for `src/` imports (configured in `tsconfig.json` `paths`)
- **Components**: Client components use `"use client"` directive at top
- **Styling**: Tailwind utility classes exclusively; no inline styles or CSS modules
- **Animations**: Framer Motion `motion.div` with `initial`/`whileInView`/`viewport` props
- **TypeScript**: Strict mode, no `any`, explicit return types on exported functions

---

## 5. Component Architecture

### Page Structure (`src/app/page.tsx`)

The root page is a **client component** that composes the following:

```
<FlowFieldBg />          # Animated Perlin noise background (full-screen canvas)
<Navigation />           # Sticky top navigation bar
<main>
  <Hero />               # Hero/landing section
  <FeaturedProjects />   # Projects grid
  <About />              # About me section
  <CTA Section>          # "Let's Build Together" contact CTA
</main>
<Footer />               # Site footer
```

### Component Responsibilities

| Component | File | Purpose |
|---|---|---|
| `FlowFieldBg` | `src/components/backgrounds/PerlinNoiseBg.tsx` | Full-screen animated canvas with Perlin noise flow field trails |
| `Navigation` | `src/components/Navigation.tsx` | Top nav bar with links and mobile menu |
| `Hero` | `src/components/Hero.tsx` | Hero section with name, title, CTA |
| `FeaturedProjects` | `src/components/FeaturedProjects.tsx` | Grid of featured project cards |
| `ProjectCard` | `src/components/ProjectCard.tsx` | Individual project card with image, title, description |
| `About` | `src/components/About.tsx` | About section with bio and skills |
| `ContactForm` | `src/components/ContactForm.tsx` | Contact form (name, email, message) |
| `Footer` | `src/components/Footer.tsx` | Site footer with links and copyright |

### Data Flow
- All data is **static** — embedded in `src/data/projects.ts` (Project[] + BlogPost[])
- No API routes or server-side data fetching
- No state management libraries (React hooks only)

---

## 6. Styling System

### Design Tokens (CSS Custom Properties)

Defined in `src/app/globals.css` via `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `--color-canvas` | `#010102` | Page background |
| `--color-surface` | `#0f1011` | Card/section backgrounds |
| `--color-surface-2` | `#141516` | Elevated surfaces |
| `--color-surface-3` | `#18191a` | Higher surfaces |
| `--color-surface-4` | `#191a1b` | Highest surfaces |
| `--color-border` | `#23252a` | Borders, dividers |
| `--color-border-strong` | `#34343a` | Strong borders |
| `--color-accent` | `#5e6ad2` | Primary accent (purple) |
| `--color-accent-hover` | `#828fff` | Accent hover |
| `--color-accent-glow` | `rgba(94, 106, 210, 0.12)` | Accent glow |
| `--color-power` | `#76b900` | Power accent (green) |
| `--color-power-hover` | `#8cd41a` | Power hover |
| `--color-power-glow` | `rgba(118, 185, 0, 0.15)` | Power glow |
| `--color-text-primary` | `#f7f8f8` | Headings |
| `--color-text-secondary` | `#a0a4ab` | Body text |
| `--color-text-muted` | `#62666d` | Muted text |
| `--color-text-subtle` | `#8a8f98` | Subtle text |
| `--color-inverse-canvas` | `#ffffff` | Inverted canvas |
| `--color-success` | `#27a644` | Success state |
| `--font-sans` | `"Inter", system-ui, sans-serif` | Sans-serif font |
| `--font-mono` | `"JetBrains Mono", monospace` | Monospace font |

### Tailwind Customization
- Custom colors mapped to CSS variables via `@theme inline` in `globals.css`
- Custom utility classes: `.micro`, `.micro-accent`, `.micro-power`, `.btn-power`, `.btn-accent`, `.btn-outline`, `.glass`, `.glass-strong`, `.glass-power`, `.glass-accent`, `.card`, `.card-power`, `.tag`, `.tag-power`, `.gradient-accent`, `.gradient-power`, `.gradient-fire`

### Canvas Background Pattern
- `FlowFieldBg` creates a `<canvas>` via `document.createElement("canvas")` and `document.body.prepend(canvas)`
- Perlin noise flow field with FBM (fractal Brownian motion), 3 octaves
- 900 particles with velocity-based trail rendering
- Composite mode: `"lighter"` for glow effect
- Trail fade: `rgba(5,6,8,0.06)` via `ctx.fillRect` (NOT `clearRect`)
- Z-index: 0 (fixed, pointer-events: none)
- Color palette: HSL rainbow with hue range 180-420 (cyan to purple)
- Canvas opacity: 0.36

---

## 7. AI Agent Guidelines

### DO

- **Read before writing**: Always read the existing file before making changes
- **Preserve structure**: Do not rename components, change import paths, or restructure the component tree
- **Follow existing patterns**: Match the coding style of the file you are editing
- **Use Tailwind**: All styling must go through Tailwind utility classes or CSS variables defined in `globals.css`
- **Framer Motion**: Use `motion.div` with `initial`/`whileInView`/`viewport={{ once: true }}` for scroll animations
- **Lucide React**: Use existing icon imports; do not introduce new icon libraries without approval
- **Client/Server**: Respect `"use client"` directives — only pages that need interactivity are client components
- **No em dashes**: Never use em dashes (—) in any output, comments, or UI text
- **Canvas backgrounds**: Follow the PerlinNoiseBg pattern exactly (`document.body.prepend`, fixed canvas, `rgba(5,6,8,0.06)` trail fade, `ctx.fillRect` NOT `clearRect`, `"lighter"` composite, HSL rainbow hues)
- **Data**: Use `src/data/projects.ts` for static project data; follow the `Project` and `BlogPost` interfaces

### DO NOT

- **Do not modify** `.github/workflows/` files without explicit direction
- **Do not change** the Dockerfile or deployment configuration without explicit direction
- **Do not introduce** new dependencies without approval
- **Do not refactor** existing components unless explicitly asked
- **Do not change** the component hierarchy or page structure
- **Do not use** CSS modules, styled-components, or emotion — Tailwind only
- **Do not use** `clearRect` for canvas trail fade — use `ctx.fillRect` with rgba overlay
- **Do not use** OTF fonts — ReportLab TTFont rejects them; use TTF (NotoSans)
- **Do not add** API routes, server actions, or database connections — this is a static portfolio
- **Do not modify** `next.config.ts` output mode (must remain `"standalone"`)

### File-Specific Rules

| File/Directory | Rules |
|---|---|
| `src/app/page.tsx` | Client component. Do not change import order or section sequence. |
| `src/app/layout.tsx` | Root layout with metadata, JSON-LD, Google Fonts. Do not change metadata structure. |
| `src/app/globals.css` | Design system tokens in `@theme inline`. Do not rename tokens. |
| `src/components/` | PascalCase files. Each component is self-contained. |
| `src/components/backgrounds/` | Canvas-based animated backgrounds. Follow PerlinNoiseBg pattern exactly. |
| `src/data/projects.ts` | Static data arrays. Follow `Project` and `BlogPost` TypeScript interfaces. |
| `next.config.ts` | Must keep `output: "standalone"`. Do not modify without approval. |
| `tsconfig.json` | Path aliases (`@/*`) must be preserved. |
| `package.json` | Do not add/remove dependencies without approval. |

---

## 8. Deployment

### Docker

```dockerfile
# Production build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production server stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

### Recommended Hosting
- **Vercel** (primary) — Native Next.js hosting, zero config
- **Docker** — Self-hosted on Proxmox VMs or any container runtime

---

## 9. Known Constraints (From User Memory)

1. **No em dashes** anywhere in code, comments, or UI text
2. **Canvas backgrounds**: Use `document.body.prepend()`, fixed position, z-index 0, Perlin flow field with `rgba(5,6,8,0.06)` trail fade via `ctx.fillRect` — NOT `clearRect`
3. **Fonts**: Use TTF fonts (NotoSans in `/usr/share/fonts/truetype/noto/`). ReportLab TTFont rejects OTF files.
4. **CV theme** (if applicable): `#16120e` bg, `#d4a35a` accent, `#e8ddd0` text, `#f0e6d8` cream, `#3d3228` borders
5. **Title**: "Senior AI Engineer" — never "Principal Architect"
6. **GitHub Runner**: `root@10.71.71.90`, alias `GitHub-Runner-5`
7. **Only change exact flags** specified by user in systemd service files — never touch adjacent lines or reformat

---

## 10. Quick Reference

| Action | Command / File |
|---|---|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Main page | `src/app/page.tsx` |
| Root layout | `src/app/layout.tsx` |
| Global styles | `src/app/globals.css` |
| Nav component | `src/components/Navigation.tsx` |
| Hero component | `src/components/Hero.tsx` |
| Projects | `src/components/FeaturedProjects.tsx` |
| Project card | `src/components/ProjectCard.tsx` |
| About | `src/components/About.tsx` |
| Contact form | `src/components/ContactForm.tsx` |
| Footer | `src/components/Footer.tsx` |
| Background canvas | `src/components/backgrounds/PerlinNoiseBg.tsx` |
| Project data | `src/data/projects.ts` |
| Config | `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` |
| Docker | `Dockerfile` |
| CI/CD | `.github/workflows/` |

---

*Generated from repo analysis. Last updated: 2026-07-17.*
