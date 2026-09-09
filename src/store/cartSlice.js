import { createSelector, createSlice } from '@reduxjs/toolkit'
import { isForSale, lineTotal } from '../utils/format'

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

const initialState = {
  items: loadCart(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer(state, action) {
        const { item, hours, qty = 1 } = action.payload
        const sale = isForSale(item)
        const effHours = sale ? 1 : hours
        const total = Number(qty)
        const existing = state.items.find((i) => i.itemId === item.id)
        if (existing) {
          existing.hours = clampHours(effHours)
          existing.qty = Math.min(existing.qty + total, item.stock)
          return
        }
        state.items.push({
          itemId: item.id,
          item,
          hours: clampHours(effHours),
          qty: Math.min(total, item.stock),
        })
      },
      prepare: (item, hours, qty = 1) => ({ payload: { item, hours, qty } }),
    },
    updateQty(state, action) {
      const { itemId, delta } = action.payload
      state.items = state.items
        .map((i) =>
          i.itemId === itemId
            ? { ...i, qty: Math.max(0, Math.min(i.qty + delta, i.item.stock)) }
            : i
        )
        .filter((i) => i.qty > 0)
    },
    updateHours(state, action) {
      const { itemId, hours } = action.payload
      state.items = state.items.map((i) =>
        i.itemId === itemId ? { ...i, hours: clampHours(hours) } : i
      )
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.itemId !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, updateQty, updateHours, removeItem, clearCart } =
  cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((n, i) => n + i.qty, 0)
)

export const selectCartSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + lineTotal(i.item, i.hours, i.qty), 0)
)

export const selectTotalDeposit = createSelector([selectCartItems], (items) =>
  items.reduce(
    (sum, i) => (isForSale(i.item) ? sum : sum + i.item.deposit * i.qty),
    0
  )
)

export default cartSlice.reducer