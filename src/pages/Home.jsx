import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ItemCard from '../components/ItemCard'
import { CATEGORY_LABELS } from '../data/inventory'
import { formatPrice } from '../utils/format'

const FEATURED_IDS = ['boat-01', 'jetski-01', 'sup-01', 'fishing-01']
const DEAL_ID = 'ppe-01'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [deal, setDeal] = useState(null)

  useEffect(() => {
    let active = true
    api.getInventory().then((all) => {
      if (!active) return
      const list = FEATURED_IDS.map((id) => all.find((i) => i.id === id)).filter(
        Boolean
      )
      setFeatured(list)
      setDeal(all.find((i) => i.id === DEAL_ID) || null)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-900/60 via-slate-900 to-slate-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/40">
              Rent on the water, buy the gear
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your next day on the sea starts here.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Boats, jet skis, kayaks, surfboards and fishing gear — rent
              equipment by the hour or buy marine gear at a discount.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/market"
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-cyan-400"
              >
                Browse rentals
              </Link>
              <Link
                to="/market?category=kayak"
                className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition-colors hover:bg-slate-800"
              >
                See kayaks
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {deal ? (
          <Link
            to={`/item/${deal.id}`}
            className="flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-rose-500/40 transition-shadow hover:shadow-xl hover:ring-rose-500/70 md:flex-row"
          >
            <div className="relative md:w-1/2">
              <img
                src={deal.image}
                alt={deal.name}
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
              />
              <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Deal of the week
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-10">
              <span className="text-sm font-medium text-rose-400">
                Marine gear for sale
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {deal.name}
              </h2>
              <p className="mt-3 text-slate-400">{deal.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {deal.compareAt && (
                  <span className="text-lg text-slate-500 line-through">
                    {formatPrice(deal.compareAt)}
                  </span>
                )}
                <span className="text-3xl font-bold text-cyan-400">
                  {formatPrice(deal.price)}
                </span>
                <span className="rounded-lg bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-400 ring-1 ring-rose-500/40">
                  {deal.compareAt
                    ? `Save ${Math.round((1 - deal.price / deal.compareAt) * 100)}%`
                    : 'On sale'}
                </span>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-1 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-cyan-400">
                Shop the deal →
              </span>
            </div>
          </Link>
        ) : (
          <div className="h-64 animate-pulse rounded-3xl bg-slate-800 ring-1 ring-slate-700" />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold text-white">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link
              key={key}
              to={`/market?category=${key}`}
              className="flex flex-col items-center gap-2 rounded-xl bg-slate-800 p-4 text-center ring-1 ring-slate-700 transition-colors hover:bg-slate-700 hover:ring-cyan-500/50"
            >
              <span className="text-2xl">
                {key === 'boat' && '🚤'}
                {key === 'jetski' && '🏍️'}
                {key === 'kayak' && '🛶'}
                {key === 'sup' && '🏄‍♂️'}
                {key === 'surfboard' && '🏄'}
                {key === 'waverunner' && '🛥️'}
                {key === 'fishing' && '🎣'}
                {key === 'offers' && '🏷️'}
              </span>
              <span className="text-sm font-medium text-slate-200">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Featured for this week</h2>
          <Link to="/market" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
