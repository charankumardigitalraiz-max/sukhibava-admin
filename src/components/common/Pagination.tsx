import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  // Generate page numbers to show (max 5)
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages)
      }
    }
    return pages
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-xs font-normal text-slate-500 ${className}`}
    >
      {/* Range summary */}
      <div>
        Showing <span className="font-medium text-slate-700">{startItem}</span> to{' '}
        <span className="font-medium text-slate-700">{endItem}</span> of{' '}
        <span className="font-medium text-slate-700">{totalItems}</span> entries
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
          aria-label="Previous page"
        >
          <ChevronLeft size={14} strokeWidth={1.75} />
        </button>

        {getPageNumbers().map((page, idx) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-8 w-8 items-center justify-center text-slate-400"
              >
                …
              </span>
            )
          }

          const isActive = page === currentPage
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex h-8 min-w-8 px-2 items-center justify-center rounded-lg text-xs font-normal transition-colors cursor-pointer ${isActive
                ? 'bg-primary-500 border border-primary-200/70 text-white font-medium'
                : 'border border-slate-200/70 bg-white text-slate-600 hover:bg-slate-50 shadow-2xs'
                }`}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
          aria-label="Next page"
        >
          <ChevronRight size={14} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}

