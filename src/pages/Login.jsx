import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import users from '../data/users'

export default function Login() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (!email || !password) {
      setLocalError('Enter both email and password.')
      return
    }
    try {
      await login(email, password)
      navigate(next, { replace: true })
    } catch {
      /* error handled in context */
    }
  }

  const demo = users[0]

  const fillDemo = () => {
    setEmail(demo.email)
    setPassword('demo1234')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl bg-slate-800 p-8 ring-1 ring-slate-700">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-2xl text-slate-900">
            ⛵
          </span>
          <h1 className="mt-4 text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-400">
            Log in to complete your checkout.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>

          {(localError || error) && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-300 ring-1 ring-red-500/40">
              {localError || error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-900 transition-colors hover:bg-cyan-400 disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-4 text-center">
          <p className="text-xs text-slate-400">Demo account</p>
          <p className="mt-1 text-sm text-slate-200">
            {demo.email} / <span className="font-mono">demo1234</span>
          </p>
          <button
            onClick={fillDemo}
            className="mt-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Fill demo credentials
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        No registration needed for this demo — use the credentials above.
      </p>
      <p className="mt-2 text-center">
        <Link to="/market" className="text-sm text-cyan-400 hover:text-cyan-300">
          Back to browsing →
        </Link>
      </p>
    </div>
  )
}
