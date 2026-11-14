import React, { useState, useEffect } from 'react'
import type { CommissionBarData } from '../../types/dashboard'
import { Card } from '../common/Card'

interface RevenueBarChartProps {
  data: CommissionBarData[]
}

export const RevenueBarChart: React.FC<RevenueBarChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
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

  const maxTotal = Math.max(...data.map((d) => d.total)) * 1.15
  const chartHeight = 160

  return (
    <Card padding="lg" className="relative flex flex-col justify-between h-full transition-all duration-300">
      {/* Minimal Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-medium text-slate-800">
          Commission Inflow
        </h3>
        {/* Minimal dot legend */}
        <div className="flex items-center gap-3 text-xs font-normal text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary-500" />
            <span>Binary</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span>Direct</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Level</span>
          </span>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="relative mt-6 flex items-end justify-between gap-2 px-1">
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx
          const totalHeight = (item.total / maxTotal) * chartHeight * progress
          const binaryH = (item.binaryMatching / item.total) * totalHeight
          const directH = (item.directBonus / item.total) * totalHeight
          const levelH = (item.levelIncome / item.total) * totalHeight

          return (
            <div
              key={item.label}
              className={`group relative flex flex-1 flex-col items-center cursor-pointer rounded-lg py-2 transition-all duration-200 ${
                isHovered ? 'bg-slate-50' : ''
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Floating Tooltip ONLY on Hover */}
              {isHovered && (
                <div className="pointer-events-none absolute -top-24 z-30 min-w-[135px] rounded-lg border border-slate-200 bg-white p-2.5 shadow-lg text-xs transition-all duration-100 animate-in fade-in zoom-in-95">
                  <div className="font-medium text-slate-800 border-b border-slate-100 pb-1 mb-1.5 flex justify-between">
                    <span>{item.label}</span>
                    <span className="text-primary-600">₹{item.total}k</span>
                  </div>
                  <div className="space-y-1 text-[11px] font-normal text-slate-500">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                        Binary Match
                      </span>
                      <span className="font-medium text-slate-700">₹{item.binaryMatching}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        Direct Bonus
                      </span>
                      <span className="font-medium text-slate-700">₹{item.directBonus}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        Level Income
                      </span>
                      <span className="font-medium text-slate-700">₹{item.levelIncome}k</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stacked Vertical Bar */}
              <div
                className="w-full max-w-[34px] flex flex-col justify-end overflow-hidden rounded-md transition-all duration-300"
                style={{
                  height: `${totalHeight}px`,
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? 'scaleY(1.03)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                }}
              >
                <div
                  className="w-full bg-amber-400/90 transition-all duration-300"
                  style={{ height: `${levelH}px` }}
                />
                <div
                  className="w-full bg-sky-400/90 transition-all duration-300"
                  style={{ height: `${directH}px` }}
                />
                <div
                  className="w-full bg-primary-500/90 transition-all duration-300"
                  style={{ height: `${binaryH}px` }}
                />
              </div>

              {/* Minimal Axis Label */}
              <span
                className={`mt-2 text-[11px] font-normal transition-colors ${
                  isHovered ? 'text-primary-600 font-medium' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
