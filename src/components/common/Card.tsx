import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  return (
    <div
      className={`bg-white rounded-md border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
