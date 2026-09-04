import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ItemDetail from './pages/ItemDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-900"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
