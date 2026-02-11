# Future improvements

Improvements and features that could be added to the application in the future.

---

## Product & category

- **Product detail page** — dedicated route per product (e.g. `/product/[id]`) with full description, gallery, and add-to-cart.
- **Search** — global search (by title/category) with suggestions and dedicated search results page.
- **Filters and sorting** — on category page: filter by price range, sort by price (asc/desc), name, newest.
- **Pagination or infinite scroll** — for category product lists when the list grows.

---

## Checkout & order

- **Full checkout flow** — multi-step checkout (shipping, payment, review), with form validation and clear error handling.
- **Payment integration** — e.g. Stripe
- **Shipping methods integration** - e.g. Inpost Parcel Lockers
- **Order confirmation** — thank-you page, order summary, optional email confirmation (if backend supports it).
- **Order history** — for logged-in users: list of past orders and order status.

---

## User accounts & auth

- **Authentication** — login / register (e.g. NextAuth or custom with backend); protect cart and orders by user when needed.
- **User profile** — edit delivery address, preferred payment method; link cart and orders to account.

---

## UX & UI

- **Loading states** — skeletons or placeholders instead of (or in addition to) spinners for product lists and cart.
- **Optimistic updates** — update cart UI immediately on add/remove/quantity change, then sync with API/localStorage; rollback on failure.

---

## Performance & resilience

- **Error boundaries** — more granular boundaries (e.g. around product grid or cart section) so one failure doesn’t break the whole page.
- **Offline / PWA** — service worker, cache product list and cart for basic offline readability (demo scope).

---

## Quality

- **E2E tests** — Playwright for critical flows: open category, add to cart, change quantity, go to cart.
- **Integration tests** — test key flows that touch API or localStorage (e.g. cart context + service).

---

## DevOps & observability

- **Error monitoring** — e.g. Sentry (or similar) for runtime errors and failed API calls in production.

---

## Internationalization & locale

- **i18n** — next-intl or similar for multiple languages (UI strings, error messages).
- **Currency and locale** — format prices and dates by user locale; optional currency selector if API supports it.

---

## Backend & API alignment

- **Coordinate with backend team** to improve the API for a real store experience:
  - **Dedicated category-products endpoint** — e.g. `GET /categories/:slug/products` (or equivalent) instead of fetching all products and filtering client-side. Reduces payload and improves caching and scalability.
  - **Cart identifier: `cartId` → `cartUuid`** — move from numeric `cartId` to a UUID (or similar) for anonymous carts. Makes it much harder for two users to share or collide on the same cart and improves reliability of the cart system for unauthenticated users.

---
