export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value)
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const getStatusColor = (
  status: 'Completed' | 'Confirmed' | 'Pending' | 'In Progress'
): { badge: string; dot: string } => {
  switch (status) {
    case 'Completed':
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        dot: 'bg-emerald-500',
      }
    case 'Confirmed':
      return {
        badge: 'bg-sky-50 text-sky-700 border-sky-100',
        dot: 'bg-sky-500',
      }
    case 'In Progress':
      return {
        badge: 'bg-primary-50 text-primary-700 border-primary-100',
        dot: 'bg-primary-500',
      }
    case 'Pending':
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-100',
        dot: 'bg-amber-500',
      }
    default:
      return {
        badge: 'bg-slate-50 text-slate-700 border-slate-100',
        dot: 'bg-slate-400',
      }
  }
}

