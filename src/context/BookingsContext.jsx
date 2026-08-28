import { createContext, useContext, useMemo, useState } from 'react'

const BookingsContext = createContext(null)

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([])

  const addBooking = (booking) => setBookings((prev) => [booking, ...prev])

  const value = useMemo(() => ({ bookings, addBooking }), [bookings])

  return (
    <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>
  )
}

export function useBookings() {
  const ctx = useContext(BookingsContext)
  if (!ctx) throw new Error('useBookings must be used within BookingsProvider')
  return ctx
}
