import React, { useState, useEffect } from 'react'
import type { PerformanceRingData } from '../../types/dashboard'
import { Card } from '../common/Card'

interface PerformanceRingsChartProps {
  metrics: PerformanceRingData[]
}

export const PerformanceRingsChart: React.FC<PerformanceRingsChartProps> = ({
  metrics,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let start: number | null = null
    const duration = 900
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

  // Sizing for 4 concentric rings
  const baseRadius = 32
  const ringWidth = 8
  const ringGap = 6
  const center = 95

  return (
    <Card padding="lg" className="relative flex flex-col justify-between h-full transition-all duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-medium text-slate-800">
          Efficiency Index
        </h3>
        <span className="text-xs font-normal text-slate-400">
          Binary Benchmarks
        </span>
      </div>

      {/* Pure Concentric Rings Area */}
      <div className="relative my-auto flex items-center justify-center py-4">
        <svg
          width="190"
          height="190"
          viewBox="0 0 190 190"
          className="-rotate-90 overflow-visible"
        >
          {metrics.map((item, idx) => {
            const radius = baseRadius + idx * (ringWidth + ringGap)
            const circumference = 2 * Math.PI * radius
            const dashOffset = circumference - ((item.score * progress) / 100) * circumference
            const isHovered = hoveredIdx === idx

            return (
              <g
                key={item.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Background Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth={ringWidth}
                />

                {/* Progress Ring with smooth animated transition */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? ringWidth + 3 : ringWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </g>
            )
          })}
        </svg>

        {/* Floating Tooltip ONLY on Hover */}
        {hoveredIdx !== null ? (
          <div className="pointer-events-none absolute z-30 min-w-[130px] rounded-lg border border-slate-200 bg-white p-2.5 shadow-lg text-center text-xs animate-in fade-in zoom-in-95 duration-100">
            <div className="font-medium text-slate-800">
              {metrics[hoveredIdx].label}
            </div>
            <div
              className="text-base font-medium mt-0.5"
              style={{ color: metrics[hoveredIdx].color }}
            >
              {metrics[hoveredIdx].score}%
            </div>
            <div className="text-[10px] font-normal text-slate-400 mt-0.5">
              {metrics[hoveredIdx].benchmark}
            </div>
          </div>
        ) : (
          <div className="pointer-events-none absolute text-center">
            <div className="text-xl font-medium tracking-tight text-slate-800">
              93.8%
            </div>
            <div className="text-[10px] font-normal text-slate-400">
              Binary Match
            </div>
          </div>
        )}
      </div>

      {/* Minimal Bottom Legend */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-2.5 border-t border-slate-100">
        {metrics.map((item, idx) => {
          const isHovered = hoveredIdx === idx

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center gap-1.5 text-xs transition-opacity cursor-pointer ${
                hoveredIdx !== null && !isHovered ? 'opacity-35' : 'opacity-100'
              }`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-normal text-slate-600">
                {item.label.split(' ')[0]}
              </span>
              <span className="ml-auto font-medium text-slate-700">
                {item.score}%
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
