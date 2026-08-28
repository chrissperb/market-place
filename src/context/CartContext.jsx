import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'marine.cart'

const clampHours = (h) => Math.min(24, Math.max(1, Number(h)))

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item, hours, qty = 1) => {
    setItems((prev) => {
      const total = Number(qty)
      const existing = prev.find((i) => i.itemId === item.id)
      if (existing) {
        return prev.map((i) =>
          i.itemId === item.id
            ? {
                ...i,
                hours: clampHours(hours),
                qty: Math.min(existing.qty + total, item.stock),
              }
            : i
        )
      }
      return [
        ...prev,
        {
          itemId: item.id,
          item,
          hours: clampHours(hours),
          qty: Math.min(total, item.stock),
        },
      ]
    })
  }

  const updateQty = (itemId, delta) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.itemId === itemId
            ? { ...i, qty: Math.max(0, Math.min(i.qty + delta, i.item.stock)) }
            : i
        )
        .filter((i) => i.qty > 0)
    )
  }

  const updateHours = (itemId, hours) => {
    setItems((prev) =>
      prev.map((i) =>
        i.itemId === itemId ? { ...i, hours: clampHours(hours) } : i
      )
    )
  }

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.itemId !== itemId))
  }

  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => sum + i.item.pricePerHour * i.hours * i.qty, 0),
    [items]
  )

  const totalDeposit = useMemo(
    () => items.reduce((sum, i) => sum + i.item.deposit * i.qty, 0),
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      totalDeposit,
      addItem,
      updateQty,
      updateHours,
      removeItem,
      clearCart,
    }),
    [items, count, subtotal, totalDeposit]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
