import React from 'react'
import { Card } from '../components/common/Card'
import { Award, CheckCircle2, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { StatCardGrid, type StatItem } from '../components/common/StatCard'

export const RanksPage: React.FC = () => {
  const ranks = [
    {
      title: 'Distributor',
      tier: 'Level 1',
      personalPV: '100 PV',
      teamPV: '1,000 PV',
      binaryCap: '₹25,000 / week',
      unlocked: true,
      color: 'border-slate-200',
    },
    {
      title: 'Silver Director',
      tier: 'Level 2',
      personalPV: '300 PV',
      teamPV: '10,000 PV',
      binaryCap: '₹75,000 / week',
      unlocked: true,
      color: 'border-slate-300',
    },
    {
      title: 'Gold Executive',
      tier: 'Level 3',
      personalPV: '600 PV',
      teamPV: '50,000 PV',
      binaryCap: '₹1.50L / week',
      unlocked: true,
      color: 'border-amber-200',
    },
    {
      title: 'Platinum Leader',
      tier: 'Level 4',
      personalPV: '1,000 PV',
      teamPV: '2.00L PV',
      binaryCap: '₹3.00L / week',
      unlocked: true,
      color: 'border-sky-200',
    },
    {
      title: 'Diamond Leader',
      tier: 'Level 5',
      personalPV: '1,500 PV',
      teamPV: '5.00L PV',
      binaryCap: '₹6.00L / week',
      unlocked: true,
      color: 'border-primary-200',
    },
    {
      title: 'Crown Ambassador',
      tier: 'Level 6',
      personalPV: '2,500 PV',
      teamPV: '15.00L PV',
      binaryCap: '₹15.00L / week',
      unlocked: true,
      current: true,
      color: 'border-purple-200 ring-2 ring-purple-100',
    },
  ]

  const rankOverviewStats: StatItem[] = [
    {
      id: 'current_rank',
      title: 'Current Rank Level',
      value: '06',
      subtitle: 'Crown Ambassador (Level 6)',
      color: 'purple',
      icon: Award,
    },
    {
      id: 'weekly_capping',
      title: 'Weekly Binary Cap',
      value: '₹15,00,000',
      subtitle: 'Maximum weekly limit',
      color: 'emerald',
      icon: ShieldCheck,
    },
    {
      id: 'leadership_pool',
      title: 'Leadership Pool Share',
      value: '3.0%',
      subtitle: 'Global turnover profit share',
      color: 'primary',
      icon: Sparkles,
    },
    {
      id: 'top_qualifiers',
      title: 'Leadership Qualifiers',
      value: '248',
      subtitle: 'Diamond & above network',
      color: 'sky',
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium tracking-tight text-slate-800">
          Rank Progression & Rewards
        </h1>
        <p className="text-sm font-normal text-slate-500 mt-1">
          Compensation plan qualifications, binary capping limits, and leadership rewards
        </p>
      </div>

      {/* Rank Overview KPI Stats Grid */}
      <div className="animate-fade-up">
        <StatCardGrid stats={rankOverviewStats} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranks.map((r) => (
          <Card key={r.title} padding="lg" className={`relative flex flex-col justify-between ${r.color}`}>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <Award size={16} strokeWidth={1.75} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-normal text-slate-400">{r.tier}</span>
                  {r.current && (
                    <span className="rounded-full bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 text-[10px] font-medium">
                      Current Rank
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-medium text-slate-800">{r.title}</h3>
                <div className="text-xs text-primary-600 font-normal mt-0.5">
                  Cap: {r.binaryCap}
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs font-normal">
                <div className="flex justify-between text-slate-600">
                  <span>Personal PV Target:</span>
                  <span className="font-medium text-slate-800">{r.personalPV}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Organizational PV:</span>
                  <span className="font-medium text-slate-800">{r.teamPV}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-normal pt-2 border-t border-slate-100">
              <CheckCircle2 size={13} />
              <span>Qualified & Active</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

