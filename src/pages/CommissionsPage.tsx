import React from 'react'
import { Download, Coins, Wallet, GitBranch, UserPlus, Clock } from 'lucide-react'
import { commissionRecordsList } from '../data/mockData'
import type { CommissionRecord } from '../types/dashboard'
import { DataTable, type Column } from '../components/common/DataTable'
import { Button } from '../components/common/Button'
import { StatCardGrid, type StatItem } from '../components/common/StatCard'

export const CommissionsPage: React.FC = () => {
  const columns: Column<CommissionRecord>[] = [
    {
      key: 'id',
      header: 'Entry ID',
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs font-normal text-slate-600 bg-slate-100/80 border border-slate-200/80 px-2 py-1 rounded-md">
          {item.id}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Income Stream',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 border border-primary-100/80 text-primary-600">
            <Coins size={14} />
          </div>
          <span className="text-sm font-medium text-slate-800">{item.type}</span>
        </div>
      ),
    },
    {
      key: 'memberName',
      header: 'Beneficiary',
      sortable: true,
      render: (item) => (
        <div>
          <div className="text-[13px] font-normal text-slate-800 leading-snug">{item.memberName}</div>
          <div className="text-xs font-mono text-slate-500 leading-snug mt-0.5">{item.memberId}</div>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Cycle Date',
      sortable: true,
      render: (item) => <span className="text-[13px] text-slate-600 tabular-nums">{item.date}</span>,
    },
    {
      key: 'points',
      header: 'BV Points',
      sortable: true,
      render: (item) => (
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 tabular-nums">
          {item.points.toLocaleString()} BV
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Credit Payout',
      sortable: true,
      render: (item) => (
        <span className="text-[13px] font-medium text-emerald-600 tabular-nums">{item.amount}</span>
      ),
    },
    {
      key: 'status',
      header: 'Wallet Status',
      sortable: true,
      render: (item) => {
        const colors = {
          Credited: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
          Processing: 'bg-amber-50 text-amber-700 border-amber-200/70',
          Held: 'bg-slate-100 text-slate-600 border-slate-200',
        }
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-normal ${
              colors[item.status]
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                item.status === 'Credited'
                  ? 'bg-emerald-500'
                  : item.status === 'Processing'
                  ? 'bg-amber-500'
                  : 'bg-slate-400'
              }`}
            />
            {item.status}
          </span>
        )
      },
    },
  ]

  const filterTabs = [
    { label: 'All Streams', filterFn: () => true },
    { label: 'Binary Matching', filterFn: (c: CommissionRecord) => c.type === 'Binary Pair Match' },
    { label: 'Direct Referral', filterFn: (c: CommissionRecord) => c.type === 'Direct Referral' },
    { label: 'Leadership Pool', filterFn: (c: CommissionRecord) => c.type === 'Leadership Pool' },
    { label: 'Rank Bonus', filterFn: (c: CommissionRecord) => c.type === 'Rank Bonus' },
  ]

  const commissionStats: StatItem[] = [
    {
      id: 'total_commissions',
      title: 'Total Disbursed',
      value: '₹14,85,600',
      subtitle: 'Disbursed to wallets',
      change: '+14.2%',
      isPositive: true,
      color: 'emerald',
      icon: Wallet,
    },
    {
      id: 'binary_matching',
      title: 'Binary Pair Matches',
      value: '₹8,42,000',
      subtitle: '1:1 paired volume',
      change: '+11.5%',
      isPositive: true,
      color: 'primary',
      icon: GitBranch,
    },
    {
      id: 'direct_referral',
      title: 'Direct Referrals',
      value: '₹4,25,400',
      subtitle: 'First-order sponsor',
      change: '+18.9%',
      isPositive: true,
      color: 'sky',
      icon: UserPlus,
    },
    {
      id: 'pending_cycle',
      title: 'Cycle Queue',
      value: '₹2,18,200',
      subtitle: 'Locks at 23:59:59 IST',
      change: 'Active',
      isPositive: true,
      color: 'amber',
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-slate-800">
            Commission Ledger
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Real-time direct referral bonuses, binary matching pairs, and leadership distribution
          </p>
        </div>

        <Button size="sm" variant="secondary" icon={<Download size={14} />}>
          Export Commission Sheet
        </Button>
      </div>

      {/* Commission KPI Stats Grid */}
      <div className="animate-fade-up">
        <StatCardGrid stats={commissionStats} />
      </div>

      <DataTable<CommissionRecord>
        title="Compensation Log"
        data={commissionRecordsList}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search entry ID, beneficiary, stream..."
        searchKeys={['id', 'memberName', 'memberId', 'type']}
        filterTabs={filterTabs}
        pageSize={6}
      />
    </div>
  )
}

