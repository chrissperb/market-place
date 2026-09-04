import inventory from '../data/inventory'
import users from '../data/users'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

function allItems() {
  return [...inventory, ...loadExtras()]
}

const api = {
  /* Catalog */
  async getInventory() {
    await delay(300)
    return allItems()
  },

  async getItem(id) {
    await delay(200)
    const item = allItems().find((i) => i.id === id)
    if (!item) {
      throw new Error('NOT_FOUND')
    }
    return { ...item }
  },

  async getCategories() {
    await delay(100)
    return [...new Set(allItems().map((i) => i.category))]
  },

  async addProduct(data) {
    await delay(400)
    const extras = loadExtras()
    const product = {
      ...data,
      id: `ext-${Date.now()}`,
    }
    extras.push(product)
    saveExtras(extras)
    return { ...product }
  },

  /* Auth */
  async login(email, password) {
    await delay(400)
    const user = users.find(
      (u) => u.email === email && u.password === password
    )
    if (!user) {
      throw new Error('INVALID_CREDENTIALS')
    }
    const { password: _pw, ...safe } = user
    return { ...safe, token: `demo-token-${user.id}` }
  },

  /* Bookings (mock persistence in memory) */
  async createBooking(payload) {
    await delay(500)
    const reference = 'MB' + Math.floor(100000 + Math.random() * 900000)
    return { ...payload, reference, status: 'confirmed', createdAt: new Date().toISOString() }
  },
}

export default api
