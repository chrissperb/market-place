import { createContext, useContext, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('marine.user')
      const parsed = raw ? JSON.parse(raw) : null
      return parsed && parsed.name ? parsed : null
    } catch {
      return null
    }
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const u = await api.login(email, password)
      localStorage.setItem('marine.user', JSON.stringify(u))
      setUser(u)
      return u
    } catch (e) {
      setError('Invalid email or password.')
      throw e
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('marine.user')
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, login, logout, loading, error }),
    [user, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
