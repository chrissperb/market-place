import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './services/mock/server'
import store from './store'
import { AuthProvider } from './context/AuthContext'
import { BookingsProvider } from './context/BookingsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <BookingsProvider>
            <App />
          </BookingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
