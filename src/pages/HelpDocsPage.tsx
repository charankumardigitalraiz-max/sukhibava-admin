import React, { useState } from 'react'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import {
  HelpCircle,
  BookOpen,
  GitFork,
  CreditCard,
  Award,
  Users,
  Search,
  ChevronDown,
  Download,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  FileText,
  ExternalLink,
} from 'lucide-react'

interface FAQItem {
  id: string
  category: 'binary' | 'payouts' | 'ranks' | 'compliance'
  question: string
  answer: string
}

export const HelpDocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1')

  const faqList: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'binary',
      question: 'How does 1:1 Binary Pair Matching work?',
      answer:
        'In a 1:1 Binary plan, sales points (Business Volume / BV) from your Left Leg are paired with points from your Right Leg. At the midnight cycle cut, the system matches the smaller volume (weaker leg) with an equal amount from the stronger leg and pays out 10% on that matched volume. For example, 10,000 BV Left paired with 8,000 BV Right yields 8,000 Matched BV = ₹800 credited to your wallet.',
    },
    {
      id: 'faq-2',
      category: 'binary',
      question: 'What happens to unmatched points (Carry Forward)?',
      answer:
        'Unmatched points never expire or lapse. The surplus volume on the stronger leg is automatically carried forward to the next daily cycle, waiting for the other leg to generate sales to balance and match it.',
    },
    {
      id: 'faq-3',
      category: 'payouts',
      question: 'When are payouts transferred to bank accounts?',
      answer:
        'Payouts follow a weekly settlement schedule locked every Sunday at 23:59:59 IST. Qualified balances of ₹1,000 or above are disbursed via automated NEFT / IMPS transfers every Monday directly to the distributor\'s verified bank account.',
    },
    {
      id: 'faq-4',
      category: 'payouts',
      question: 'Why is 5% TDS deducted from payout disbursements?',
      answer:
        'Under Section 194H of the Indian Income Tax Act, all direct selling commissions and brokerage earnings are subject to a mandatory 5.00% Tax Deducted at Source (TDS) for accounts with verified PAN cards. The company deposits this directly to the Government of India and issues quarterly Form 16A certificates.',
    },
    {
      id: 'faq-5',
      category: 'ranks',
      question: 'How do distributors advance from Silver to Crown Ambassador?',
      answer:
        'Rank progression is based on two requirements: Personal Volume (PV) and Team Business Volume (BV) accumulated in a cycle. Reaching higher ranks (Silver, Gold, Platinum, Diamond, Crown) increases the weekly binary payout cap from ₹25,000/week up to ₹15,00,000/week and unlocks shares in the 3.0% Global Leadership Bonus Pool.',
    },
    {
      id: 'faq-6',
      category: 'compliance',
      question: 'What is Spillover and how does auto-placement work?',
      answer:
        'Since a distributor can only have two front-line positions (Left and Right), any additional partners they sponsor "spill over" into open positions beneath existing team members. If set to "Auto Balance", the system automatically places new recruits into the weaker leg to help balance the tree.',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'binary', label: 'Binary Matching' },
    { id: 'payouts', label: 'Payouts & TDS' },
    { id: 'ranks', label: 'Rank Tiers' },
    { id: 'compliance', label: 'KYC & Rules' },
  ]

  const filteredFaqs = faqList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-medium tracking-tight text-slate-800">
            Help Center & Compensation Documentation
          </h1>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Official rules, binary compensation calculations, tax compliance, and distributor FAQs
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={<Download size={14} />}
          onClick={() => alert('Downloading Sukhibava Official Compensation Plan PDF...')}
        >
          Download PDF Plan
        </Button>
      </div>

      {/* Search & Topic Filter Bar */}
      <Card padding="md" className="bg-white border-slate-200/90 shadow-2xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search compensation rules, binary calculations, TDS..."
              className="w-full rounded-lg border border-slate-200/90 bg-white py-2 pl-9 pr-3 text-xs font-normal text-slate-700 placeholder-slate-400 focus:border-primary-400 focus:outline-none shadow-2xs"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${selectedCategory === cat.id
                    ? 'bg-primary-50 text-primary-700 font-medium border border-primary-200/80'
                    : 'text-slate-600 hover:bg-slate-100 font-normal border border-transparent'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 4 Feature Guide Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card padding="md" className="hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600">
              <GitFork size={17} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-800">
                Binary Pair Match
              </h3>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                1:1 ratio, 10% payout
              </p>
            </div>
          </div>
          <p className="text-xs font-normal text-slate-600 mt-3 leading-relaxed">
            Balanced sales volume on Left and Right legs matches at midnight daily.
          </p>
        </Card>

        <Card padding="md" className="hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
              <CreditCard size={17} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-800">
                Payouts & 5% TDS
              </h3>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                Weekly bank settlement
              </p>
            </div>
          </div>
          <p className="text-xs font-normal text-slate-600 mt-3 leading-relaxed">
            Automatic Monday NEFT/IMPS transfers for wallets with ₹1,000+ balance.
          </p>
        </Card>

        <Card padding="md" className="hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 border border-purple-100 text-purple-600">
              <Award size={17} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-800">
                Rank Progression
              </h3>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                6 leadership tiers
              </p>
            </div>
          </div>
          <p className="text-xs font-normal text-slate-600 mt-3 leading-relaxed">
            Advance from Distributor to Crown Ambassador to expand your weekly cap.
          </p>
        </Card>

        <Card padding="md" className="hover:border-slate-300 transition-all shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 border border-sky-100 text-sky-600">
              <Users size={17} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-800">
                Direct Referrals
              </h3>
              <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                15% sponsor bonus
              </p>
            </div>
          </div>
          <p className="text-xs font-normal text-slate-600 mt-3 leading-relaxed">
            Instant 15% bonus on the first product order placed by any direct partner.
          </p>
        </Card>
      </div>

      {/* Main FAQ Accordion Section */}
      <Card padding="lg" className="bg-white border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <HelpCircle size={15} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-800">
                Frequently Asked Questions
              </h2>
              <p className="text-xs font-normal text-slate-400 mt-0.5">
                Step-by-step answers to binary commission logic and member policies
              </p>
            </div>
          </div>

          <span className="text-xs font-normal text-slate-400">
            {filteredFaqs.length} questions
          </span>
        </div>

        <div className="divide-y divide-slate-100 mt-1">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id
            return (
              <div key={faq.id} className="py-3.5">
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between text-left cursor-pointer group"
                >
                  <span className="text-xs font-medium text-slate-800 group-hover:text-primary-600 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary-600' : ''
                      }`}
                  />
                </button>

                {isOpen && (
                  <p className="mt-2 text-xs font-normal text-slate-600 leading-relaxed animate-fade-up">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Bottom Row: Compliance & Support Contact */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Compliance Checklist */}
        <Card padding="lg" className="bg-white border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck size={15} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-800">
                Legal & Direct Selling Compliance
              </h3>
              <p className="text-xs font-normal text-slate-400 mt-0.5">
                Consumer Protection (Direct Selling) Rules, 2021
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2.5 text-xs font-normal text-slate-600">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Product-Backed Points:</strong> All BV points originate exclusively from tangible Ayurvedic and healthcare product purchases.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>No Mandatory Joining Fee:</strong> Registration is free; distributors earn commissions on sales, not on recruitment fees.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>30-Day Cooling-off Period:</strong> Full refund and return policy for unused, sealed merchandise.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong>Mandatory KYC:</strong> PAN card and bank account proof required before any commission disbursement.
              </span>
            </li>
          </ul>
        </Card>

        {/* Support Helpdesk */}
        <Card padding="lg" className="bg-white border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-3.5 border-b border-slate-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <BookOpen size={15} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-800">
                  Partner Helpdesk & Support
                </h3>
                <p className="text-xs font-normal text-slate-400 mt-0.5">
                  Reach out to the Sukhibava compliance and partner service team
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs font-normal text-slate-600">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                  <Mail size={13} />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Compliance Email</div>
                  <div className="text-slate-800 font-medium">support@sukhibava.org</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                  <Phone size={13} />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Toll-Free Partner Helpline</div>
                  <div className="text-slate-800 font-medium">1800-890-5442 (SUKHIBAVA)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                  <Clock size={13} />
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Operating Hours</div>
                  <div className="text-slate-800">Monday – Saturday: 9:00 AM – 6:30 PM IST</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <FileText size={13} />
              <span>Version 2.4 Compensation Bylaws</span>
            </span>
            <button
              onClick={() => alert('Opening Sukhibava Legal Direct Selling Guidelines')}
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Legal Terms</span>
              <ExternalLink size={11} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

