import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const linkClass = ({ isActive }) =>
  `px-1 py-2 font-medium transition-colors ${
    isActive ? 'text-cyan-500' : 'text-slate-200 hover:text-white'
  }`

export default function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-lg text-slate-900">
            ⛵
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            SeaRent
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/market" className={linkClass}>
            Marketplace
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            <span className="relative">
              Cart
              {count > 0 && (
                <span className="absolute -right-4 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-900">
                  {count}
                </span>
              )}
            </span>
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-slate-300">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-400"
            >
              Log in
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 hover:bg-slate-800 md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-slate-700/60 px-4 py-3 md:hidden"
        >
          <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/market" className={linkClass} onClick={() => setOpen(false)}>
            Marketplace
          </NavLink>
          <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>
            Cart{count > 0 ? ` (${count})` : ''}
          </NavLink>
          <div className="mt-2 border-t border-slate-700/60 pt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-cyan-500 px-4 py-1.5 text-center text-sm font-semibold text-slate-900"
              >
                Log in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
