# cnc-home - C&C Tech Coffee Company Website

## Project Level: Dynamic (Fullstack with BaaS)

## Overview
Corporate website for (주)씨앤씨테크 (C&C Tech Co., Ltd) - a Korean specialty coffee roasting company.
Domain: cnctechlab.co.kr
Migrating from static HTML/CSS to Next.js + bkend.ai BaaS.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **State**: Zustand (client state), TanStack Query (server state)
- **Backend**: bkend.ai BaaS (auth, database, file storage)
- **Deployment**: Vercel (frontend), bkend.ai (backend)

## Project Structure
```
src/
├── app/           # Next.js App Router pages
├── components/    # UI components
│   ├── ui/        # Base components (Button, Input...)
│   └── features/  # Feature-specific components
├── hooks/         # Custom React hooks
├── lib/           # Utilities (bkend client, utils)
├── stores/        # Zustand stores
└── types/         # TypeScript type definitions
docs/              # PDCA documents
├── 01-plan/
├── 02-design/
├── 03-analysis/
└── 04-report/
```

## Key Pages
- Home: Hero slider, company intro, roast master profile
- Products: Coffee blends, single origins, cookies, equipment
- Training: SCA certification, barista courses, consulting
- Catering: Event coffee catering services
- B2B: Wholesale & business partnerships
- Contact: Inquiry form, subscription

## Development Rules
- Language: Korean (ko) for UI content
- Use App Router with Server Components by default
- Client Components only when needed (interactivity, hooks)
- Follow bkend.ai REST API patterns for data operations
- PDCA document-driven development workflow

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint check
