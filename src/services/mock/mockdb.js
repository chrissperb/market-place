import inventory from '../../data/inventory'
import users from '../../data/users'

const EXTRAS_KEY = 'marine.extra_products'

function loadExtras() {
  try {
    const raw = localStorage.getItem(EXTRAS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveExtras(extras) {
  localStorage.setItem(EXTRAS_KEY, JSON.stringify(extras))
}

export const db = {
  inventory,
  users,
  extras: loadExtras(),
  bookings: [],
}

export const persistExtras = () => saveExtras(db.extras)

export const allItems = () => [...db.inventory, ...db.extras]

export const resetExtras = () => {
  db.extras = loadExtras()
}