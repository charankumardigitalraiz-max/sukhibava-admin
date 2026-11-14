import React, { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  UserCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { MetricItem } from '../../types/dashboard'
import { Card } from '../common/Card'

interface StatCardsProps {
  metrics: MetricItem[]
}

export const StatCards: React.FC<StatCardsProps> = ({ metrics }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ cardId: string; index: number } | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start: number | null = null
    const duration = 850
    let animId: number

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const factor = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - factor, 3)
      setProgress(ease)
      if (factor < 1) {
        animId = requestAnimationFrame(step)
      }
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  const strokeColors: Record<MetricItem['accentColor'], string> = {
    primary: 'var(--color-primary, #6366f1)',
    indigo: 'var(--color-primary, #6366f1)',
    emerald: '#10b981',
    sky: '#0ea5e9',
    amber: '#f59e0b',
  }

  const iconStyles: Record<MetricItem['accentColor'], string> = {
    primary: 'bg-primary-50 text-primary-600 border border-primary-100',
    indigo: 'bg-primary-50 text-primary-600 border border-primary-100',
    emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    sky: 'bg-sky-50 text-sky-600 border border-sky-100',
    amber: 'bg-amber-50 text-amber-600 border border-amber-100',
  }

  const iconComponents: Record<
    MetricItem['accentColor'],
    React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  > = {
    primary: Users,
    indigo: Users,
    emerald: UserCheck,
    sky: TrendingUp,
    amber: Wallet,
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item) => {
        const strokeColor = strokeColors[item.accentColor]
        const IconComponent = iconComponents[item.accentColor]
        const iconStyle = iconStyles[item.accentColor]

        const minVal = Math.min(...item.sparkline)
        const maxVal = Math.max(...item.sparkline)
        const range = maxVal - minVal || 1

        const width = 95
        const height = 34

        const points = item.sparkline.map((val, idx) => {
          const x = (idx / (item.sparkline.length - 1)) * width
          const y = height - (((val - minVal) * progress) / range) * (height - 8) - 4
          return `${x},${y}`
        })

        const linePath = points.reduce((acc, curr, i, arr) => {
          if (i === 0) return `M ${curr}`
          const prev = arr[i - 1].split(',').map(Number)
          const current = curr.split(',').map(Number)
          const cx = (prev[0] + current[0]) / 2
          return `${acc} C ${cx},${prev[1]} ${cx},${current[1]} ${current[0]},${current[1]}`
        }, '')

        return (
          <Card
            key={item.id}
            padding="lg"
            className="bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200"
          >
            {/* Header: Title, Colored Icon & Change Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconStyle}`}>
                  <IconComponent size={14} strokeWidth={1.75} />
                </div>
                <span className="text-xs font-normal text-slate-600">
                  {item.title}
                </span>
              </div>

              <div
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-normal ${
                  item.isPositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-rose-50 text-rose-700 border border-rose-100'
                }`}
              >
                {item.isPositive ? (
                  <ArrowUpRight size={12} strokeWidth={2} />
                ) : (
                  <ArrowDownRight size={12} strokeWidth={2} />
                )}
                <span>{item.change}</span>
              </div>
            </div>

            {/* Value & Sparkline */}
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-2xl font-medium tracking-tight text-slate-800">
                  {item.value}
                </div>
                <div className="text-[10px] font-normal text-slate-400 mt-0.5">
                  {item.period}
                </div>
              </div>

              {/* Mini Sparkline Graph */}
              <div className="relative">
                <svg width={width} height={height} className="overflow-visible">
                  <path
                    d={linePath}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Interactive points */}
                  {item.sparkline.map((val, idx) => {
                    const x = (idx / (item.sparkline.length - 1)) * width
                    const y = height - ((val - minVal) / range) * (height - 8) - 4
                    const isHovered =
                      hoveredPoint?.cardId === item.id && hoveredPoint?.index === idx

                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r={isHovered ? 4 : 2}
                        fill={isHovered ? strokeColor : '#ffffff'}
                        stroke={strokeColor}
                        strokeWidth={isHovered ? 2 : 1.5}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredPoint({ cardId: item.id, index: idx })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    )
                  })}
                </svg>

                {/* Hover Tooltip */}
                {hoveredPoint?.cardId === item.id && (
                  <div className="pointer-events-none absolute -top-7 right-0 z-20 rounded border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-md">
                    {item.sparkline[hoveredPoint.index]}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
