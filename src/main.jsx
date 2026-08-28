import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { BookingsProvider } from './context/BookingsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <BookingsProvider>
            <App />
          </BookingsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
