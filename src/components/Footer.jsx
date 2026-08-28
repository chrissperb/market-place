import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-900">
              ⛵
            </span>
            <span className="text-lg font-bold text-white">SeaRent</span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Rent marine sport equipment on the water, by the hour. Demo
            marketplace — no real bookings.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>
              <Link to="/market" className="hover:text-cyan-400">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-cyan-400">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-cyan-400">
                Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Popular</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Boats</li>
            <li>Jet Ski</li>
            <li>Kayaks & Paddle</li>
            <li>Surfboards</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>hello@searent.demo</li>
            <li>Marina Bay Docks</li>
            <li>Open daily 8am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SeaRent — demonstration project. All rights
        reserved.
      </div>
    </footer>
  )
}
