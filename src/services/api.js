import inventory from '../data/inventory'
import users from '../data/users'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const api = {
  /* Catalog */
  async getInventory() {
    await delay(300)
    return [...inventory]
  },

  async getItem(id) {
    await delay(200)
    const item = inventory.find((i) => i.id === id)
    if (!item) {
      throw new Error('NOT_FOUND')
    }
    return { ...item }
  },

  async getCategories() {
    await delay(100)
    return [...new Set(inventory.map((i) => i.category))]
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
