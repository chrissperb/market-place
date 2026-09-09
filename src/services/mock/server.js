import MockAdapter from 'axios-mock-adapter'
import http from '../http'
import { db, persistExtras, allItems } from './mockdb'

const mock = new MockAdapter(http, { delayResponse: 350 })

/* Catalog */
mock.onGet('/catalog').reply(() => [200, allItems()])

mock.onGet(/\/catalog\/[^/]+$/).reply((config) => {
  const id = config.url.split('/').pop()
  const item = allItems().find((i) => i.id === id)
  return item ? [200, { ...item }] : [404, { message: 'NOT_FOUND' }]
})

mock.onGet('/categories').reply(() => [
  200,
  [...new Set(allItems().map((i) => i.category))],
])

/* Products (CRUD for custom extras) */
mock.onPost('/products').reply((config) => {
  const data = JSON.parse(config.data)
  const product = { ...data, id: `ext-${Date.now()}` }
  db.extras.push(product)
  persistExtras()
  return [201, { ...product }]
})

mock.onPut(/\/products\/[^/]+$/).reply((config) => {
  const id = config.url.split('/').pop()
  const idx = db.extras.findIndex((p) => p.id === id)
  if (idx === -1) return [404, { message: 'NOT_FOUND' }]
  const data = JSON.parse(config.data)
  db.extras[idx] = { ...db.extras[idx], ...data }
  persistExtras()
  return [200, { ...db.extras[idx] }]
})

mock.onDelete(/\/products\/[^/]+$/).reply((config) => {
  const id = config.url.split('/').pop()
  const idx = db.extras.findIndex((p) => p.id === id)
  if (idx === -1) return [404, { message: 'NOT_FOUND' }]
  db.extras.splice(idx, 1)
  persistExtras()
  return [200, { ok: true }]
})

/* Auth */
mock.onPost('/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data)
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  )
  if (!user) return [401, { message: 'INVALID_CREDENTIALS' }]
  const { password: _pw, ...safe } = user
  return [200, { ...safe, token: `demo-token-${user.id}` }]
})

/* Bookings */
mock.onPost('/bookings').reply((config) => {
  const payload = JSON.parse(config.data)
  const reference = 'MB' + Math.floor(100000 + Math.random() * 900000)
  const booking = {
    ...payload,
    reference,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }
  db.bookings.push(booking)
  return [201, { ...booking }]
})

export default mock