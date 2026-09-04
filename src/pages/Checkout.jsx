import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useBookings } from '../context/BookingsContext'
import { formatPrice, isForSale, lineTotal } from '../utils/format'

const todayLocal = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`
}

export default function Checkout() {
  const { user } = useAuth()
  const { items, subtotal, count, clearCart } = useCart()
  const { addBooking } = useBookings()
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [contact, setContact] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <p className="text-6xl">🔐</p>
        <h1 className="mt-4 text-3xl font-bold text-white">
          Log in to check out
        </h1>
        <p className="mt-2 text-slate-400">
          You need an account to complete your booking.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login?next=/checkout"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
          >
            Log in
          </Link>
          <Link
            to="/cart"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800"
          >
            Back to cart
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date || !contact) {
      setError('Please complete the date and contact fields.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const booking = await api.createBooking({
        user,
        items: items.map((i) => ({
          itemId: i.item.id,
          name: i.item.name,
          qty: i.qty,
          hours: i.hours,
          soldBy: i.item.soldBy || 'hour',
          pricePerHour: i.item.pricePerHour,
          lineTotal: lineTotal(i.item, i.hours, i.qty),
        })),
        total: subtotal,
        date,
        contact,
        note,
      })
      addBooking(booking)
      clearCart()
      navigate('/confirmation', { state: { booking } })
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <Link
          to="/cart"
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
          ← Back to cart
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(0,20rem)]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700"
        >
          <h2 className="text-lg font-semibold text-white">Booking details</h2>

          <div>
            <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-300">
              Pickup date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              min={todayLocal()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="contact" className="mb-1 block text-sm font-medium text-slate-300">
              Contact phone
            </label>
            <input
              id="contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="note" className="mb-1 block text-sm font-medium text-slate-300">
              Notes (optional)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="3"
              placeholder="Special requests, pick-up directions…"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300 ring-1 ring-red-500/40">
              {error}
            </p>
          )}

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
            Paying as <span className="font-semibold text-white">{user.name}</span>{' '}
            ({user.email}). This is a demo — no real payment is processed.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 transition-colors hover:bg-cyan-400 disabled:opacity-60"
          >
            {submitting ? 'Confirming booking…' : `Confirm booking · ${formatPrice(subtotal)}`}
          </button>
        </form>

        <aside className="h-fit rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700">
          <h3 className="font-semibold text-white">Order summary</h3>
          <ul className="mt-4 space-y-3">
            {items.map(({ itemId, item, qty, hours }) => (
              <li key={itemId} className="flex justify-between gap-2 text-sm">
                <span className="text-slate-300">
                  {item.name} × {qty}
                  {isForSale(item) ? '' : ` (${hours}h)`}
                </span>
                <span className="font-semibold text-white">
                  {formatPrice(lineTotal(item, hours, qty))}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-slate-700 pt-3 text-sm text-slate-300">
            <span>Subtotal ({count} items)</span>
            <span className="font-semibold text-white">
              {formatPrice(subtotal)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  )
}
