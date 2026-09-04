import { Link, useLocation } from 'react-router-dom'
import { formatPrice } from '../utils/format'

export default function Confirmation() {
  const { state } = useLocation()
  const booking = state?.booking

  if (!booking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-6xl">🧭</p>
        <h1 className="mt-4 text-3xl font-bold text-white">No booking found</h1>
        <p className="mt-2 text-slate-400">
          There&apos;s no recent booking to show here.
        </p>
        <Link
          to="/market"
          className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Browse rentals
        </Link>
      </div>
    )
  }

  const pickup = new Date(booking.date + 'T00:00:00').toLocaleDateString(
    'en-US',
    { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl bg-slate-800 p-8 text-center ring-1 ring-slate-700">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-bold text-white">
          Booking confirmed!
        </h1>
        <p className="mt-2 text-slate-400">
          Reference{' '}
          <span className="font-mono font-semibold text-cyan-400">
            {booking.reference}
          </span>
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Keep this reference handy for pickup on the day.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-left ring-1 ring-slate-700">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Pickup date</span>
            <span className="font-semibold text-white">{pickup}</span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-slate-400">Total paid</span>
            <span className="font-bold text-cyan-400">
              {formatPrice(booking.total)}
            </span>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-slate-400">Booked by</span>
            <span className="font-semibold text-white">{booking.user.name}</span>
          </div>

          <div className="mt-5 border-t border-slate-700 pt-4">
            <h3 className="text-sm font-semibold text-white">
              Items ({booking.items.length})
            </h3>
            <ul className="mt-2 space-y-2">
              {booking.items.map((i) => (
                <li
                  key={i.itemId}
                  className="flex justify-between text-sm text-slate-300"
                >
                  <span>
                    {i.name} × {i.qty}
                    {i.soldBy === 'unit' ? ' (buy)' : ` (${i.hours}h)`}
                  </span>
                  <span className="font-semibold">
                    {formatPrice(i.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/market"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
          >
            Book more gear
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-700"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}
