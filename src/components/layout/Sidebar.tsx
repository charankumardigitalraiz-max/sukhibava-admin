import React from 'react'
import {
  LayoutDashboard,
  Users,
  Coins,
  Scale,
  CreditCard,
  Award,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronsUpDown,
  GitFork
} from 'lucide-react'
import { Avatar } from '../common/Avatar'

interface SidebarProps {
  activeTab: string
  setActiveTab: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
}) => {
  const mainNavigation = [
    { id: 'dashboard', label: 'Network Matrix', icon: LayoutDashboard },
    { id: 'genealogy', label: 'Genealogy Tree', icon: GitFork },
    { id: 'members', label: 'Downline Team', icon: Users, badge: '18k' },
    { id: 'commissions', label: 'Commission Logs', icon: Coins },
    { id: 'matching', label: 'Binary Balance', icon: Scale },
    { id: 'payouts', label: 'Payout Register', icon: CreditCard },
    { id: 'ranks', label: 'Rank Qualification', icon: Award },
  ]

  const secondaryNavigation = [
    { id: 'settings', label: 'Plan Settings', icon: Settings },
    { id: 'help', label: 'Compensation Docs', icon: HelpCircle },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.035)] transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-2.5 px-6 border-b border-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600">
            <Sparkles size={18} strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-sm font-medium tracking-tight text-slate-800">
              Sukhibava Direct
            </div>
            <div className="text-xs font-normal text-slate-400">
              MLM Network Matrix
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <div className="mb-2 px-3 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Network
          </div>
          <nav className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    onClose()
                  }}
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-normal transition-colors cursor-pointer ${isActive
                    ? 'bg-primary-500 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      strokeWidth={1.75}
                      className={
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                      }
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`flex h-4 min-w-4 items-center justify-center rounded-full  px-1.5 text-[10px] font-normal ${isActive ? 'text-white' : 'text-primary-600'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          <div className="mt-6 mb-2 px-3 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            System
          </div>
          <nav className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    onClose()
                  }}
                  className={`group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-normal transition-colors cursor-pointer ${isActive
                    ? 'bg-primary-500 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.75}
                    className="text-slate-400 group-hover:text-slate-600"
                  />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* User Profile in Footer */}
        <div className="p-3 border-t border-slate-200/70">
          <div className="flex items-center justify-between rounded-xl p-2 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name="Sanjay Rao" size="md" status="online" />
              <div className="min-w-0 text-left">
                <div className="text-sm font-medium text-slate-800 leading-tight truncate">
                  Dr. Sanjay Rao
                </div>
                <div className="text-xs font-normal text-amber-600 leading-tight mt-0.5 truncate">
                  Crown Ambassador
                </div>
              </div>
            </div>
            <ChevronsUpDown size={15} className="text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
          </div>
        </div>
      </aside>
    </>
  )
}
