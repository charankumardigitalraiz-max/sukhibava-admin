import React, { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { GenealogyPage } from './pages/GenealogyPage'
import { MembersPage } from './pages/MembersPage'
import { CommissionsPage } from './pages/CommissionsPage'
import { PayoutsPage } from './pages/PayoutsPage'
import { RanksPage } from './pages/RanksPage'
import { SettingsPage } from './pages/SettingsPage'
import { Button } from './components/common/Button'
import { UserPlus, X } from 'lucide-react'

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'matching':
        return <DashboardPage />
      case 'genealogy':
        return <GenealogyPage />
      case 'members':
        return <MembersPage />
      case 'commissions':
        return <CommissionsPage />
      case 'payouts':
        return <PayoutsPage />
      case 'ranks':
        return <RanksPage />
      case 'settings':
      case 'help':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <AppLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onNewAppointment={() => setIsModalOpen(true)}
    >
      {renderActivePage()}

      {/* New Partner Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-50 text-primary-600">
                  <UserPlus size={14} />
                </div>
                <h3 className="text-sm font-medium text-slate-800">
                  Register Direct Partner
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3.5 py-4 text-xs font-normal">
              <div>
                <label className="block text-slate-600 mb-1">Partner Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Seth"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-primary-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1">Placement Leg</label>
                  <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-primary-400 focus:outline-none bg-white text-slate-700">
                    <option>Auto (Weaker Leg)</option>
                    <option>Left Leg</option>
                    <option>Right Leg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Package BV</label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-primary-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsModalOpen(false)}
              >
                Enroll Partner
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

export default App
