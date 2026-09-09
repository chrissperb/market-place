import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const tabClass = ({ isActive }) =>
  `rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-cyan-500 text-slate-900'
      : 'text-slate-200 hover:bg-slate-700'
  }`

export default function AccountLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login?next=/account" replace />
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-white">My account</h1>
      <p className="mt-1 text-sm text-slate-400">
        Signed in as <span className="text-slate-200">{user.email}</span>
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        <NavLink to="/account" end className={tabClass}>
          Profile
        </NavLink>
        <NavLink to="/account/bookings" className={tabClass}>
          Bookings
        </NavLink>
        <NavLink to="/account/orders" className={tabClass}>
          Orders
        </NavLink>
      </nav>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  )
}