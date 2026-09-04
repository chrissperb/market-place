# SeaRent — Marine Sports Marketplace

**React** is a JavaScript library for building user interfaces. It lets you
compose complex UIs out of small, reusable components, each managing its own
state, and it keeps the rendered interface in sync with that state through a
virtual DOM. That declarative model is why it is so widely used in front end
development: instead of imperatively updating the DOM whenever data changes,
you describe *what* the UI should look like for a given state, and React
handles the *how* — dependencies update automatically, re-renders are kept
fast and predictable, and components stay easy to reason about, test and
reuse. Combined with its huge ecosystem, server-side rendering, and a robust
tooling story, React lets teams build interactive, high-performance user
interfaces at scale, which is exactly the front end foundation this project
relies on.

This is a Single Page Application (SPA) demo for renting marine sport equipment —
boats, jet skis, waverunners, kayaks, stand-up paddle boards, surfboards and
fishing gear. Items can be **rented by the hour** or **bought** at a discount
(the `soldBy` field on each inventory item is `'hour'` for rentals and `'unit'`
for products for sale).

Built with **React**, **Vite**, **Tailwind CSS v4** and **React Router v7**.
No backend and no database: all data is mocked in-memory and persisted to
`localStorage`, so it runs entirely in the browser.

---

## Features

- **Browse & search** — filter the catalog by category, keyword and price,
  with in-URL query parameters (`/market?category=jetski&q=sea-doo`).
- **Item detail** — view price, rating, location, availability; rent by
  hours × quantity or buy (no hours) at the discounted price.
- **Products for sale** — discounted gear with a `compareAt` original price,
  shown under the dedicated "Offers" category and highlighted in a homepage
  deal banner.
- **Cart** — add rental or sale items, adjust hours/quantity (hours hidden
  for sale items), persisted across refreshes.
- **Checkout** — mock booking/purchase flow with a login gate.
- **Confirmation** — booking reference + order summary after checkout.
- **Authentication** — mock login (no backend). Demo credentials included.
- **Admin product creation** — logged-in admins can add new products via a
  form at `/add-product` (name, category, pricing, image URL, stock, etc.).
  New products are persisted in `localStorage` and appear in the catalog
  immediately.
- **404 page** — friendly not-found screen for unknown routes.
- **Responsive** — mobile-first layout with a hamburger menu.
- **Accessible** — skip-to-content link, ARIA labels, visible focus.

## Routes

| Path                | Page          | Description                                  |
| ------------------- | ------------- | -------------------------------------------- |
| `/`                 | Home          | Hero, browse by category, featured rentals   |
| `/market`           | Marketplace   | Catalog with search / filter / sort          |
| `/item/:id`         | Item Detail   | Details + hours/quantity + add to cart       |
| `/cart`             | Cart          | Cart items, totals, checkout                  |
| `/checkout`         | Checkout      | Booking form (requires login)                |
| `/confirmation`     | Confirmation  | Booking reference + summary                  |
| `/login`            | Login         | Mock authentication                          |
| `/add-product`      | Add Product   | Admin-only form to create new catalog items  |
| `*`                 | 404           | Not-found page for unknown routes            |

### Data via routes & parameters

- **Route params** — `/item/:id` reads the rental id with `useParams()`.
- **Query params** — `/market` reads `category`, `q`, `sort` with
  `useSearchParams()`; `/login` reads `next` as the post-login redirect target.

## Tech stack

- **Vite 8** — build tool & dev server
- **React 19** — UI
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — styling (`@tailwindcss/vite` plugin)
- **React Context** — state (`AuthContext`, `CartContext`, `BookingsContext`)

## Project structure

```
market-place/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # entry point + providers + router
    ├── App.jsx               # layout, routes, 404 catch-all
    ├── index.css             # Tailwind import + base styles
    ├── data/
    │   ├── inventory.js      # seeded catalog (rental + offers)
    │   └── users.js          # mock users with roles
    ├── services/
    │   └── api.js            # fake async API layer + localStorage extras
    ├── context/
    │   ├── AuthContext.jsx   # mock login/logout
    │   ├── CartContext.jsx   # cart state + persistence
    │   └── BookingsContext.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── ItemCard.jsx
    │   └── FilterBar.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Marketplace.jsx
    │   ├── ItemDetail.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Confirmation.jsx
    │   ├── Login.jsx
    │   ├── AddProduct.jsx
    │   └── NotFound.jsx
    └── utils/
        └── format.js         # currency formatting, pricing helpers
```

## Getting started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 9

### Install & run

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Demo credentials

Log in with either mock account (password for both is `demo1234`):

| Name         | Email              | Password | Role  |
| ------------ | ------------------ | -------- | ----- |
| Chris Miller | chris@example.com  | demo1234 | admin |
| Ana Souza    | ana@example.com    | demo1234 | user  |

Chris has admin access — after logging in, an "+ Add product" button appears
in the nav bar. Ana is a regular user and will be redirected to login if
she visits `/add-product`.

There is also a "Fill demo credentials" button on the login page.

## How the demo works

Everything is client-side:

- `src/data/inventory.js` holds the seeded catalog (rentals + offer items).
- `src/services/api.js` simulates a backend with artificial latencies,
  exposing an async interface (`getInventory`, `getItem`, `login`,
  `createBooking`, `addProduct`). `getInventory` merges seeded data with
  any products added via the admin form (stored in
  `localStorage('marine.extra_products')`).
- `AuthContext` persists the logged-in user in `localStorage` (including
  the `role` field for admin access control).
- `CartContext` persists the cart in `localStorage`, handling both rental
  (`pricePerHour × hours × qty`) and sale (`price × qty`) items.
- `BookingsContext` holds mock bookings in memory for the current session.
- `format.js` exposes `isForSale`, `unitPrice` and `lineTotal` helpers
  that branch on the `soldBy` field to keep pricing logic consistent
  across cart, checkout and detail pages.

No real payment is processed; checkout is a simulated flow.

## Roadmap ideas

- Real backend / database integration (swap out `services/api.js`).
- Real payment via an Open Finance provider.
- User "My bookings" page reading from `BookingsContext`.
- Availability calendar and per-date booking conflict checks.

---

> Demonstration project for academic/portfolio purposes. Bookings are not real.
