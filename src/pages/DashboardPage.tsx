import React, { useState } from 'react'
import {
  Download,
  Sparkles,
} from 'lucide-react'
import {
  summaryMetrics,
  weeklyTrends,
  monthlyTrends,
  incomeStreams,
  commissionBarTrends,
  hourlyTraffic,
} from '../data/mockData'
import { StatCards } from '../components/dashboard/StatCards'
import { AnalyticsChart } from '../components/dashboard/AnalyticsChart'
import { DistributionChart } from '../components/dashboard/DistributionChart'
import { RevenueBarChart } from '../components/dashboard/RevenueBarChart'
import { HourlyTrafficBarChart } from '../components/dashboard/HourlyTrafficBarChart'
import { Button } from '../components/common/Button'

export const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week')

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-up">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium tracking-tight text-slate-800">
            Network Performance & Volume
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-normal text-emerald-700 border border-emerald-100">
            <Sparkles size={11} />
            Binary Live
          </span>
        </div>

        {/* Filters and Export Button */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex rounded-lg border border-slate-200/80 bg-white p-0.5 text-xs font-normal text-slate-600 shadow-xs">
            <button
              onClick={() => setTimeRange('today')}
              className={`rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${timeRange === 'today'
                ? 'bg-slate-100 text-slate-900 font-medium'
                : 'hover:text-slate-900'
                }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${timeRange === 'week'
                ? 'bg-slate-100 text-slate-900 font-medium'
                : 'hover:text-slate-900'
                }`}
            >
              This Cycle
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${timeRange === 'month'
                ? 'bg-slate-100 text-slate-900 font-medium'
                : 'hover:text-slate-900'
                }`}
            >
              Monthly Rank
            </button>
          </div>

          <Button
            size="sm"
            variant="secondary"
            icon={<Download size={14} strokeWidth={1.75} />}
          >
            Export Ledger
          </Button>
        </div>
      </div>

      {/* 1. Sparkline Metric Cards - Staggered Entry */}
      <div className="animate-fade-up">
        <StatCards metrics={summaryMetrics} />
      </div>

      {/* 2. Primary Graphs Grid - Animated Crosshairs & Tooltips */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-fade-up-delay-1">
        <div className="lg:col-span-2">
          <AnalyticsChart
            weeklyData={weeklyTrends}
            monthlyData={monthlyTrends}
          />
        </div>
        <div>
          <HourlyTrafficBarChart data={hourlyTraffic} />
        </div>
      </div>

      {/* 3. Secondary Analytics Grid - Balanced Brick Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-fade-up-delay-2">
        <div>
          <RevenueBarChart data={commissionBarTrends} />
        </div>
        <div className="lg:col-span-2">
          <DistributionChart data={incomeStreams} />
        </div>
      </div>
    </div>
  )
}
