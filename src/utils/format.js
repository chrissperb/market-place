export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0)

export const isForSale = (item) => item.soldBy === 'unit'

export const unitPrice = (item) =>
  isForSale(item) ? item.price : item.pricePerHour

export const lineTotal = (item, hours, qty) =>
  isForSale(item) ? item.price * qty : item.pricePerHour * hours * qty
