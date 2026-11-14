import React, { useState } from 'react'
import { UserPlus, Eye, X, ShieldCheck, Users, UserCheck, GitBranch, ArrowLeftRight } from 'lucide-react'
import { networkMembersList } from '../data/mockData'
import type { NetworkMember } from '../types/dashboard'
import { DataTable, type Column } from '../components/common/DataTable'
import { Button } from '../components/common/Button'
import { Avatar } from '../components/common/Avatar'
import { StatCardGrid, type StatItem } from '../components/common/StatCard'

export const MembersPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<NetworkMember | null>(null)
  const columns: Column<NetworkMember>[] = [
    {
      key: 'id',
      header: 'Member ID',
      sortable: true,
      className: 'w-32',
      render: (item) => (
        <span className="font-semibold text-xs font-normal text-slate-600  px-2 py-1 rounded-md">
          {item.id}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Partner Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar name={item.name} size="sm" />
          <div>
            <div className="text-sm font-medium text-slate-800 leading-snug">{item.name}</div>
            <div className="text-xs font-normal text-slate-500 leading-snug mt-0.5">Joined {item.joinDate}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'sponsorName',
      header: 'Direct Sponsor',
      sortable: true,
      render: (item) => (
        <div>
          <div className="text-[13px] font-normal text-slate-700 leading-snug">{item.sponsorName}</div>
          <div className="text-xs font-mono text-slate-500 leading-snug mt-0.5">{item.sponsorId}</div>
        </div>
      ),
    },
    // {
    //   key: 'placementLeg',
    //   header: 'Binary Leg',
    //   sortable: true,
    //   render: (item) => (
    //     <span
    //       className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-normal ${item.placementLeg === 'Left'
    //         ? 'bg-primary-50 text-primary-700 border border-primary-200/80'
    //         : 'bg-sky-50 text-sky-700 border border-sky-200/80'
    //         }`}
    //     >
    //       {item.placementLeg} Leg
    //     </span>
    //   ),
    // },
    {
      key: 'rank',
      header: 'Current Rank',
      sortable: true,
      render: (item) => {
        const rankColors: Record<string, string> = {
          Diamond: 'bg-primary-50 text-primary-700 border-primary-200/80',
          Platinum: 'bg-sky-50 text-sky-700 border-sky-200/80',
          Gold: 'bg-amber-50 text-amber-700 border-amber-200/80',
          Silver: 'bg-slate-100 text-slate-700 border-slate-200',
          Distributor: 'bg-slate-50 text-slate-600 border-slate-200/80',
        }
        return (
          <span
            className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-normal ${rankColors[item.rank] || 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
          >
            {item.rank}
          </span>
        )
      },
    },
    {
      key: 'personalBV',
      header: 'Personal BV',
      sortable: true,
      render: (item) => (
        <span className="text-[13px] font-medium text-slate-700 tabular-nums">
          {item.personalBV.toLocaleString()} BV
        </span>
      ),
    },
    {
      key: 'teamBV',
      header: 'Team BV',
      sortable: true,
      render: (item) => (
        <span className="text-[13px] font-medium text-primary-600 tabular-nums">
          {(item.teamBV / 1000).toFixed(1)}k BV
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => {
        const colors = {
          Active: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
          'Grace Period': 'bg-amber-50 text-amber-700 border-amber-200/70',
          Inactive: 'bg-rose-50 text-rose-700 border-rose-200/70',
        }
        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-normal ${colors[item.status]
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${item.status === 'Active'
                ? 'bg-emerald-500'
                : item.status === 'Grace Period'
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
                }`}
            />
            {item.status}
          </span>
        )
      },
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      render: (item) => (
        <button
          onClick={() => setSelectedMember(item)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50/80 border border-primary-100 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all cursor-pointer shadow-2xs"
          title={`View ${item.name}`}
          aria-label="View Partner"
        >
          <Eye size={15} strokeWidth={1.75} />
        </button>
      ),
    },
  ]

  const memberStats: StatItem[] = [
    {
      id: 'total_team',
      title: 'Total Downline',
      value: '18,492',
      subtitle: 'Registered network',
      change: '+12.4%',
      isPositive: true,
      color: 'primary',
      icon: Users,
    },
    {
      id: 'active_partners',
      title: 'Active Qualifiers',
      value: '16,140',
      subtitle: '87.3% active ratio',
      change: '+8.1%',
      isPositive: true,
      color: 'emerald',
      icon: UserCheck,
    },
    {
      id: 'left_leg',
      title: 'Left Leg Team',
      value: '9,640',
      subtitle: '52.1% distribution',
      change: '+5.2%',
      isPositive: true,
      color: 'sky',
      icon: GitBranch,
    },
    {
      id: 'right_leg',
      title: 'Right Leg Team',
      value: '8,852',
      subtitle: '47.9% distribution',
      change: '+6.8%',
      isPositive: true,
      color: 'amber',
      icon: ArrowLeftRight,
    },
  ]

  const filterTabs = [
    { label: 'All Partners', filterFn: () => true },
    { label: 'Left Leg', filterFn: (m: NetworkMember) => m.placementLeg === 'Left' },
    { label: 'Right Leg', filterFn: (m: NetworkMember) => m.placementLeg === 'Right' },
    { label: 'Active Only', filterFn: (m: NetworkMember) => m.status === 'Active' },
    { label: 'Grace Period', filterFn: (m: NetworkMember) => m.status === 'Grace Period' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-slate-800">
            Downline Network Team
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Active distributors, placement positions, personal and organizational volume
          </p>
        </div>

        <Button size="sm" variant="primary" icon={<UserPlus size={14} />}>
          Register Partner
        </Button>
      </div>

      {/* Network Team KPI Stats Grid - Global Line-style StatCard */}
      <div className="animate-fade-up">
        <StatCardGrid stats={memberStats} />
      </div>

      <DataTable<NetworkMember>
        title=""
        data={networkMembersList}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search member ID, partner name, sponsor..."
        searchKeys={['id', 'name', 'sponsorName', 'rank']}
        filterTabs={filterTabs}
        pageSize={10}
      />

      {/* Partner Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedMember(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl animate-fade-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600">
                  <ShieldCheck size={16} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-base font-medium text-slate-800">
                    Distributor Profile
                  </h3>
                  <p className="text-xs font-normal text-slate-500">
                    Downline network positioning & volume credentials
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {/* Profile Summary Card */}
            <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
              <div className="flex items-center gap-3.5">
                <Avatar name={selectedMember.name} size="lg" status="online" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-medium text-slate-900 truncate">
                      {selectedMember.name}
                    </h4>
                    <span className="font-mono text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {selectedMember.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="text-amber-600 font-medium">{selectedMember.rank}</span>
                    <span>•</span>
                    <span>Joined {selectedMember.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5">
                <span className="text-xs font-normal text-slate-500">Personal BV</span>
                <div className="mt-1 text-base font-medium text-slate-800 tabular-nums">
                  {selectedMember.personalBV.toLocaleString()} BV
                </div>
                <div className="mt-0.5 text-[11px] text-emerald-600 font-normal">Active self volume</div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5">
                <span className="text-xs font-normal text-slate-500">Team BV</span>
                <div className="mt-1 text-base font-medium text-primary-600 tabular-nums">
                  {selectedMember.teamBV.toLocaleString()} BV
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 font-normal">Organizational volume</div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5">
                <span className="text-xs font-normal text-slate-500">Placement Leg</span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-normal ${selectedMember.placementLeg === 'Left'
                      ? 'bg-primary-50 text-primary-700 border border-primary-200/80'
                      : 'bg-sky-50 text-sky-700 border border-sky-200/80'
                      }`}
                  >
                    {selectedMember.placementLeg} Leg
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 font-normal">Binary node assignment</div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3.5">
                <span className="text-xs font-normal text-slate-500">Account Status</span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-normal ${selectedMember.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
                      : selectedMember.status === 'Grace Period'
                        ? 'bg-amber-50 text-amber-700 border-amber-200/70'
                        : 'bg-rose-50 text-rose-700 border-rose-200/70'
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${selectedMember.status === 'Active'
                        ? 'bg-emerald-500'
                        : selectedMember.status === 'Grace Period'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                        }`}
                    />
                    {selectedMember.status}
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 font-normal">Commission eligible</div>
              </div>
            </div>

            {/* Sponsor Hierarchy Information */}
            <div className="mt-4 rounded-xl border border-slate-200/80 bg-white p-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-normal">Direct Sponsor / Referrer</span>
                <span className="font-mono text-slate-500">{selectedMember.sponsorId}</span>
              </div>
              <div className="mt-1 text-sm font-medium text-slate-800">
                {selectedMember.sponsorName}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

