import React, { useState, useEffect } from 'react'
import {
  Menu,
  Bell,
  ChevronDown,
} from 'lucide-react'
import { Avatar } from '../common/Avatar'

interface HeaderProps {
  onToggleSidebar: () => void
  onNewAppointment?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left: Mobile Toggle & Live Real-Time Date/Time */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100/80 transition-colors lg:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu size={19} strokeWidth={1.75} />
        </button>

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
        >
          <Bell size={16} strokeWidth={1.75} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary-500 ring-2 ring-white" />
        </button>

        <div className="h-5 w-px bg-slate-200/80 mx-0.5" />

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 rounded-lg bg-white py-1 pr-2 pl-1 hover:bg-slate-50/60 transition-colors cursor-pointer">
          <Avatar name="Sanjay Rao" size="md" status="online" />
          <div className="hidden text-left sm:block">
            <div className="text-sm font-medium text-slate-800 leading-snug">
              Dr. Sanjay Rao
            </div>
            <div className="text-[12px] font-normal text-amber-600 leading-snug">
              Crown Ambassador
            </div>
          </div>
          <ChevronDown size={14} strokeWidth={1.75} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  )
}
