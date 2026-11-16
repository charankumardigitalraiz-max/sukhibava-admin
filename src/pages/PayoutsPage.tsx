import React from 'react'
import { Download, ArrowUpRight, CheckCircle2, Landmark, Clock } from 'lucide-react'
import { payoutTransactionsList } from '../data/mockData'
import type { PayoutTransaction } from '../types/dashboard'
import { DataTable, type Column } from '../components/common/DataTable'
import { Button } from '../components/common/Button'
import { StatCardGrid, type StatItem } from '../components/common/StatCard'

export const PayoutsPage: React.FC = () => {
  const columns: Column<PayoutTransaction>[] = [
    {
      key: 'id',
      header: 'Transaction ID',
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs font-normal text-slate-600 bg-slate-100/80 border border-slate-200/80 px-2 py-1 rounded-md">
          {item.id}
        </span>
      ),
    },
    {
      key: 'memberName',
      header: 'Partner Name',
      sortable: true,
      render: (item) => (
        <div>
          <div className="text-sm font-medium text-slate-800 leading-snug">{item.memberName}</div>
          <div className="text-xs font-mono text-slate-500 leading-snug mt-0.5">{item.memberId}</div>
        </div>
      ),
    },
    {
      key: 'method',
      header: 'Withdrawal Mode',
      sortable: true,
      render: (item) => (
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-normal text-slate-700 border border-slate-200/60">
          {item.method}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Settlement Date',
      sortable: true,
      render: (item) => <span className="text-[13px] text-slate-600 tabular-nums">{item.date}</span>,
    },
    {
      key: 'grossAmount',
      header: 'Gross Amount',
      sortable: true,
      render: (item) => <span className="text-[13px] font-medium text-slate-700 tabular-nums">{item.grossAmount}</span>,
    },
    {
      key: 'tdsDeduction',
      header: 'TDS (5%)',
      render: (item) => <span className="text-[13px] font-normal text-rose-600 tabular-nums">-{item.tdsDeduction}</span>,
    },
    {
      key: 'netPayout',
      header: 'Net Disbursed',
      sortable: true,
      render: (item) => (
        <span className="text-[13px] font-medium text-emerald-600 tabular-nums">{item.netPayout}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => {
        const colors = {
          Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
          Pending: 'bg-amber-50 text-amber-700 border-amber-200/70',
          Rejected: 'bg-rose-50 text-rose-700 border-rose-200/70',
        }
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-normal ${colors[item.status]
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${item.status === 'Completed'
                ? 'bg-emerald-500'
                : item.status === 'Pending'
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
                }`}
            />
            {item.status}
          </span>
        )
      },
    },
  ]

  const filterTabs = [
    { label: 'All Transfers', filterFn: () => true },
    { label: 'Completed', filterFn: (p: PayoutTransaction) => p.status === 'Completed' },
    { label: 'Pending Payout', filterFn: (p: PayoutTransaction) => p.status === 'Pending' },
  ]

  const payoutStats: StatItem[] = [
    {
      id: 'gross_disbursed',
      title: 'Gross Disbursed',
      value: '₹12,45,000',
      subtitle: 'Requested payout volume',
      change: '',
      isPositive: true,
      color: 'primary',
      icon: ArrowUpRight,
    },
    {
      id: 'net_settled',
      title: 'Net Settled',
      value: '₹11,82,750',
      subtitle: 'Bank accounts credited',
      change: '',
      isPositive: true,
      color: 'emerald',
      icon: CheckCircle2,
    },
    {
      id: 'tds_deduction',
      title: 'Statutory TDS (5%)',
      value: '₹62,250',
      subtitle: 'Govt challan deposit',
      change: '',
      isPositive: true,
      color: 'rose',
      icon: Landmark,
    },
    {
      id: 'pending_batch',
      title: 'Pending Settlements',
      value: '₹74,500',
      subtitle: 'Queued for NEFT/IMPS',
      change: '',
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
            Payout Settlements
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Bank transfers, IMPS/UPI settlements, and statutory TDS records
          </p>
        </div>

        <Button size="sm" variant="primary" icon={<Download size={14} />}>
          Export Settlement CSV
        </Button>
      </div>

      {/* Payout KPI Stats Grid */}
      <div className="animate-fade-up">
        <StatCardGrid stats={payoutStats} />
      </div>

      <DataTable<PayoutTransaction>
        title="Disbursement Register"
        data={payoutTransactionsList}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search transaction ID, partner name, mode..."
        searchKeys={['id', 'memberName', 'memberId', 'method']}
        filterTabs={filterTabs}
        pageSize={6}
      />
    </div>
  )
}

