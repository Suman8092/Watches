# NOIRÉ — Haute Horlogerie Storefront

NOIRÉ is an ultra-premium, headless luxury watch e-commerce platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Framer Motion, fully integrated with a headless WordPress / WooCommerce commerce engine.

---

## Architecture Overview

```
                      ┌─────────────────────────────┐
                      │      CUSTOMER BROWSER       │
                      │   https://sntoriginals.com  │
                      └──────────────┬──────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │     NEXT.JS 16 FRONTEND     │
                      │  (SSR, ISR, React 19, TS)   │
                      └──────┬───────────────┬──────┘
                             │               │
                 Public Store API            │ Private Server-Side API
                 (Cart, Products,            │ (Orders, Account Dossier)
                 Categories, Checkout)       │ [Zero Credentials in Client]
                             │               │
                             ▼               ▼
                      ┌─────────────────────────────┐
                      │    HEADLESS WOOCOMMERCE     │
                      │ https://backend.sntoriginals.com
                      │  (WP Admin, Inventory,      │
                      │   Orders, Razorpay / BACS)  │
                      └─────────────────────────────┘
```

---

## Key Features

- **Editorial Luxury Visuals:** Dark obsidian and warm ivory palette, bespoke typography (Cormorant Garamond + Plus Jakarta Sans), asymmetric horological grid layouts.
- **Headless WooCommerce Integration:**
  - Dynamic product catalog with horological attributes (Calibre, Power Reserve, Metallurgy, Case Diameter, Water Resistance).
  - Multi-tier dynamic collection filtering and sorting.
  - Cart session management using Store API `Cart-Token` & `Nonce` persistence.
  - Checkout supporting domestic and international jurisdictions, Armored Courier delivery, and multi-gateway settlement (Razorpay / Atelier Bank Wire).
- **Collector Archive & Dossier:**
  - Client portal at `/account`
  - Order History at `/account/orders`
  - Authenticated Order Dossier at `/account/orders/[id]` via secure server-side proxy
  - Profile & Vault management at `/account/profile`
- **Zero-Credential Client Security:** Private REST credentials (`WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`) remain strictly server-side. Zero leaked secrets in client bundles.
- **Dynamic Image Fallbacks:** Prioritizes images uploaded in WooCommerce Media Library with high-fidelity editorial fallbacks.

---

## Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm / pnpm / yarn

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate `.env.local`:
```env
NEXT_PUBLIC_WC_STORE_URL=https://backend.sntoriginals.com
WC_CONSUMER_KEY=your_woocommerce_consumer_key
WC_CONSUMER_SECRET=your_woocommerce_consumer_secret
NEXT_PUBLIC_SITE_NAME="NOIRÉ"
NEXT_PUBLIC_SITE_URL=https://sntoriginals.com
NEXT_PUBLIC_WC_USE_REST_ROUTE=true
```

> **Note:** `.env.local` is gitignored and will never be committed to source control.

### 3. Installation & Run
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## Route Structure

| Route | Purpose |
|---|---|
| `/` | Approved NOIRÉ luxury atelier homepage |
| `/shop` | Complete horological catalog with filters & sorting |
| `/collections` | Curated mechanical pillars stack |
| `/collections/[slug]` | Individual collection archive |
| `/product/[slug]` | Reference detail, specifications & verified provenance |
| `/cart` | Interactive acquisition bag |
| `/checkout` | Encrypted transaction settlement |
| `/account` | Collector Archive portal |
| `/account/orders` | Acquired references & order tracking |
| `/account/orders/[id]` | Authenticated order dossier |
| `/account/profile` | Client credentials & default delivery vault |
| `/api/orders/[id]` | Secure server-side order lookup proxy |

---

## License

Private & Proprietary — SNT Originals / NOIRÉ.
