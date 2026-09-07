# O2MackDrive Car Trading

Quality Cars. Smooth Deals. Easy Trade-Ins.

A marketing website for O2MackDrive — a Philippine-based car trading business that helps customers buy, sell, and trade quality vehicles.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript 5
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist Sans, Geist Mono, Montserrat

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── cars/         # Inventory listing + detail pages
│   ├── contact/      # Contact form
│   ├── financing/    # Financing info
│   └── sell-trade/   # Sell/trade form
├── features/         # Feature modules — everything for one domain lives together
│   ├── inventory/    # Car inventory (components, data, types, utils)
│   │   ├── components/   # CarCard, CarDetails, CarFilters, CarGallery, CarGrid, CarSpecs
│   │   ├── data/         # cars.ts
│   │   ├── lib/          # filters.ts
│   │   └── types/        # car.ts
│   ├── home/         # Homepage sections (Hero, FeaturedCars, Services, FAQ, etc.)
│   │   └── components/
│   ├── financing/    # Financing data
│   │   └── data/
│   ├── sell-trade/   # Sell/trade form + image upload
│   │   └── components/
│   └── contact/      # Contact form
│       └── components/
├── shared/           # Code reused across features
│   ├── components/
│   │   ├── ui/           # Primitive components (Button, Badge, Container, Reveal, etc.)
│   │   ├── layout/       # Navbar, Footer, MobileMenu
│   │   └── forms/        # InquiryForm
│   ├── data/         # Site-wide static data (site, FAQs, services, testimonials)
│   ├── lib/          # Utilities (formatting, constants)
│   └── types/        # Site-wide types (site, inquiry)
public/
├── cars/             # Car inventory images
├── logo.png          # Brand logo
├── favicon-64.png    # Site icon
├── hero-bg.png       # Hero background
└── screen-4.png      # Screenshot
docs/
└── project-overview.md  # Full project documentation
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured cars, services, how it works, testimonials, FAQs |
| Cars | `/cars` | Full inventory with filters |
| Car Detail | `/cars/[slug]` | Individual car specs, gallery, inquiry form |
| Financing | `/financing` | Loan/lease options and requirements |
| Sell/Trade | `/sell-trade` | Submit a vehicle for sale or trade |
| Contact | `/contact` | Contact form, phone, email, Messenger |

## Brand

- **Colors:** Black backgrounds, Orange (`#fb923c`) accent, White text
- **Style:** Dark theme with glassmorphism, mobile-first responsive
- **Voice:** Direct, confident, garage-culture

## License

Private — O2MackDrive
