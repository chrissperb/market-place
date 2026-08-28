import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-8xl font-black text-transparent">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">
        The page you&apos;re looking for drifted out to sea and couldn&apos;t be
        found.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Go home
        </Link>
        <Link
          to="/market"
          className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800"
        >
          Browse rentals
        </Link>
      </div>
    </div>
  )
}
