import React from 'react'
import {
  LayoutDashboard,
  Users,
  Coins,
  CreditCard,
  Award,
  Settings,
  HelpCircle,
  Sparkles,
  GitFork,
  X,
} from 'lucide-react'

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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'genealogy', label: 'Team Tree', icon: GitFork },
    { id: 'members', label: 'Members', icon: Users, badge: '18k' },
    { id: 'commissions', label: 'Commissions', icon: Coins },
    { id: 'payouts', label: 'Payouts', icon: CreditCard },
    { id: 'ranks', label: 'Ranks & Rewards', icon: Award },
  ]

  const secondaryNavigation = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Docs', icon: HelpCircle },
  ]

  const handleNavClick = (id: string) => {
    setActiveTab(id)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose()
    }
  }

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
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.035)] transition-all duration-300 ease-in-out lg:static lg:h-screen lg:shrink-0 ${
          isOpen
            ? 'w-64 translate-x-0'
            : '-translate-x-full lg:w-0 lg:overflow-hidden lg:border-none'
        }`}
      >
        {/* Brand Header with Close Button */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600 shrink-0">
              <Sparkles size={18} strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium tracking-tight text-slate-800 truncate">
                Sukhibava Direct
              </div>
              <div className="text-xs font-normal text-slate-400 truncate">
                Admin Portal
              </div>
            </div>
          </div>

          {/* Close Sidebar Button */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
            aria-label="Close Sidebar"
            title="Close Sidebar"
          >
            <X size={17} strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
          <div className="mb-2 px-3 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
            Menu
          </div>
          <nav className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-normal transition-colors cursor-pointer ${
                    isActive
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
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/80'
                      }`}
                    >
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
                  onClick={() => handleNavClick(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-normal transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary-500 text-white font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.75}
                    className={
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                    }
                  />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
