import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 h-8',
    md: 'text-sm px-3.5 py-2 h-9',
  }

  const variantStyles = {
    primary:
      'bg-primary-600 hover:bg-primary-700 text-white shadow-xs',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-xs',
    ghost:
      'bg-transparent hover:bg-slate-100/70 text-slate-600',
    soft:
      'bg-primary-50 hover:bg-primary-100/70 text-primary-700 border border-primary-100/60',
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

