import React, { useState } from 'react'
import { Card } from '../components/common/Card'
import { Avatar } from '../components/common/Avatar'
import { Button } from '../components/common/Button'
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GitFork,
  CreditCard,
  Copy,
  Check,
  ArrowLeft,
  Lock,
  KeyRound,
  Shield,
  Smartphone,
  Bell,
  Eye,
  EyeOff,
  Save,
  Globe,
} from 'lucide-react'

interface ProfilePageProps {
  onBack?: () => void
}

type ProfileSectionTab = 'personal' | 'security' | 'network' | 'banking' | 'notifications'

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<ProfileSectionTab>('security')
  const [copiedId, setCopiedId] = useState(false)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null)

  // Personal Info state
  const [fullName, setFullName] = useState('Dr. Sanjay Rao')
  const [email, setEmail] = useState('sanjay.rao@sukhibava.org')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [city, setCity] = useState('Hyderabad, Telangana, India')
  const [profileSaved, setProfileSaved] = useState(false)

  // Notifications state
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  const handleCopyId = () => {
    navigator.clipboard.writeText('SB-90821')
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword) {
      setPasswordFeedback('Please enter your current password.')
      return
    }
    if (newPassword.length < 8) {
      setPasswordFeedback('New password must be at least 8 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback('New password and confirmation do not match.')
      return
    }

    setPasswordFeedback('Password updated successfully!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setPasswordFeedback(null), 3000)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const sectionTabs = [
    {
      id: 'personal' as ProfileSectionTab,
      label: 'Personal Information',
      desc: 'Name, email, mobile & address',
      icon: User,
    },
    {
      id: 'security' as ProfileSectionTab,
      label: 'Security & Password',
      desc: 'Change password & 2FA protection',
      icon: Shield,
    },
    {
      id: 'network' as ProfileSectionTab,
      label: 'Network Placement',
      desc: 'Binary position & sponsor tree',
      icon: GitFork,
    },
    {
      id: 'banking' as ProfileSectionTab,
      label: 'Banking & KYC',
      desc: 'PAN card, bank account & tax',
      icon: CreditCard,
    },
    {
      id: 'notifications' as ProfileSectionTab,
      label: 'Notifications',
      desc: 'Payout alerts & communications',
      icon: Bell,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Top Header & Back Navigation */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-2.5 py-1.5 text-xs font-normal text-slate-600 hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700 transition-colors cursor-pointer shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>
        )}
        <div className="h-4 w-px bg-slate-200 shrink-0" />
        <div className="min-w-0">
          <h1 className="text-base font-medium text-slate-800 leading-tight">
            My Profile
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Manage your personal credentials, password, and executive account settings.
          </p>
        </div>
      </div>

      {/* Main Tabs Layout: Left Vertical Tabs (Sticky) + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Section Navigation Tabs (Stays in place on scroll) */}
        <div className="lg:col-span-1">
          < div className="lg:sticky lg:top-6">
            <Card padding="sm" className="p-1.5 space-y-1">
              <div className="px-3 py-2 text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                Profile Sections
              </div>
              {sectionTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeSection === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${isActive
                      ? 'bg-primary-50/80 text-primary-700 font-medium border border-primary-200/80'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? 'text-primary-600' : 'text-slate-400'}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-medium leading-snug">
                        {tab.label}
                      </div>
                      {/* <div className="text-[10px] text-slate-400 leading-snug truncate">
                        {tab.desc}
                      </div> */}
                    </div>
                  </button>
                )
              })}
            </Card>
          </div>
        </div>

        {/* Right Side: Tab Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* TAB 1: SECURITY & PASSWORD */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              {/* Password Changing Form */}
              <Card padding="lg">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <KeyRound size={16} className="text-primary-600" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">
                      Change Account Password
                    </h3>
                    {/* <p className="text-xs font-normal text-slate-400">
                      Ensure your account uses a strong, unique password.
                    </p> */}
                  </div>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4 pt-4 text-xs font-normal">
                  {passwordFeedback && (
                    <div
                      className={`p-3 rounded-lg border text-xs font-normal flex items-center gap-2 ${passwordFeedback.includes('successfully')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                    >
                      <ShieldCheck size={14} />
                      <span>{passwordFeedback}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-600 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-9 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-600 mb-1">
                        New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-50/70 p-3 border border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <div className="font-medium text-slate-700">Password Requirements:</div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                      <li>Minimum 8 characters in length</li>
                      <li>Includes at least one uppercase letter and one number</li>
                      <li>Includes at least one special character (!@#$%^&*)</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" variant="primary" size="sm">
                      Update Password
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Two-Factor Authentication (2FA) */}
              <Card padding="lg">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Smartphone size={16} className="text-primary-600" />
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">
                        Two-Factor Authentication (2FA)
                      </h3>
                      <p className="text-xs font-normal text-slate-400">
                        Add an extra layer of security when releasing commission payouts.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-normal text-emerald-700 border border-emerald-200/80">
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-normal">
                  <div className="space-y-1">
                    <div className="text-slate-800 font-medium">
                      Google Authenticator / TOTP
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      A 6-digit verification code will be requested on every withdrawal settlement.
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setTwoFactorEnabled((prev) => !prev)
                      alert(twoFactorEnabled ? '2FA has been disabled.' : '2FA has been enabled.')
                    }}
                  >
                    {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </Button>
                </div>
              </Card>

              {/* Active Sessions */}
              <Card padding="lg">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <Lock size={16} className="text-primary-600" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">
                      Active Login Sessions
                    </h3>
                    <p className="text-xs font-normal text-slate-400">
                      Devices currently authorized for this admin account.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 pt-1 text-xs font-normal">
                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <div className="font-medium text-slate-800 flex items-center gap-2">
                        <span>Windows PC • Chrome Browser</span>
                        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700">
                          Current Session
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        IP: 103.82.14.92 • Hyderabad, India
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-600">Active Now</span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <div className="font-medium text-slate-700">
                        iPhone 15 Pro • Safari Mobile
                      </div>
                      <div className="text-[11px] text-slate-400">
                        IP: 49.37.112.4 • Hyderabad, India
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">2 hours ago</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => alert('All other sessions signed out.')}
                  >
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: PERSONAL INFORMATION */}
          {activeSection === 'personal' && (
            <Card padding="lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary-600" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-800">
                      Personal Details
                    </h3>
                    {/* <p className="text-xs font-normal text-slate-400">
                      Update your identity and official communication records.
                    </p> */}
                  </div>
                </div>
                {profileSaved && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <Check size={13} /> Saved
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 text-xs font-normal">
                {/* Mini Identity Row */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <Avatar name="Sanjay Rao" size="md" status="online" />
                  <div>
                    <div className="text-xs font-medium text-slate-800">Dr. Sanjay Rao</div>
                    <div className="text-[11px] text-amber-600 font-normal">Crown Ambassador (Level 06)</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                      />
                      <Mail size={14} className="absolute right-3 top-2.5 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Mobile Contact</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                      />
                      <Phone size={14} className="absolute right-3 top-2.5 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Residential City & State</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-primary-500 focus:outline-none"
                      />
                      <MapPin size={14} className="absolute right-3 top-2.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-xs">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500">Member ID</span>
                    <div className="flex items-center gap-1.5 font-mono font-medium text-slate-800">
                      <span>SB-90821</span>
                      <button
                        type="button"
                        onClick={handleCopyId}
                        className="text-slate-400 hover:text-primary-600 transition-colors cursor-pointer"
                        title="Copy ID"
                      >
                        {copiedId ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500">Date of Joining</span>
                    <span className="font-medium text-slate-800">15 March 2024</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500">Executive Rank</span>
                    <span className="font-medium text-amber-700">Crown Ambassador (Level 06)</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" size="sm" icon={<Save size={13} />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* TAB 3: NETWORK PLACEMENT */}
          {activeSection === 'network' && (
            <Card padding="lg">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <GitFork size={16} className="text-primary-600" />
                <div>
                  <h3 className="text-sm font-medium text-slate-800">
                    Binary Tree Placement & Organization
                  </h3>
                  {/* <p className="text-xs font-normal text-slate-400">
                    Your position in the company genealogy tree hierarchy.
                  </p> */}
                </div>
              </div>

              <div className="divide-y divide-slate-100 pt-1 text-xs font-normal">
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500">Direct Sponsor</span>
                  <span className="font-medium text-slate-800">Root Company (Admin Node)</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500">Hierarchy Position</span>
                  <span className="font-medium text-slate-800">Apex Master Distributor</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500">Placement Leg</span>
                  <span className="font-medium text-primary-700">Left Leg (Tree Head)</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500">Direct Sponsored Distributors</span>
                  <span className="font-medium text-slate-800">32 Direct Partners</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500">Total Downline Members</span>
                  <span className="font-medium text-slate-800">18,492 Active Network Partners</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-slate-500">Binary Matching Ratio</span>
                  <span className="font-medium text-slate-800">1:1 Balanced Matching</span>
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: BANKING & KYC */}
          {activeSection === 'banking' && (
            <div className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-primary-600" />
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">
                        Payout Bank Account
                      </h3>
                      {/* <p className="text-xs font-normal text-slate-400">
                        Direct bank account for commission withdrawal disbursements.
                      </p> */}
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-normal text-emerald-700 border border-emerald-200/80">
                    Bank Verified
                  </span>
                </div>

                <div className="divide-y divide-slate-100 pt-1 text-xs font-normal">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">Bank Name</span>
                    <span className="font-medium text-slate-800">State Bank of India</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">Account Number</span>
                    <span className="font-mono font-medium text-slate-800">•••• •••• 4892</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">IFSC Code</span>
                    <span className="font-mono font-medium text-slate-800">SBIN0001234</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">Branch Name</span>
                    <span className="font-medium text-slate-800">Banjara Hills, Hyderabad</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">Payout Mode</span>
                    <span className="font-medium text-emerald-700">Direct Bank Transfer (NEFT/RTGS)</span>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary-600" />
                    <div>
                      <h3 className="text-sm font-medium text-slate-800">
                        Statutory Tax & PAN Record
                      </h3>
                      <p className="text-xs font-normal text-slate-400">
                        Income tax compliance under Section 194H.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-normal text-emerald-700 border border-emerald-200/80">
                    PAN Linked
                  </span>
                </div>

                <div className="divide-y divide-slate-100 pt-1 text-xs font-normal">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">Permanent Account Number (PAN)</span>
                    <span className="font-mono font-medium text-slate-800">ABCDE1234F</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">Mandatory TDS Rate</span>
                    <span className="font-medium text-slate-800">5.00% (with verified PAN)</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-slate-500">NSDL Verification Status</span>
                    <span className="font-medium text-emerald-600">Verified & Active</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS & PREFERENCES */}
          {activeSection === 'notifications' && (
            <Card padding="lg">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <Bell size={16} className="text-primary-600" />
                <div>
                  <h3 className="text-sm font-medium text-slate-800">
                    Communication & Alert Preferences
                  </h3>
                  {/* <p className="text-xs font-normal text-slate-400">
                    Select how you want to be notified about commissions and system events.
                  </p> */}
                </div>
              </div>

              <div className="space-y-4 pt-4 text-xs font-normal">
                <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3">
                  <div className="pr-4">
                    <div className="text-xs font-medium text-slate-800">
                      SMS & WhatsApp Alerts
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Instant text message whenever a payout is approved and disbursed.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3">
                  <div className="pr-4">
                    <div className="text-xs font-medium text-slate-800">
                      Weekly Commission Summaries
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Receive detailed breakdown of binary matching BV and sponsor bonuses via email.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                </div>

                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-white p-3">
                  <div className="flex items-center justify-between py-2 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Globe size={13} /> Base Currency
                    </span>
                    <span className="font-medium text-slate-800">Indian Rupee (INR - ₹)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Calendar size={13} /> Default Timezone
                    </span>
                    <span className="font-medium text-slate-800">Asia/Kolkata (IST - UTC+05:30)</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
