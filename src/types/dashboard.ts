export interface MetricItem {
  id: string
  title: string
  value: string
  change: string
  isPositive: boolean
  period: string
  accentColor: 'primary' | 'indigo' | 'emerald' | 'amber' | 'sky'
  sparkline: number[]
}

export interface ChartDataPoint {
  label: string
  value: number
  secondaryValue: number
}

export interface DepartmentTrendPoint {
  day: string
  ayurveda: number
  physio: number
  nutrition: number
  rehab: number
}

export interface IncomeStreamPoint {
  day: string
  binary: number
  direct: number
  leadership: number
  royalty: number
}

export interface RevenueBarData {
  label: string
  consultations: number
  therapy: number
  wellness: number
  total: number
}

export interface CommissionBarData {
  label: string
  directBonus: number
  binaryMatching: number
  levelIncome: number
  total: number
}

export interface HourlyTrafficData {
  hour: string
  count: number
  capacity: number
}

export interface PerformanceRingData {
  id: string
  label: string
  score: number
  color: string
  benchmark: string
}

export interface NetworkMember {
  id: string
  name: string
  sponsorId: string
  sponsorName: string
  joinDate: string
  placementLeg: 'Left' | 'Right'
  rank: 'Distributor' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Crown'
  personalBV: number
  teamBV: number
  status: 'Active' | 'Inactive' | 'Grace Period'
}

export interface CommissionRecord {
  id: string
  memberId: string
  memberName: string
  type: 'Direct Referral' | 'Binary Pair Match' | 'Leadership Pool' | 'Rank Bonus'
  date: string
  amount: string
  points: number
  status: 'Credited' | 'Processing' | 'Held'
}

export interface PayoutTransaction {
  id: string
  memberId: string
  memberName: string
  method: 'Bank Wire' | 'UPI / IMPS' | 'Crypto USDT'
  date: string
  grossAmount: string
  tdsDeduction: string
  netPayout: string
  status: 'Completed' | 'Pending' | 'Rejected'
}

export interface TreeNode {
  id: string
  name: string
  rank: string
  leftBV: number
  rightBV: number
  leftCount: number
  rightCount: number
  leftChild?: TreeNode
  rightChild?: TreeNode
  sponsorId?: string
  sponsorName?: string
  placementLeg?: 'Left' | 'Right'
  personalPV?: number
  joinDate?: string
  status?: 'Active' | 'Grace Period' | 'Inactive'
  level?: number
}
