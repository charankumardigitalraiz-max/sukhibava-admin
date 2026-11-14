import React from 'react'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'offline' | 'busy'
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'md',
  status,
}) => {
  const getInitials = (n: string) => {
    const parts = n.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return n.slice(0, 2).toUpperCase()
  }

  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  }

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-300',
    busy: 'bg-amber-500',
  }

  // Consistent pleasant soft pastels based on name
  const bgColors = [
    'bg-primary-50 text-primary-700 border-primary-100',
    'bg-sky-50 text-sky-700 border-sky-100',
    'bg-emerald-50 text-emerald-700 border-emerald-100',
    'bg-amber-50 text-amber-700 border-amber-100',
    'bg-purple-50 text-purple-700 border-purple-100',
  ]
  const colorIndex = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % bgColors.length
  const colorClass = bgColors[colorIndex]

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`flex items-center justify-center rounded-full font-medium border ${sizeStyles[size]} ${colorClass}`}
      >
        {getInitials(name)}
      </div>
      {status && (
        <span
          className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-2 ring-white ${statusColors[status]}`}
        />
      )}
    </div>
  )
}

