# O2MackDrive Branding — System Overview

## What Is O2MackDrive?

O2MackDrive Car Trading is a **Philippine-based car trading business** that helps customers buy, sell, and trade quality vehicles. It positions itself as a straightforward, low-pressure "garage desk" — not a traditional dealership — that guides customers through every step of the transaction.

**Tagline:** *"Quality Cars. Smooth Deals. Easy Trade-Ins."*

---

## Purpose / What This Website Is For

This is a **marketing website** for O2MackDrive. It serves as:

- An **inventory showcase** — browse available cars with specs, images, and pricing
- A **lead capture system** — contact, sell/trade, and inquiry forms
- A **brand authority hub** — services, financing info, FAQs, testimonials, and why-choose-us content
- A **credibility tool** — real inventory count, upfront specs, transparent statuses (Available/Reserved/Sold)

There is **no backend or database** — all data (cars, services, FAQs, testimonials) is hardcoded in `src/data/`. It is a pure frontend application.

---

## Brand Identity

### Logo
- **Primary logo:** `public/logo-wide.png` — used in the navbar, footer, and BrandLogo component
- **Icon/favicon:** `public/logo.png` — site icon and Apple touch icon
- The `BrandLogo` component (`src/components/ui/BrandLogo.tsx`) renders the wide logo with three size variants: sm (208px), md (320px), lg (384px)

### Colors
| Color | Hex | Usage |
|---|---|---|
| Garage Black | `#000000` | Pure black backgrounds |
| Garage Ink | `#020617` | Page background (near-black) |
| Garage Orange | `#fb923c` | Primary accent — CTAs, highlights, badges, hover states |
| Garage Muted | `#94a3b8` | Secondary / muted text |
| Foreground | `#f8fafc` | Primary text (white-ish) |

- **Dark mode only** — no light theme
- **Orange** is the hero accent color throughout
- **Glassmorphism** — frosted glass panels using semi-transparent backgrounds + backdrop blur
- Subtle orange + blue radial gradients for a moody automotive-showroom atmosphere

### Fonts
- **Geist Sans** (via `next/font/google`) — primary body and headings
- **Geist Mono** — monospace/code use
- Headings use `font-black` (900 weight) with tight negative letter-spacing

### Brand Voice
- Direct, confident, minimal, warm-but-masculine, garage-culture
- Short punchy headlines: *"Find your next drive."*, *"Built for straight deals."*, *"Pick your lane."*
- Low-pressure tone: "guidance," "practical," "clear details"
- Messenger-first contact approach alongside phone and email

---

## Target Audience

- **Car buyers** in Metro Manila looking for quality used vehicles (SUVs, sedans, pickups)
- **Car sellers** wanting to sell directly with document support
- **Trade-in customers** looking to swap vehicles
- **First-time buyers** seeking affordable options

All pricing is in **Philippine Peso (PHP)**. Coverage: Metro Manila (Makati, Quezon City, Taguig, Pasig, Manila).

---

## Services Offered

1. **Buy a Car** — Browse inventory, inquire, schedule viewing
2. **Sell Your Car** — Submit vehicle details for a discussion
3. **Trade Your Car** — Trade-in toward a different vehicle
4. **Financing Assistance** — Guidance on loan/lease requirements and applications
5. **Document Assistance** — Help with ownership transfer documentation
6. **Vehicle Viewing** — Schedule an in-person inspection

---

## Site Structure

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero, featured cars, services, how it works, testimonials, FAQs, CTA |
| Cars | `/cars` | Full inventory with filters (make, body type, price range) |
| Car Detail | `/cars/[slug]` | Individual car specs, gallery, inquiry form |
| Financing | `/financing` | Loan/lease options and requirements |
| Sell/Trade | `/sell-trade` | Form to submit a vehicle for sale or trade |
| Contact | `/contact` | Contact form, phone, email, Messenger link |

---

## Tech Stack

- **Framework:** Next.js 16.2.9 (App Router)
- **UI Library:** React 19.2.4
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Linting:** ESLint 9 with `eslint-config-next`

---

## Key Design Patterns

- Dark theme with glassmorphism (backdrop blur, semi-transparent borders)
- Responsive mobile-first layout
- Orange accent for all interactive elements
- Section "eyebrow" labels: uppercase, 0.66rem, 900 weight, light orange color
- Reduced motion support via `prefers-reduced-motion`
- Image optimization with `next/image`

---

*This is a frontend-only static marketing site. All data is stored locally in `src/data/` with no external API, database, or backend service.*
