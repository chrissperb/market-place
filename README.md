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

Built with **React**, **Vite**, **Tailwind CSS v4**, **React Router v7**,
**Redux Toolkit** and **Axios**. No real backend: responses are simulated
in-memory through an axios mock adapter and persisted to `localStorage`, so it
runs entirely in the browser.

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
  for sale items), persisted across refreshes, globally managed with Redux.
- **Checkout** — mock booking/purchase flow with a login gate.
- **Confirmation** — booking reference + order summary after checkout.
- **Authentication** — mock login (no backend). Demo credentials included.
  Logout asks for confirmation.
- **Account area** — nested `/account` routes (profile, rentals, orders)
  protected by a reusable auth guard. Rentals and orders are split by
  `soldBy` (hour-based bookings vs. bought items).
- **Admin product CRUD** — logged-in admins can **create**, **read**,
  **update** and **delete** catalog items:
  - `/add-product` — create a product.
  - `/add-product?edit=<id>` — edit an existing custom product.
  - `/manage` — list all products; edit or delete the ones the admin created.
  - Seed products shipped with the demo are read-only.
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
| `/account`          | Account area  | Sign-in required: profile (`/account`), rentals (`/account/bookings`), orders (`/account/orders`) — nested routes sharing one layout |
| `/add-product`      | Add Product   | Admin-only create form                       |
| `/add-product?edit=<id>` | Add Product | Admin-only edit form for custom products    |
| `/manage`           | Manage products | Admin-only product list with edit/delete    |
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
- **Axios** — REST-style HTTP client (`src/services/http.js`)
- **axios-mock-adapter** — simulates the backend over HTTP semantics
- **Redux Toolkit** — global cart state + selectors + persistence middleware
- **React Context** — auth + bookings session state

## Project structure

```
market-place/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # entry point + providers + mock server + router
    ├── App.jsx               # layout, routes, admin/auth guards, 404 catch-all
    ├── index.css             # Tailwind import + base styles
    ├── data/
    │   ├── inventory.js      # seeded catalog (rental + offers)
    │   └── users.js          # mock users with roles
    ├── services/
    │   ├── http.js           # axios instance (baseURL /api)
    │   ├── api.js            # async API facade (thin axios calls)
    │   └── mock/
    │       ├── mockdb.js     # in-memory DB (inventory, users, extras, bookings)
    │       └── server.js     # axios-mock-adapter REST routes + latency
    ├── store/
    │   ├── index.js          # Redux store + cart persistence middleware
    │   └── cartSlice.js      # cart reducers + selectors
    ├── context/
    │   ├── AuthContext.jsx   # mock login/logout
    │   └── BookingsContext.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── ItemCard.jsx
    │   ├── FilterBar.jsx
    │   └── RequireAuth.jsx   # reusable role-aware route guard
    ├── pages/
    │   ├── Home.jsx
    │   ├── Marketplace.jsx
    │   ├── ItemDetail.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Confirmation.jsx
    │   ├── Login.jsx
    │   ├── AddProduct.jsx    # create + edit (?edit=<id>)
    │   ├── ManageProducts.jsx# admin product list with edit/delete
    │   ├── NotFound.jsx
    │   └── account/
    │       ├── AccountLayout.jsx  # account layout (tabs + Outlet)
    │       ├── Profile.jsx        # index route
    │       ├── Bookings.jsx       # rentals
    │       └── Orders.jsx         # purchases
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

Chris has admin access — after logging in, "+ Add product" and "Manage"
buttons appear in the nav bar. Ana is a regular user and will be redirected to
the login (or to `/account` if already authenticated) if she visits
`/add-product` or `/manage`.

There is also an "Auto-fill credentials" button on the login page.

## How the demo works

Everything is client-side:

- **Axios mock adapter** (`src/services/mock/server.js`) intercepts every
  `axios` request against the `/api` origin, introduces artificial latency,
  and responds with data held in `src/services/mock/mockdb.js`. The mock DB
  seeds its catalog from `src/data/inventory.js` and persists admin-created
  products to `localStorage('marine.extra_products')` so they survive page
  refreshes.
- `src/services/api.js` is a thin async facade over the axios instance,
  keeping a clean interface (`getInventory`, `getItem`, `login`,
  `addProduct`, `updateProduct`, `deleteProduct`, `createBooking`) without
  importing axios directly in components. When a real backend is available,
  delete `mock/server.js` and point the axios instance at the real origin.
- `AuthContext` persists the logged-in user in `localStorage` (including
  the `role` field for admin access control).
- Cart state lives in **Redux** (`store/cartSlice.js`), initialised from
  `localStorage` and kept in sync by a custom middleware written in
  `store/index.js`.
- `BookingsContext` holds mock bookings for the current session.
- `RequireAuth` is a reusable route-level guard: not logged in → redirect to
  `/login?next=<current path>`; wrong role → redirect to `/account`.
- `format.js` exposes `isForSale`, `unitPrice` and `lineTotal` helpers
  that branch on the `soldBy` field to keep pricing logic consistent
  across cart, checkout and detail pages.

No real payment is processed; checkout is a simulated flow.

## Roadmap ideas

- Real backend / database integration (delete `services/mock/server.js`,
  swap the axios `baseURL` to the live API — `api.js` needs no changes).
- Real payment via an Open Finance provider.
- Availability calendar and per-date booking conflict checks.

---

> Demonstration project for academic/portfolio purposes. Bookings are not real.
