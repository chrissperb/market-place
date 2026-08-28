import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, CATEGORY_LABELS } from '../data/inventory'

export default function FilterBar({ total }) {
  const [params, setParams] = useSearchParams()

  const category = params.get('category') || 'all'
  const q = params.get('q') || ''
  const sort = params.get('sort') || 'featured'

  const [qValue, setQValue] = useState(q)
  const timer = useRef(null)

  useEffect(() => {
    setQValue(q)
  }, [q])

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      if (v === '' || v === 'all' || v === 'featured') next.delete(k)
      else next.set(k, v)
    })
    setParams(next)
  }

  const onSearch = (value) => {
    setQValue(value)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => update({ q: value }), 300)
  }

  return (
    <div className="rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700">
      <div className="grid gap-3 md:grid-cols-[1fr_minmax(0,11rem)_auto]">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            value={qValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search boats, jet skis, boards…"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
            aria-label="Search rentals"
          />
        </div>

        <div>
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => update({ category: e.target.value })}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-400">
          {total} {total === 1 ? 'rental' : 'rentals'}
        </span>
        {(category !== 'all' || q) && (
          <button
            onClick={() => update({ category: 'all', q: '', sort: 'featured' })}
            className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-slate-600"
          >
            Clear filters ✕
          </button>
        )}
      </div>
    </div>
  )
}
