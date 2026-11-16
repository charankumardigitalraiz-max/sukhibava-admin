import React, { useState } from 'react'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Sliders, GitFork, Check } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const [matchingRatio, setMatchingRatio] = useState('1:1 Balanced Matching')
  const [placementPref, setPlacementPref] = useState('Auto Balance (Weaker Leg First)')
  const [matchPayoutRate, setMatchPayoutRate] = useState('10.00%')
  const [directBonus, setDirectBonus] = useState('15.00%')

  const [minWithdrawal, setMinWithdrawal] = useState('₹1,000')
  const [tdsRate, setTdsRate] = useState('5.00%')
  const [cycleSchedule, setCycleSchedule] = useState('Weekly (Every Monday Midnight)')
  const [autoApprovalLimit, setAutoApprovalLimit] = useState('₹50,000')

  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleReset = () => {
    setMatchingRatio('1:1 Balanced Matching')
    setPlacementPref('Auto Balance (Weaker Leg First)')
    setMatchPayoutRate('10.00%')
    setDirectBonus('15.00%')
    setMinWithdrawal('₹1,000')
    setTdsRate('5.00%')
    setCycleSchedule('Weekly (Every Monday Midnight)')
    setAutoApprovalLimit('₹50,000')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-slate-800">
            Compensation & Plan Settings
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Binary matching rules, placement preferences, and payout policies
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset Defaults
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            icon={isSaved ? <Check size={14} /> : undefined}
          >
            {isSaved ? 'Settings Saved' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {/* Grid of Settings Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Binary Engine Rules */}
        <Card padding="lg" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600">
                <GitFork size={16} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-800">
                  Binary Engine Rules
                </h3>
                <p className="text-xs font-normal text-slate-500 mt-0.5">
                  Pair matching logic and referral incentives
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 pt-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Pair Matching Ratio
                </label>
                <select
                  value={matchingRatio}
                  onChange={(e) => setMatchingRatio(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all cursor-pointer"
                >
                  <option>1:1 Balanced Matching</option>
                  <option>2:1 or 1:2 Matching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Default Placement Preference
                </label>
                <select
                  value={placementPref}
                  onChange={(e) => setPlacementPref(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all cursor-pointer"
                >
                  <option>Auto Balance (Weaker Leg First)</option>
                  <option>Extreme Left Leg</option>
                  <option>Extreme Right Leg</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Binary Match Payout Rate
                </label>
                <input
                  type="text"
                  value={matchPayoutRate}
                  onChange={(e) => setMatchPayoutRate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Direct Sponsor Commission
                </label>
                <input
                  type="text"
                  value={directBonus}
                  onChange={(e) => setDirectBonus(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all tabular-nums"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Payout Policies */}
        <Card padding="lg" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                <Sliders size={16} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-800">
                  Disbursement & Statutory Deductions
                </h3>
                <p className="text-xs font-normal text-slate-500 mt-0.5">
                  Threshold limits, tax compliance, and settlement cycle
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 pt-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Minimum Withdrawal Limit
                </label>
                <input
                  type="text"
                  value={minWithdrawal}
                  onChange={(e) => setMinWithdrawal(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Mandatory TDS Rate (with PAN)
                </label>
                <input
                  type="text"
                  value={tdsRate}
                  onChange={(e) => setTdsRate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Settlement Cycle Schedule
                </label>
                <select
                  value={cycleSchedule}
                  onChange={(e) => setCycleSchedule(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all cursor-pointer"
                >
                  <option>Weekly (Every Monday Midnight)</option>
                  <option>Daily Auto-Settlement</option>
                  <option>Bi-Weekly Cycle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Auto-Approval Threshold
                </label>
                <input
                  type="text"
                  value={autoApprovalLimit}
                  onChange={(e) => setAutoApprovalLimit(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-2xs hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all tabular-nums"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
