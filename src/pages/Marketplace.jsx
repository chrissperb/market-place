import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../services/api'
import ItemCard from '../components/ItemCard'
import FilterBar from '../components/FilterBar'
import { unitPrice } from '../utils/format'

export default function Marketplace() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [params] = useSearchParams()

  useEffect(() => {
    let active = true
    setLoading(true)
    api.getInventory().then((data) => {
      if (!active) return
      setItems(data)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const category = params.get('category') || 'all'
  const q = (params.get('q') || '').toLowerCase()
  const sort = params.get('sort') || 'featured'

  const filtered = useMemo(() => {
    let list = items
    if (category !== 'all') list = list.filter((i) => i.category === category)
    if (q) {
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => unitPrice(a) - unitPrice(b))
        break
      case 'price-desc':
        list = [...list].sort((a, b) => unitPrice(b) - unitPrice(a))
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [items, category, q, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Marketplace</h1>
        <p className="mt-1 text-slate-400">
          Browse the fleet and gear — rent by the hour or buy at a discount.
        </p>
      </div>

      <FilterBar total={filtered.length} />

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl bg-slate-800 ring-1 ring-slate-700"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-slate-800 py-16 text-center ring-1 ring-slate-700">
            <p className="text-4xl">🌊</p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              No rentals match your search
            </h3>
            <p className="mt-1 text-slate-400">
              Try a different category or clear your filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
