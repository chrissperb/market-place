import { useAuth } from '../../context/AuthContext'

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export default function Profile() {
  const { user } = useAuth()

  const role = user.role === 'admin' ? 'Admin' : 'Member'

  return (
    <div className="rounded-2xl bg-slate-800 p-6 ring-1 ring-slate-700">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-slate-900">
          {initials(user.name)}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${
                role === 'Admin'
                  ? 'bg-cyan-500/15 text-cyan-400 ring-cyan-500/50'
                  : 'bg-slate-700/50 text-slate-300 ring-slate-600'
              }`}
            >
              {role}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-700 pt-4 text-sm text-slate-400">
        <p>
          This demo stores your session locally. Bookings and orders from this
          account stay in memory for the current page load only.
        </p>
      </div>
    </div>
  )
}