import React from 'react'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Sliders, GitFork } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-medium tracking-tight text-slate-800">
          MLM Compensation Configuration
        </h1>
        <p className="text-sm font-normal text-slate-500 mt-1">
          Binary tree matching rules, referral incentives, and payout policies
        </p>
      </div>

      <div className="space-y-4">
        {/* Binary Engine Rules */}
        <Card padding="lg">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <GitFork size={16} className="text-primary-600" />
            <h3 className="text-sm font-medium text-slate-800">
              Binary Engine Rules
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4 text-xs font-normal">
            <div>
              <label className="block text-slate-600 mb-1">Pair Matching Ratio</label>
              <select className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary-400 focus:outline-none">
                <option>1:1 Balanced Matching</option>
                <option>2:1 or 1:2 Matching</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Default Placement Preference</label>
              <select className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary-400 focus:outline-none">
                <option>Auto Balance (Weaker Leg First)</option>
                <option>Extreme Left Leg</option>
                <option>Extreme Right Leg</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Binary Match Payout Rate</label>
              <input
                type="text"
                defaultValue="10% on Matched BV"
                className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Direct Sponsor Commission</label>
              <input
                type="text"
                defaultValue="15% First Order BV"
                className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary-400 focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Payout Policies */}
        <Card padding="lg">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Sliders size={16} className="text-primary-600" />
            <h3 className="text-sm font-medium text-slate-800">
              Disbursement & Statutory Deductions
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4 text-xs font-normal">
            <div>
              <label className="block text-slate-600 mb-1">Minimum Withdrawal Limit</label>
              <input
                type="text"
                defaultValue="₹1,000"
                className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Mandatory TDS Rate (with PAN)</label>
              <input
                type="text"
                defaultValue="5.00%"
                className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-700 focus:border-primary-400 focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Save button */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm">
            Reset
          </Button>
          <Button variant="primary" size="sm">
            Save MLM Parameters
          </Button>
        </div>
      </div>
    </div>
  )
}
