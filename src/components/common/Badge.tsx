import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'emerald' | 'indigo' | 'sky' | 'amber' | 'slate'
  size?: 'sm' | 'md'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'md',
  dot = false,
}) => {
  const variantStyles = {
    primary: 'bg-primary-50 text-primary-700 border-primary-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    indigo: 'bg-primary-50 text-primary-700 border-primary-100',
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  }

  const dotColors = {
    primary: 'bg-primary-500',
    emerald: 'bg-emerald-500',
    indigo: 'bg-primary-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    slate: 'bg-slate-400',
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-normal transition-colors ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

