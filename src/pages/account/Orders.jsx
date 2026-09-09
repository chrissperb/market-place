import { Link } from 'react-router-dom'
import { useBookings } from '../../context/BookingsContext'
import { formatPrice } from '../../utils/format'

const pickupLabel = (date) =>
  new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export default function Orders() {
  const { bookings } = useBookings()

  const purchases = bookings
    .map((b) => ({
      ...b,
      items: b.items.filter((i) => i.soldBy === 'unit'),
    }))
    .filter((b) => b.items.length > 0)

  if (purchases.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-800 p-10 text-center ring-1 ring-slate-700">
        <p className="text-6xl">📦</p>
        <h2 className="mt-4 text-2xl font-bold text-white">No orders yet</h2>
        <p className="mt-2 text-slate-400">
          Gear you buy outright will show up here.
        </p>
        <Link
          to="/market"
          className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Shop now
        </Link>
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {purchases.map((b) => (
        <li key={b.reference} className="rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-cyan-400">
                {b.reference}
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400 ring-1 ring-emerald-500/50">
                {b.status}
              </span>
            </div>
            <span className="text-sm text-slate-400">{pickupLabel(b.date)}</span>
          </div>

          <ul className="mt-4 space-y-2">
            {b.items.map((i) => (
              <li
                key={i.itemId}
                className="flex justify-between gap-2 text-sm text-slate-300"
              >
                <span>
                  {i.name} × {i.qty}
                </span>
                <span className="font-semibold text-white">
                  {formatPrice(i.lineTotal)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t border-slate-700 pt-3 text-sm text-slate-300">
            <span>Total</span>
            <span className="font-bold text-cyan-400">
              {formatPrice(b.total)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}