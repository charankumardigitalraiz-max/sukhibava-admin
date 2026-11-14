import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface AppLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
  onNewAppointment?: () => void
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  onNewAppointment,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-50/60 text-slate-800 antialiased">
      {/* Sidebar (Fixed / Stays in place) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Container (Independent Scroll) */}
      <div className="flex flex-1 flex-col min-w-0 h-full overflow-y-auto custom-scrollbar">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onNewAppointment={onNewAppointment}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-7 lg:px-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
