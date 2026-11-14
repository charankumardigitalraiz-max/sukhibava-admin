import React, { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Card } from './Card'
import { Pagination } from './Pagination'

export interface Column<T> {
  key: string
  header: string
  render?: (item: T, index: number) => React.ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface DataTableProps<T> {
  title?: string
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  filterTabs?: { label: string; filterFn: (item: T) => boolean }[]
  pageSize?: number
  headerActions?: React.ReactNode
}

export function DataTable<T>({
  title,
  data,
  columns,
  keyExtractor,
  searchPlaceholder = 'Search...',
  searchKeys,
  filterTabs,
  pageSize = 7,
  headerActions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTabIdx, setActiveTabIdx] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // 1. Tab Filter
  const tabFiltered = useMemo(() => {
    if (!filterTabs || filterTabs.length === 0) return data
    const activeTab = filterTabs[activeTabIdx]
    return activeTab ? data.filter(activeTab.filterFn) : data
  }, [data, filterTabs, activeTabIdx])

  // 2. Search Query Filter
  const searchFiltered = useMemo(() => {
    if (!searchQuery.trim()) return tabFiltered
    const q = searchQuery.toLowerCase()

    return tabFiltered.filter((item) => {
      if (searchKeys && searchKeys.length > 0) {
        return searchKeys.some((k) => {
          const val = item[k]
          return val !== undefined && val !== null && String(val).toLowerCase().includes(q)
        })
      }
      return Object.values(item as Record<string, unknown>).some((val) =>
        val !== undefined && val !== null && String(val).toLowerCase().includes(q)
      )
    })
  }, [tabFiltered, searchQuery, searchKeys])

  // 3. Pagination Slicing
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return searchFiltered.slice(start, start + pageSize)
  }, [searchFiltered, currentPage, pageSize])

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Table Header with Search & Filters */}
      {(title || searchKeys || filterTabs || headerActions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 p-4 sm:p-4">
          {/* Left: Title & Search Bar */}
          <div className="flex flex-1 items-center gap-3">
            {title && (
              <h3 className="text-sm font-medium text-slate-800 shrink-0">
                {title}
              </h3>
            )}
            {searchKeys && searchKeys.length > 0 && (
              <div className="relative w-full sm:w-64">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border border-slate-200/80 bg-slate-50/70 py-2 pl-8 pr-3 text-xs font-normal text-slate-700 placeholder-slate-400 transition-all focus:border-primary-400 focus:bg-white focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Right: Filter Dropdown & Other Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {filterTabs && filterTabs.length > 0 && (
              <div className="relative inline-flex items-center">
                <select
                  value={activeTabIdx}
                  onChange={(e) => {
                    setActiveTabIdx(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="appearance-none rounded-lg border border-slate-200/80 bg-white py-1.5 pl-3 pr-8 text-xs font-normal text-slate-700 transition-colors hover:border-slate-300 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-50 shadow-2xs cursor-pointer"
                >
                  {filterTabs.map((tab, idx) => (
                    <option key={tab.label} value={idx}>
                      {tab.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute right-2.5 text-slate-400"
                />
              </div>
            )}
            {headerActions}
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-xs font-medium text-slate-600">
              {columns.map((col) => {
                const alignClass =
                  col.align === 'center'
                    ? 'text-center'
                    : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'

                return (
                  <th
                    key={col.key}
                    className={`py-3.5 px-4 ${alignClass} font-medium text-slate-600 ${col.className || ''}`}
                  >
                    <span>{col.header}</span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-600">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIdx) => (
                <tr
                  key={keyExtractor(item)}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  {columns.map((col) => {
                    const alignClass =
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'right'
                          ? 'text-right'
                          : 'text-left'

                    return (
                      <td
                        key={col.key}
                        className={`py-3.5 px-4 ${alignClass} ${col.className || ''}`}
                      >
                        {col.render
                          ? col.render(item, rowIdx)
                          : String((item as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-xs font-normal text-slate-400"
                >
                  No matching entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Global Reusable Pagination Footer */}
      <Pagination
        currentPage={currentPage}
        totalItems={searchFiltered.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Card>
  )
}

