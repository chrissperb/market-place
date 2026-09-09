import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { CATEGORY_LABELS } from '../data/inventory'
import { formatPrice, isForSale, unitPrice } from '../utils/format'

const isCustom = (id) => id.startsWith('ext-')

export default function ManageProducts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

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

  const handleDelete = async (item) => {
    const ok = window.confirm(
      `Delete "${item.name}"? This can't be undone.`
    )
    if (!ok) return
    setDeletingId(item.id)
    setError('')
    try {
      await api.deleteProduct(item.id)
      setItems((prev) => prev.filter((i) => i.id !== item.id))
    } catch {
      setError('Could not delete product. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage products</h1>
          <p className="mt-1 text-sm text-slate-400">
            {items.length} product{items.length === 1 ? '' : 's'} in the
            catalogue — seed items are read-only.
          </p>
        </div>
        <Link
          to="/add-product"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-400"
        >
          + Add product
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300 ring-1 ring-red-500/40">
          {error}
        </p>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-slate-800 ring-1 ring-slate-700"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const custom = isCustom(item.id)
              return (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-semibold text-white">
                        {item.name}
                      </span>
                      <span className="rounded-full bg-slate-700/60 px-2 py-0.5 text-xs text-slate-300 ring-1 ring-slate-600">
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                      <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-400 ring-1 ring-cyan-500/40">
                        {isForSale(item) ? 'For sale' : 'Rental'}
                      </span>
                      {!custom && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400 ring-1 ring-amber-500/40">
                          Seed
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">
                      {formatPrice(unitPrice(item))}
                      {isForSale(item) ? '' : '/hour'} · {item.stock} in stock ·{' '}
                      {item.location}
                    </p>
                  </div>
                  {custom ? (
                    <div className="flex shrink-0 gap-2">
                      <Link
                        to={`/add-product?edit=${item.id}`}
                        className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item.id}
                        className="rounded-lg border border-red-500/50 px-3 py-1.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
                      >
                        {deletingId === item.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  ) : (
                    <span className="shrink-0 text-xs text-slate-500">
                      Read-only
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}