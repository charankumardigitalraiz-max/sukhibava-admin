import React, { useState, useEffect } from 'react'
import type { IncomeStreamPoint } from '../../types/dashboard'
import { Card } from '../common/Card'

interface DistributionChartProps {
  data: IncomeStreamPoint[]
}

export const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
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

  const streams = [
    { key: 'binary' as const, name: 'Binary Match', color: '#6366f1' },
    { key: 'direct' as const, name: 'Direct Bonus', color: '#0ea5e9' },
    { key: 'leadership' as const, name: 'Leadership Pool', color: '#10b981' },
    { key: 'royalty' as const, name: 'Rank Royalty', color: '#f59e0b' },
  ]

  const maxVal = Math.max(...data.flatMap((d) => [d.binary, d.direct, d.leadership, d.royalty])) * 1.15
  const chartWidth = 560
  const chartHeight = 210
  const paddingX = 35
  const paddingY = 25

  const getX = (index: number) => {
    return paddingX + (index * (chartWidth - paddingX * 2)) / (data.length - 1)
  }

  const getY = (val: number) => {
    return chartHeight - paddingY - (val / maxVal) * (chartHeight - paddingY * 2)
  }

  const buildSplinePath = (key: 'binary' | 'direct' | 'leadership' | 'royalty') => {
    const points = data.map((d, i) => `${getX(i)},${getY(d[key] * progress)}`)
    return points.reduce((acc, curr, i, arr) => {
      if (i === 0) return `M ${curr}`
      const prev = arr[i - 1].split(',').map(Number)
      const current = curr.split(',').map(Number)
      const cx = (prev[0] + current[0]) / 2
      return `${acc} C ${cx},${prev[1]} ${cx},${current[1]} ${current[0]},${current[1]}`
    }, '')
  }

  // Hover anywhere across the chart
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * chartWidth

    let closest = 0
    let minDistance = Infinity
    data.forEach((_, i) => {
      const dist = Math.abs(getX(i) - svgX)
      if (dist < minDistance) {
        minDistance = dist
        closest = i
      }
    })
    setHoveredIdx(closest)
  }

  return (
    <Card padding="lg" className="relative flex flex-col justify-between h-full transition-all duration-300">
      {/* Header with Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <h3 className="text-sm font-medium text-slate-800">
          Income Streams
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs font-normal text-slate-500">
          {streams.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span>{s.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Pure Graph Area */}
      <div className="relative my-auto w-full pt-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Subtle Grid Lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2)
            return (
              <line
                key={ratio}
                x1={paddingX}
                y1={y}
                x2={chartWidth - paddingX}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            )
          })}

          {/* Stream Curves */}
          {streams.map((stream) => {
            const path = buildSplinePath(stream.key)

            return (
              <g key={stream.key}>
                <path
                  d={path}
                  fill="none"
                  stroke={stream.color}
                  strokeWidth={hoveredIdx !== null ? '2' : '1.75'}
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />

                {/* Nodes on the curve */}
                {data.map((d, i) => {
                  const x = getX(i)
                  const y = getY(d[stream.key] * progress)
                  const isNodeHovered = hoveredIdx === i

                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isNodeHovered ? 4.5 : 2.5}
                      fill={isNodeHovered ? stream.color : '#ffffff'}
                      stroke={stream.color}
                      strokeWidth={isNodeHovered ? 2 : 1.5}
                      className="transition-all duration-150"
                    />
                  )
                })}
              </g>
            )
          })}

          {/* Vertical Tracking Line across all curves */}
          {hoveredIdx !== null && (
            <line
              x1={getX(hoveredIdx)}
              y1={paddingY}
              x2={getX(hoveredIdx)}
              y2={chartHeight - paddingY}
              stroke="#818cf8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="transition-all duration-75"
            />
          )}

          {/* X-Axis labels */}
          {data.map((d, i) => (
            <text
              key={d.day}
              x={getX(i)}
              y={chartHeight - 4}
              textAnchor="middle"
              className={`text-[9px] font-normal transition-colors ${
                hoveredIdx === i ? 'fill-primary-600 font-medium' : 'fill-slate-400'
              }`}
            >
              {d.day}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip Anywhere - Shows All 4 Streams for Selected Day */}
        {hoveredIdx !== null && (
          <div
            className="pointer-events-none absolute -top-12 z-30 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-md text-xs transition-all duration-100 min-w-[130px]"
            style={{
              left: `${(getX(hoveredIdx) / chartWidth) * 100}%`,
            }}
          >
            <div className="font-medium text-slate-800 border-b border-slate-100 pb-1 mb-1 flex justify-between">
              <span>{data[hoveredIdx].day}</span>
              <span className="text-slate-400 font-normal">Income</span>
            </div>
            <div className="space-y-1 text-[11px] font-normal">
              {streams.map((stream) => (
                <div key={stream.key} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: stream.color }}
                    />
                    {stream.name}
                  </span>
                  <span className="font-medium text-slate-700">
                    ₹{data[hoveredIdx][stream.key]}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Minimal Bottom Legend */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
        {streams.map((stream) => (
          <div key={stream.key} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: stream.color }}
            />
            <span className="font-normal text-slate-600">{stream.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
