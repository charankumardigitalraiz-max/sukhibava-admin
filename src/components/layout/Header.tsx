import React, { useState, useEffect, useRef } from 'react'
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react'
import { Avatar } from '../common/Avatar'

interface HeaderProps {
  onToggleSidebar: () => void
  onNewAppointment?: () => void
  onNavigate?: (tab: string) => void
  isProfileView?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onNavigate,
  isProfileView,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date())
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  const handleSelectOption = (tab: string) => {
    setIsMenuOpen(false)
    if (onNavigate) {
      onNavigate(tab)
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left: Sidebar Toggle & Live Real-Time Date/Time */}
      <div className="flex items-center gap-3">
        {!isProfileView && (
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100/80 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <Menu size={19} strokeWidth={1.75} />
          </button>
        )}

        {/* Live Real-Time Clock & Date */}
        <div className="hidden sm:flex flex-col text-left">
          <div className="text-[15px] font-medium text-slate-800 leading-snug">
            {formattedDate}
          </div>
          <div className="font-mono text-sm font-normal text-slate-600 tracking-tight leading-snug tabular-nums">
            {formattedTime}
          </div>
        </div>
      </div>

      {/* Right: Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/60 bg-white text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Notifications"
          onClick={() => alert('All recent notifications are up to date.')}
        >
          <Bell size={16} strokeWidth={1.75} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary-500 ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-slate-200/80 mx-0.5" />

        {/* User Profile Dropdown Trigger */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-lg bg-white py-1 pr-2.5 pl-1.5 hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200/80 group text-left"
            aria-label="User Profile Menu"
            aria-expanded={isMenuOpen}
          >
            <Avatar name="Sanjay Rao" size="md" status="online" />
            <div className="hidden text-left sm:block">
              <div className="text-sm font-medium text-slate-800 leading-snug group-hover:text-primary-600 transition-colors">
                Dr. Sanjay Rao
              </div>
              <div className="text-[12px] font-normal text-amber-600 leading-snug">
                Crown Ambassador
              </div>
            </div>
            <ChevronDown
              size={14}
              strokeWidth={1.75}
              className={`text-slate-400 hidden sm:block transition-transform duration-200 ${
                isMenuOpen ? 'rotate-180 text-slate-600' : 'group-hover:text-slate-600'
              }`}
            />
          </button>

          {/* Quick Dropdown Options: Profile & Settings */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-xl z-50 animate-fade-up">
              {/* User Header Summary */}
              <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-slate-100 mb-1">
                <Avatar name="Sanjay Rao" size="sm" status="online" />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-slate-800 leading-snug truncate">
                    Dr. Sanjay Rao
                  </div>
                  <div className="text-[11px] font-normal text-slate-500 truncate">
                    sanjay.rao@sukhibava.org
                  </div>
                </div>
              </div>

              {/* Profile Option */}
              <button
                onClick={() => handleSelectOption('profile')}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                <User size={15} className="text-slate-500" />
                <span>Profile</span>
              </button>

              {/* Settings Option */}
              <button
                onClick={() => handleSelectOption('settings')}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 transition-colors cursor-pointer text-left"
              >
                <Settings size={15} className="text-slate-500" />
                <span>Settings</span>
              </button>

              <div className="my-1 border-t border-slate-100" />

              {/* Sign Out Option */}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  alert('Signed out successfully.')
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-normal text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
