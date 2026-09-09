import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

const STORAGE_KEY = 'marine.cart'

const persistCart = (store) => (next) => (action) => {
  const result = next(action)
  const { items } = store.getState().cart
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  return result
}

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistCart),
})

export default store