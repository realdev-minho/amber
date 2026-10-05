# AMBER — Design System & Architecture

## Visual Language
- **Obsidian Dark Surfaces**: `#0D0B0A` (Primary background), `#12100F` (Surface), `#1A1614` (Elevated cards), `#211B18` (Card hover)
- **Signature Warm Accent**: `#FF8A00` (Amber), `#F97316` (Secondary accent), `rgba(255, 138, 0, 0.25)` (Glow)
- **Warm Near-White Typography**: `#FBF8F5` (Headings), `#9E948C` (Body/secondary), `#6B635B` (Muted)
- **Glassmorphism Tokens**:
  - Panel: `background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.09);`
  - Elevated: `background: rgba(26, 22, 20, 0.72); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1);`

## Technology Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React, Framer Motion, Zustand, TanStack Query, React Hook Form, Zod.
- **Backend**: FastAPI, Python 3.14, SQLAlchemy 2.x (asyncpg & aiosqlite), Pydantic v2, Argon2id, PyJWT, Mailgun.

## Route Map
- `/` — Homepage with 4-photo transitioning hero, category rail, featured and new arrivals grids.
- `/shop` — Comprehensive catalog with filters (category, price slider, rating, in-stock) and sorting.
- `/shop/[category]` — Category-specific filtered catalog.
- `/search` — Debounced real-time keyword search with query persistence.
- `/offers` — Promotional discount catalog with limited drop pricing.
- `/product/[slug]` — High-resolution gallery, variant selectors, reviews distribution, and sharing modal.
- `/cart` — Shopping bag with quantity increment/decrement, coupon codes, and saved-for-later.
- `/wishlist` — Persistent saved items with instant move-to-bag.
- `/checkout` — 5-step guided flow (Auth, Shipping Address, Delivery Method, Payment, Review).
- `/order/success/[id]` — Confetti celebration, order reference, and shipment tracking link.
- `/orders` & `/orders/[id]` — Order history and real-time courier timeline.
- `/account/*` — User dashboard, profile editor, address book, security settings, and notifications.
- `/auth/*` — Email OTP verification, Google OAuth simulation, and real-time password requirement checkers.
