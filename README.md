# Fake Store

A responsive Next.js demo application that uses [Fake Store API](https://fakestoreapi.com/docs) to display product categories and manage a shopping cart.

A live version is hosted on **Vercel**: [https://fake-store-ten-delta.vercel.app/](https://fake-store-ten-delta.vercel.app/).

---

## Tech stack & pages

**Main technologies:** Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4.

**Pages:**

- **Main page** — lists all categories with names, links to category pages, and a header basket icon to the Cart.
- **Category page** — category name and product count, product list (title, price, image), add to cart, link back to main page, header basket icon to Cart.
- **Cart page** — all cart products with details, total price, remove product and change quantity; cart persisted in localStorage across sessions.

---

## Getting started

### Prerequisites

- **Node.js** 24.4.1
- **Yarn** 1.22.22

### Install and run

```bash
yarn install --frozen-lockfile
yarn dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
yarn build
yarn start
```

### Other commands

- `yarn lint` — runs ESLint (static analysis and code style check).
- `yarn test` — runs unit tests (Jest).
- `yarn prettier:check` — checks if files are formatted correctly (Prettier).
- `yarn prettier:write` — formats files (Prettier).

---

## Project structure

Code is split into **shared** layers (reused across the app) and **page/module-specific** code kept next to the feature.

| Folder            | Purpose                                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`app/`**        | Next.js App Router: routes, layouts, `layout.tsx`, `error.tsx`, `not-found.tsx`, global styles and providers.                                                                                          |
| **`components/`** | **Shared UI components** used in multiple places (e.g. `Button`, `Header`, `Footer`, `CartButton`, `ViewContainerNarrow`, `ViewHeader`, `Toaster`).                                                    |
| **`views/`**      | **Page-level UI**: one folder per “screen” (e.g. `HomeView`, `CategoryView`, `CartView`). Logic and UI for a given page are kept in that view and its `partials/` so each module stays self-contained. |
| **`types/`**      | **Shared TypeScript types** (e.g. `Product`, `Cart`, `CartProduct`, API-related types).                                                                                                                |
| **`constants/`**  | Shared constants (routes, API base URLs, section IDs, localStorage keys).                                                                                                                              |
| **`services/`**   | Data access: API calls (products, categories, Fake Store cart API).                                                                                                                                    |
| **`contexts/`**   | React context providers (e.g. cart state and persistence).                                                                                                                                             |
| **`mappers/`**    | Transformations from API responses to app models (validation and shaping).                                                                                                                             |
| **`utils/`**      | Shared helpers (formatting, localStorage, logger, Tailwind `cn`).                                                                                                                                      |
| **`configs/`**    | App and service config (e.g. fetch headers, cache revalidate values).                                                                                                                                  |

Rule of thumb: **shared** things (components, types, constants, utils) live in their global folders; **code that belongs to a specific page/screen** lives under the corresponding view in `views/`.

---

## Data fetching and caching

The app uses **native `fetch`** for all API calls. Next.js extends `fetch` with caching and revalidation, so no extra HTTP client is needed.

- **Caching** is controlled via the `next` option, e.g. `next: { revalidate: CACHE_REVALIDATE_XXX }` (revalidate every XXX).
- Revalidate values are centralized in **`configs/cache.config.ts`** (e.g. 1 min, 5 min) and used in `services/product.service.ts` (and elsewhere as needed).
- Server Components call these services directly; the first request fills the cache and subsequent requests are served from cache until revalidation.

This keeps data fresh while avoiding unnecessary requests and stays within the Next.js recommended approach for server-side data fetching.

---

## Other notable choices

- **Cart persistence** — The app uses the Fake Store API cart endpoints where possible. Because that API is not fully reliable, the cart is also stored in **localStorage** and rehydrated on load via `CartContext`, so the app can rely on local data across sessions.
- **Styling** — **Tailwind CSS v4** with design tokens in **`app/globals.css`** (colors, spacing, radius, shadows). Light/dark supported via `prefers-color-scheme`.
- **Toasts** — **Sonner** for success/error feedback (e.g. add to cart, update quantity).
- **Icons** — **react-icons** (e.g. BiCart, BiMoon) for UI icons.
- **Accessibility** — Semantic HTML, ARIA where needed, visible focus styles on buttons and links.
- **Testing** — **Jest** for unit tests. The project adopts the approach of testing and tracking **shared utils** (e.g. `utils`: money, cart, tailwind) so that reusable helpers stay reliable as the app grows.
- **CI** — GitHub Actions (e.g. `.github/workflows/ci.yml`) for lint and tests on push/PR.
- **Deployment** — The app is deployed on **Vercel** (continuous deployment from the repository).
- **Code quality** — TypeScript, ESLint, Prettier, Husky + lint-staged for consistent formatting before commit.

---

## Environment

Optional environment variables can override defaults (e.g. API base URL). Copy `.env.example` to `.env` and adjust if needed. The app runs without a local `.env` when using the default Fake Store API configuration. Set any required vars before running the app.

For correct **JSON-LD** (structured data) URLs in metadata, set `NEXT_PUBLIC_APP_URL` to your app’s public URL (e.g. the Vercel deployment URL).

---
