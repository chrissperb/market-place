import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth({ role, children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate to={`/login?next=${location.pathname + location.search}`} replace />
    )
  }

  if (role && user.role !== role) {
    return <Navigate to="/account" replace />
  }

  return children
}