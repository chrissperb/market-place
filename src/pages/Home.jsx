import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import ItemCard from '../components/ItemCard'
import { CATEGORY_LABELS } from '../data/inventory'

const FEATURED_IDS = ['boat-01', 'jetski-01', 'sup-01', 'fishing-01']

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    let active = true
    api.getInventory().then((all) => {
      if (!active) return
      const list = FEATURED_IDS.map((id) => all.find((i) => i.id === id)).filter(
        Boolean
      )
      setFeatured(list)
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
              Rent on the water, by the hour
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your next day on the sea starts here.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Boats, jet skis, kayaks, surfboards and fishing gear — book marine
              sport equipment in minutes, wherever the docks are.
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
