import http from './http'

const NOT_FOUND = 'NOT_FOUND'
const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'

function errorCode(err) {
  return err?.response?.data?.message || err?.code
}

const api = {
  /* Catalog */
  async getInventory() {
    const { data } = await http.get('/catalog')
    return data
  },

  async getItem(id) {
    try {
      const { data } = await http.get(`/catalog/${id}`)
      return data
    } catch (err) {
      throw new Error(errorCode(err) === NOT_FOUND ? NOT_FOUND : 'REQUEST_FAILED')
    }
  },

  async getCategories() {
    const { data } = await http.get('/categories')
    return data
  },

  /* Products */
  async addProduct(data) {
    const { data: product } = await http.post('/products', data)
    return product
  },

  async updateProduct(id, data) {
    const { data: product } = await http.put(`/products/${id}`, data)
    return product
  },

  async deleteProduct(id) {
    const { data } = await http.delete(`/products/${id}`)
    return data
  },

  /* Auth */
  async login(email, password) {
    try {
      const { data } = await http.post('/auth/login', { email, password })
      return data
    } catch (err) {
      throw new Error(
        errorCode(err) === INVALID_CREDENTIALS ? INVALID_CREDENTIALS : 'REQUEST_FAILED'
      )
    }
  },

  /* Bookings */
  async createBooking(payload) {
    const { data } = await http.post('/bookings', payload)
    return data
  },
}

export default api