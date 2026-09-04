import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, isForSale, lineTotal } from '../utils/format'

export default function Cart() {
  const { items, count, subtotal, totalDeposit, updateQty, updateHours, removeItem } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-6xl">🧺</p>
        <h1 className="mt-4 text-3xl font-bold text-white">Your cart is empty</h1>
        <p className="mt-2 text-slate-400">
          Add some marine gear to get started.
        </p>
        <Link
          to="/market"
          className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Browse rentals
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-white">
        Your cart ({count} {count === 1 ? 'item' : 'items'})
      </h1>

      <div className="mt-8">
        <ul className="space-y-4">
          {items.map(({ itemId, item, hours, qty }) => (
            <li
              key={itemId}
              className="flex flex-col gap-4 rounded-2xl bg-slate-800 p-4 ring-1 ring-slate-700 sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-full rounded-lg object-cover sm:w-32"
              />
              <div className="flex-1">
                <Link
                  to={`/item/${item.id}`}
                  className="font-semibold text-white hover:text-cyan-400"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-slate-400">
                  {isForSale(item)
                    ? `${formatPrice(item.price)} each`
                    : `${formatPrice(item.pricePerHour)}/hour`}{' '}
                  · {item.location}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`qty-${itemId}`} className="text-sm text-slate-400">
                      Qty
                    </label>
                    <button
                      onClick={() => updateQty(itemId, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600 text-white hover:bg-slate-700"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold text-white">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQty(itemId, 1)}
                      disabled={qty >= item.stock}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-600 text-white hover:bg-slate-700 disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  {!isForSale(item) && (
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`hours-${itemId}`}
                        className="text-sm text-slate-400"
                      >
                        Hours
                      </label>
                      <input
                        id={`hours-${itemId}`}
                        type="number"
                        min="1"
                        max="24"
                        value={hours}
                        onChange={(e) => updateHours(itemId, e.target.value)}
                        className="w-20 rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-center text-white focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                <span className="text-lg font-bold text-white">
                  {formatPrice(lineTotal(item, hours, qty))}
                </span>
                <button
                  onClick={() => removeItem(itemId)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700">
          <div className="flex justify-between text-slate-300">
            <span>Subtotal</span>
            <span className="font-semibold text-white">
              {formatPrice(subtotal)}
            </span>
          </div>
          {totalDeposit > 0 && (
            <div className="mt-2 flex justify-between text-slate-300">
              <span>Refundable deposits</span>
              <span className="font-semibold text-white">
                {formatPrice(totalDeposit)}
              </span>
            </div>
          )}
          <div className="mt-4 flex justify-between border-t border-slate-700 pt-4 text-lg">
            <span className="font-semibold text-white">Total to pay now</span>
            <span className="font-bold text-cyan-400">
              {formatPrice(subtotal)}
            </span>
          </div>
          {totalDeposit > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              Deposits are held separately and returned on return of the equipment.
            </p>
          )}

          <Link
            to="/checkout"
            className="mt-5 block w-full rounded-xl bg-cyan-500 py-3 text-center font-semibold text-slate-900 transition-colors hover:bg-cyan-400"
          >
            Proceed to checkout →
          </Link>
        </div>
      </div>
    </div>
  )
}
