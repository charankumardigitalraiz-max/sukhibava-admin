import React, { useState, useEffect } from 'react'
import type { ChartDataPoint } from '../../types/dashboard'
import { Card } from '../common/Card'

interface AnalyticsChartProps {
  weeklyData: ChartDataPoint[]
  monthlyData: ChartDataPoint[]
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  weeklyData,
  monthlyData,
}) => {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
  }, [period])

  const activeData = period === 'weekly' ? weeklyData : monthlyData
  const maxValue = Math.max(...activeData.map((d) => Math.max(d.value, d.secondaryValue))) * 1.15

  // SVG Chart Dimensions
  const chartHeight = 210
  const chartWidth = 560
  const paddingX = 35
  const paddingY = 25

  const getX = (index: number) => {
    if (activeData.length <= 1) return paddingX
    return paddingX + (index * (chartWidth - paddingX * 2)) / (activeData.length - 1)
  }

  const getY = (val: number) => {
    return chartHeight - paddingY - (val / maxValue) * (chartHeight - paddingY * 2)
  }

  // Smooth SVG path for primary curve (starts from 0 on baseline)
  const points = activeData.map((d, i) => `${getX(i)},${getY(d.value * progress)}`)
  const linePath = points.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr}`
    const prev = arr[i - 1].split(',').map(Number)
    const current = curr.split(',').map(Number)
    const cx = (prev[0] + current[0]) / 2
    return `${acc} C ${cx},${prev[1]} ${cx},${current[1]} ${current[0]},${current[1]}`
  }, '')

  const areaPath = `${linePath} L ${getX(activeData.length - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`

  // Secondary curve (starts from 0 on baseline)
  const secondaryPoints = activeData.map((d, i) => `${getX(i)},${getY(d.secondaryValue * progress)}`)
  const secondaryLinePath = secondaryPoints.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr}`
    const prev = arr[i - 1].split(',').map(Number)
    const current = curr.split(',').map(Number)
    const cx = (prev[0] + current[0]) / 2
    return `${acc} C ${cx},${prev[1]} ${cx},${current[1]} ${current[0]},${current[1]}`
  }, '')

  // Track hover ANYWHERE on the chart (not just on the dot)
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const svgX = ((e.clientX - rect.left) / rect.width) * chartWidth

    let closestIdx = 0
    let minDistance = Infinity
    activeData.forEach((_, i) => {
      const dist = Math.abs(getX(i) - svgX)
      if (dist < minDistance) {
        minDistance = dist
        closestIdx = i
      }
    })
    setHoveredIndex(closestIdx)
  }

  return (
    <Card padding="lg" className="flex flex-col justify-between transition-all duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <h3 className="text-sm font-medium text-slate-800">
          Network Growth
        </h3>

        <div className="flex items-center gap-3">
          {/* Legend */}
          {/* <div className="hidden sm:flex items-center gap-4 text-xs font-normal text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              <span>Downlines</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              <span>Directs</span>
            </span>
          </div> */}

          {/* Period Selector */}
          <div className="inline-flex rounded-lg border border-slate-200/80 bg-slate-50/70 p-0.5 text-xs font-normal text-slate-600">
            <button
              onClick={() => {
                setPeriod('weekly')
                setHoveredIndex(null)
              }}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${period === 'weekly'
                  ? 'bg-white text-primary-700 font-medium shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Weekly
            </button>
            <button
              onClick={() => {
                setPeriod('monthly')
                setHoveredIndex(null)
              }}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${period === 'monthly'
                  ? 'bg-white text-primary-700 font-medium shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart Area */}
      <div className="relative mt-4 w-full">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
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

          {/* Area fill */}
          <path d={areaPath} fill="url(#areaGradient)" className="transition-all duration-300" />

          {/* Secondary curve */}
          <path
            d={secondaryLinePath}
            fill="none"
            stroke="#bae6fd"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            className="transition-all duration-300"
          />

          {/* Primary curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.25"
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Vertical Tracking Line on Hover anywhere */}
          {hoveredIndex !== null && (
            <line
              x1={getX(hoveredIndex)}
              y1={paddingY}
              x2={getX(hoveredIndex)}
              y2={chartHeight - paddingY}
              stroke="#818cf8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="transition-all duration-75"
            />
          )}

          {/* Data Points */}
          {activeData.map((d, i) => {
            const x = getX(i)
            const y1 = getY(d.value * progress)
            const y2 = getY(d.secondaryValue * progress)
            const isHovered = hoveredIndex === i

            return (
              <g key={i}>
                {/* Secondary curve dot */}
                <circle
                  cx={x}
                  cy={y2}
                  r={isHovered ? 3.5 : 2}
                  fill="#ffffff"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  className="transition-all duration-150"
                />

                {/* Primary curve dot */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y1}
                    r="8"
                    fill="#6366f1"
                    fillOpacity="0.18"
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={x}
                  cy={y1}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#ffffff"
                  stroke="#6366f1"
                  strokeWidth={isHovered ? 2.5 : 2}
                  className="transition-all duration-150"
                />

                {/* X Axis Label */}
                <text
                  x={x}
                  y={chartHeight - 4}
                  textAnchor="middle"
                  className={`text-[10px] font-normal transition-colors ${isHovered ? 'fill-primary-600 font-medium' : 'fill-slate-400'
                    }`}
                >
                  {d.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Hover Tooltip - Follows Crosshair Anywhere */}
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute -top-4 z-30 rounded-lg border border-slate-200 bg-white p-2.5 shadow-md text-xs transition-all duration-100 -translate-x-1/2"
            style={{
              left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
            }}
          >
            <div className="font-medium text-slate-800 border-b border-slate-100 pb-1 mb-1">
              {activeData[hoveredIndex].label}
            </div>
            <div className="space-y-0.5 text-[11px] font-normal">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                <span className="text-slate-500">Downlines:</span>
                <span className="font-medium text-slate-800">
                  {activeData[hoveredIndex].value}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span className="text-slate-500">Directs:</span>
                <span className="font-medium text-slate-800">
                  {activeData[hoveredIndex].secondaryValue}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
