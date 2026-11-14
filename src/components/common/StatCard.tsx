import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface StatItem {
  id: string
  title: string
  value: string | number
  subtitle?: string
  change?: string
  isPositive?: boolean
  icon?: LucideIcon
  color?: 'primary' | 'emerald' | 'sky' | 'amber' | 'rose' | 'purple'
}

interface StatCardGridProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export const StatCard: React.FC<StatItem> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  color = 'primary',
}) => {
  const colorMap = {
    primary: {
      iconText: 'text-primary-600',
      iconBg: 'bg-primary-50/80 border-primary-100/80',
    },
    emerald: {
      iconText: 'text-emerald-600',
      iconBg: 'bg-emerald-50/80 border-emerald-100/80',
    },
    sky: {
      iconText: 'text-sky-600',
      iconBg: 'bg-sky-50/80 border-sky-100/80',
    },
    amber: {
      iconText: 'text-amber-600',
      iconBg: 'bg-amber-50/80 border-amber-100/80',
    },
    rose: {
      iconText: 'text-rose-600',
      iconBg: 'bg-rose-50/80 border-rose-100/80',
    },
    purple: {
      iconText: 'text-purple-600',
      iconBg: 'bg-purple-50/80 border-purple-100/80',
    },
  }

  const activeColor = colorMap[color] || colorMap.primary

  return (
    <div className="relative flex flex-col justify-between rounded-md border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-normal text-slate-500 truncate">
          {title}
        </span>
        {Icon && (
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${activeColor.iconBg} ${activeColor.iconText}`}
          >
            <Icon size={16} strokeWidth={1.75} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-medium tracking-tight text-slate-800 tabular-nums">
          {value}
        </div>
        {(subtitle || change) && (
          <div className="mt-1.5 flex items-center justify-between gap-2 text-xs">
            {subtitle && (
              <span className="text-slate-500 font-normal truncate">
                {subtitle}
              </span>
            )}
            {change && (
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-normal border ${isPositive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : 'bg-rose-50 text-rose-700 border-rose-100'
                  }`}
              >
                {change.startsWith('+') ? (
                  <TrendingUp size={11} strokeWidth={2} />
                ) : change.startsWith('-') ? (
                  <TrendingDown size={11} strokeWidth={2} />
                ) : null}
                <span>{change}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export const StatCardGrid: React.FC<StatCardGridProps> = ({
  stats,
  columns = 4,
  className = '',
}) => {
  const colClass =
    columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : columns === 3
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2'

  return (
    <div className={`grid gap-4 ${colClass} animate-fade-up ${className}`}>
      {stats.map((item) => (
        <StatCard key={item.id} {...item} />
      ))}
    </div>
  )
}
