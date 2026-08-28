import { Link } from 'react-router-dom'
import { CATEGORY_LABELS } from '../data/inventory'
import { formatPrice } from '../utils/format'

export default function ItemCard({ item }) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-slate-800 shadow-md ring-1 ring-slate-700 transition-shadow hover:shadow-xl hover:ring-cyan-500/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-700">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {CATEGORY_LABELS[item.category] || item.category}
        </span>
        {item.stock === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-semibold text-white">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white">{item.name}</h3>
          <span className="flex items-center gap-1 text-sm text-amber-400">
            ★ {item.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">📍 {item.location}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <span className="text-lg font-bold text-cyan-400">
              {formatPrice(item.pricePerHour)}
            </span>
            <span className="text-sm text-slate-400"> /hour</span>
          </div>
          <span className="rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-semibold text-cyan-400 ring-1 ring-cyan-500/40 transition-colors group-hover:bg-cyan-500 group-hover:text-slate-900">
            View
          </span>
        </div>
      </div>
    </Link>
  )
}
