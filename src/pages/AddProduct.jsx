import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES, CATEGORY_LABELS } from '../data/inventory'

export default function AddProduct() {
  const { user } = useAuth()

  const [soldBy, setSoldBy] = useState('hour')
  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [pricePerHour, setPricePerHour] = useState('')
  const [deposit, setDeposit] = useState('')
  const [price, setPrice] = useState('')
  const [compareAt, setCompareAt] = useState('')
  const [stock, setStock] = useState('')
  const [rating, setRating] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState(null)

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  if (created) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-bold text-white">Product created!</h1>
        <p className="mt-2 text-slate-400">
          <span className="font-mono font-semibold text-cyan-400">{created.name}</span>{' '}
          has been added to the catalogue.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to={`/item/${created.id}`}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
          >
            View product
          </Link>
          <Link
            to="/add-product"
            onClick={() => setCreated(null)}
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800"
          >
            Add another
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !location.trim() || !description.trim()) {
      setError('Name, location and description are required.')
      return
    }
    if (soldBy === 'hour' && (!pricePerHour || Number(pricePerHour) <= 0)) {
      setError('Price per hour is required.')
      return
    }
    if (soldBy === 'unit' && (!price || Number(price) <= 0)) {
      setError('Sale price is required.')
      return
    }
    if (!stock || Number(stock) < 0) {
      setError('Stock must be zero or more.')
      return
    }
    if (!image.trim()) {
      setError('Image URL is required.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const product = await api.addProduct({
        name: name.trim(),
        category,
        soldBy,
        pricePerHour: soldBy === 'hour' ? Number(pricePerHour) : undefined,
        deposit: soldBy === 'hour' && deposit ? Number(deposit) : undefined,
        price: soldBy === 'unit' ? Number(price) : undefined,
        compareAt: soldBy === 'unit' && compareAt ? Number(compareAt) : undefined,
        stock: Number(stock),
        rating: rating ? Number(rating) : 0,
        location: location.trim(),
        description: description.trim(),
        image: image.trim(),
      })
      setCreated(product)
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Add product</h1>
        <Link
          to="/market"
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
          ← Back to marketplace
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700"
      >
        {/* soldBy toggle */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Product type
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSoldBy('hour')}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                soldBy === 'hour'
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                  : 'border-slate-600 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Rental (per hour)
            </button>
            <button
              type="button"
              onClick={() => setSoldBy('unit')}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                soldBy === 'unit'
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                  : 'border-slate-600 text-slate-400 hover:bg-slate-700'
              }`}
            >
              For sale (one-time)
            </button>
          </div>
        </div>

        {/* name */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sea-Doo GTX 300"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>

        {/* category */}
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-300">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        {/* pricing fields */}
        {soldBy === 'hour' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pricePerHour" className="mb-1 block text-sm font-medium text-slate-300">
                  Price per hour ($)
                </label>
                <input
                  id="pricePerHour"
                  type="number"
                  min="1"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="deposit" className="mb-1 block text-sm font-medium text-slate-300">
                  Deposit ($)
                </label>
                <input
                  id="deposit"
                  type="number"
                  min="0"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-300">
                Sale price ($)
              </label>
              <input
                id="price"
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="compareAt" className="mb-1 block text-sm font-medium text-slate-300">
                Compare at ($)
              </label>
              <input
                id="compareAt"
                type="number"
                min="0"
                value={compareAt}
                onChange={(e) => setCompareAt(e.target.value)}
                placeholder="Original price"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* stock + rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="stock" className="mb-1 block text-sm font-medium text-slate-300">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="mb-1 block text-sm font-medium text-slate-300">
              Rating (0–5)
            </label>
            <input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* location */}
        <div>
          <label htmlFor="location" className="mb-1 block text-sm font-medium text-slate-300">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Marina Bay"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>

        {/* description */}
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-300">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the product…"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>

        {/* image URL */}
        <div>
          <label htmlFor="image" className="mb-1 block text-sm font-medium text-slate-300">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://images.unsplash.com/…"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            required
          />
          {image && (
            <div className="mt-2 overflow-hidden rounded-lg ring-1 ring-slate-700">
              <img
                src={image}
                alt="Preview"
                className="aspect-[4/3] w-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        {/* error */}
        {error && (
          <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300 ring-1 ring-red-500/40">
            {error}
          </p>
        )}

        {/* submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 transition-colors hover:bg-cyan-400 disabled:opacity-60"
        >
          {submitting ? 'Creating product…' : 'Create product'}
        </button>
      </form>
    </div>
  )
}
