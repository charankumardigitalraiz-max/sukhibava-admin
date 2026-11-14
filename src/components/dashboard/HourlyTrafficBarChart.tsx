import React, { useState, useEffect } from 'react'
import type { HourlyTrafficData } from '../../types/dashboard'
import { Card } from '../common/Card'

interface HourlyTrafficBarChartProps {
  data: HourlyTrafficData[]
}

export const HourlyTrafficBarChart: React.FC<HourlyTrafficBarChartProps> = ({
  data,
}) => {
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

  const maxCount = Math.max(...data.map((d) => d.capacity))
  const chartHeight = 150

  return (
    <Card padding="lg" className="relative flex flex-col justify-between h-full transition-all duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-medium text-slate-800">
          Peak Footfall
        </h3>
        <span className="text-xs font-normal text-slate-400">
          Hourly Signups
        </span>
      </div>

      <div className="relative mt-6 flex items-end justify-between gap-1.5 px-1">
        {data.map((item, idx) => {
          const isHovered = hoveredIdx === idx
          const barHeight = (item.count / maxCount) * chartHeight * progress
          const capacityHeight = (item.capacity / maxCount) * chartHeight * progress
          const utilizationPct = Math.round((item.count / item.capacity) * 100)

          return (
            <div
              key={item.hour}
              className={`group relative flex flex-1 flex-col items-center cursor-pointer rounded-lg py-2 transition-all duration-200 ${
                isHovered ? 'bg-slate-50' : ''
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip ONLY on Hover */}
              {isHovered && (
                <div className="pointer-events-none absolute -top-20 z-30 min-w-[125px] rounded-lg border border-slate-200 bg-white p-2.5 shadow-lg text-xs transition-all duration-100 animate-in fade-in zoom-in-95">
                  <div className="font-medium text-slate-800 border-b border-slate-100 pb-1 mb-1 flex justify-between">
                    <span>{item.hour}</span>
                    <span className="text-emerald-600 font-medium">{utilizationPct}%</span>
                  </div>
                  <div className="space-y-0.5 text-[11px] font-normal text-slate-500">
                    <div className="flex justify-between">
                      <span>Clicks:</span>
                      <span className="font-medium text-slate-700">{item.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span className="text-slate-400">{item.capacity}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bar Container with Background Track */}
              <div
                className="relative w-full max-w-[28px] rounded-md bg-slate-100 overflow-hidden"
                style={{ height: `${capacityHeight}px` }}
              >
                <div
                  className="absolute bottom-0 w-full rounded-md bg-emerald-500 transition-all duration-300"
                  style={{
                    height: `${barHeight}px`,
                    opacity: isHovered ? 1 : 0.85,
                  }}
                />
              </div>

              {/* Minimal Axis Label */}
              <span
                className={`mt-2 text-[10px] font-normal transition-colors ${
                  isHovered ? 'text-emerald-700 font-medium' : 'text-slate-400'
                }`}
              >
                {item.hour}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
