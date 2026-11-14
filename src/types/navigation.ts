import type { ComponentType } from 'react'

export interface NavItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string; size?: number }>
  badge?: string | number
  active?: boolean
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

