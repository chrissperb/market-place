# SeaRent — Marine Sports Marketplace

A Single Page Application (SPA) demo for renting marine sport equipment —
boats, jet skis, waverunners, kayaks, stand-up paddle boards, surfboards and
fishing gear — by the hour.

Built with **React**, **Vite**, **Tailwind CSS v4** and **React Router v7**.
No backend and no database: all data is mocked in-memory and persisted to
`localStorage`, so it runs entirely in the browser.

---

## Features

- **Browse & search** — filter the catalog by category, keyword and price,
  with in-URL query parameters (`/market?category=jetski&q=sea-doo`).
- **Item detail** — view price, rating, location, availability and rent by
  hours × quantity.
- **Cart** — add items, adjust hours/quantity, persisted across refreshes.
- **Checkout** — mock booking flow with a login gate.
- **Confirmation** — booking reference + order summary after checkout.
- **Authentication** — mock login (no backend). Demo credentials included.
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
    │   ├── inventory.js      # seeded rental catalog
    │   └── users.js          # mock users (demo credentials)
    ├── services/
    │   └── api.js            # fake async API layer (swappable)
    ├── context/
    │   ├── AuthContext.jsx   # mock login/logout
    │   ├── CartContext.jsx   # cart state + persistence
    │   └── BookingsContext.jsx
    ├── components/
    │   ├── Navbar.jsx
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
    │   └── NotFound.jsx
    └── utils/
        └── format.js         # currency formatting
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

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npx oxlint src
```

## Demo credentials

Log in with either mock account (password for both is `demo1234`):

| Name         | Email              | Password |
| ------------ | ------------------ | -------- |
| Chris Miller | chris@example.com  | demo1234 |
| Ana Souza    | ana@example.com    | demo1234 |

There is also a "Fill demo credentials" button on the login page.

## How the demo works

Everything is client-side:

- `src/data/inventory.js` holds the rental catalog.
- `src/services/api.js` simulates a backend with artificial latencies,
  exposing an async interface (`getInventory`, `getItem`, `login`,
  `createBooking`) — structured so a real backend can slot in later.
- `AuthContext` persists the logged-in user in `localStorage`.
- `CartContext` persists the cart in `localStorage`.
- `BookingsContext` holds mock bookings in memory for the current session.

No real payment is processed; checkout is a simulated flow.

## Roadmap ideas

- Real backend / database integration (swap out `services/api.js`).
- Real payment via an Open Finance provider.
- User "My bookings" page reading from `BookingsContext`.
- Availability calendar and per-date booking conflict checks.

---

> Demonstration project for academic/portfolio purposes. Bookings are not real.
