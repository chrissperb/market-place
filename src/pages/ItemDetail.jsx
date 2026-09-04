import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { CATEGORY_LABELS } from '../data/inventory'
import { formatPrice, isForSale, lineTotal } from '../utils/format'

export default function ItemDetail() {
  const { id } = useParams()
  const { addItem } = useCart()

  const [item, setItem] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ok | notfound
  const [hours, setHours] = useState(2)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let active = true
    setStatus('loading')
    setAdded(false)
    api
      .getItem(id)
      .then((data) => {
        if (!active) return
        setItem(data)
        setStatus('ok')
      })
      .catch(() => {
        if (active) setStatus('notfound')
      })
    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    setAdded(false)
  }, [hours, qty])

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-800" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
            <div className="h-24 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      </div>
    )
  }

  if (status === 'notfound' || !item) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-5xl">🛟</p>
        <h1 className="mt-4 text-3xl font-bold text-white">
          Rental not found
        </h1>
        <p className="mt-2 text-slate-400">
          The item you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <Link
          to="/market"
          className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Back to marketplace
        </Link>
      </div>
    )
  }

  const sale = isForSale(item)
  const total = lineTotal(item, hours, qty)
  const soldOut = item.stock === 0

  const handleAdd = () => {
    addItem(item, hours, qty)
    setAdded(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-400" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-cyan-400">
          Home
        </Link>{' '}
        /{' '}
        <Link to="/market" className="hover:text-cyan-400">
          Marketplace
        </Link>{' '}
        /{' '}
        <span className="text-slate-200">{item.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-slate-700">
          <img
            src={item.image}
            alt={item.name}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div>
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/40">
            {CATEGORY_LABELS[item.category] || item.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white">{item.name}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1 text-amber-400">
              ★ {item.rating}
            </span>
            <span>📍 {item.location}</span>
            <span>
              {item.stock > 0 ? (
                <span className="text-emerald-400">{item.stock} in stock</span>
              ) : (
                <span className="text-red-400">Sold out</span>
              )}
            </span>
          </div>

          <p className="mt-5 text-slate-300">{item.description}</p>

          <div className="mt-6 rounded-2xl bg-slate-800 p-5 ring-1 ring-slate-700">
            <div className="flex items-baseline gap-2">
              {sale && item.compareAt && (
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(item.compareAt)}
                </span>
              )}
              <span className="text-3xl font-bold text-cyan-400">
                {formatPrice(sale ? item.price : item.pricePerHour)}
              </span>
              {!sale && <span className="text-slate-400">/hour</span>}
            </div>

            {!sale && (
              <p className="mt-1 text-sm text-slate-400">
                Refundable deposit: {formatPrice(item.deposit)}
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-4">
              {!sale && (
                <div>
                  <label
                    htmlFor="hours"
                    className="mb-1 block text-sm font-medium text-slate-300"
                  >
                    Hours
                  </label>
                  <input
                    id="hours"
                    type="number"
                    min="1"
                    max="24"
                    value={hours}
                    onChange={(e) =>
                      setHours(Math.max(1, Math.min(24, Number(e.target.value) || 1)))
                    }
                    disabled={soldOut}
                    className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                  />
                </div>
              )}
              <div className={sale ? 'col-span-2' : ''}>
                <label
                  htmlFor="qty"
                  className="mb-1 block text-sm font-medium text-slate-300"
                >
                  Quantity
                </label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  max={item.stock || 1}
                  value={qty}
                  onChange={(e) =>
                    setQty(
                      Math.max(1, Math.min(item.stock, Number(e.target.value) || 1))
                    )
                  }
                  disabled={soldOut}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-300">
              {sale
                ? 'Buy it now at the discounted price.'
                : 'Book by the hour, pay only for time on the water.'}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-700 pt-4">
              <span className="text-slate-300">Estimated total</span>
              <span className="text-lg font-bold text-white">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={soldOut}
              className="mt-4 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {soldOut
                ? 'Sold out'
                : added
                  ? `${sale ? 'Added' : 'Added to cart'} ✓`
                  : sale
                    ? 'Buy now'
                    : 'Add to cart'}
            </button>

            {added && (
              <Link
                to="/cart"
                className="mt-2 block w-full rounded-xl border border-cyan-500 py-3 text-center font-semibold text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-slate-900"
              >
                View cart →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
