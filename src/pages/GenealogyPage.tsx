import React, { useState, useMemo } from 'react'
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  UserPlus,
  Eye,
  X,
  Network,
  Table as TableIcon,
  Copy,
  Check,
  Info,
} from 'lucide-react'
import { binaryGenealogyRoot } from '../data/mockData'
import type { TreeNode } from '../types/dashboard'
import { Avatar } from '../components/common/Avatar'
import { Button } from '../components/common/Button'
import { StatCardGrid, type StatItem } from '../components/common/StatCard'
import { DataTable, type Column } from '../components/common/DataTable'

interface FlatMemberItem {
  id: string
  name: string
  rank: string
  level: number
  placementLeg: 'Left' | 'Right' | 'Root'
  sponsorName: string
  sponsorId: string
  leftBV: number
  rightBV: number
  leftCount: number
  rightCount: number
  personalPV: number
  status: string
  joinDate: string
  node: TreeNode
}

function flattenTree(
  node: TreeNode,
  level: number = 0,
  leg: 'Left' | 'Right' | 'Root' = 'Root',
  sponsor: string = 'System Genesis',
  sponsorId: string = 'GENESIS'
): FlatMemberItem[] {
  const current: FlatMemberItem = {
    id: node.id,
    name: node.name,
    rank: node.rank,
    level,
    placementLeg: leg,
    sponsorName: node.sponsorName || sponsor,
    sponsorId: node.sponsorId || sponsorId,
    leftBV: node.leftBV,
    rightBV: node.rightBV,
    leftCount: node.leftCount,
    rightCount: node.rightCount,
    personalPV: node.personalPV || 100,
    status: node.status || 'Active',
    joinDate: node.joinDate || '2024',
    node,
  }

  const left = node.leftChild
    ? flattenTree(node.leftChild, level + 1, 'Left', node.name, node.id)
    : []
  const right = node.rightChild
    ? flattenTree(node.rightChild, level + 1, 'Right', node.name, node.id)
    : []

  return [current, ...left, ...right]
}

export const GenealogyPage: React.FC = () => {
  // Current tree root being rendered (supports drill down)
  const [viewRoot, setViewRoot] = useState<TreeNode>(binaryGenealogyRoot)
  // Selected node for the inspector modal
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  // Breadcrumb path from absolute root to current viewRoot
  const [breadcrumbs, setBreadcrumbs] = useState<TreeNode[]>([binaryGenealogyRoot])

  const [zoomLevel, setZoomLevel] = useState(100)
  const [activeLegView, setActiveLegView] = useState<'both' | 'left' | 'right'>('both')
  const [viewMode, setViewMode] = useState<'tree' | 'table'>('tree')
  const [copiedId, setCopiedId] = useState(false)

  // Find path from root to target node for breadcrumbs
  const findPath = (current: TreeNode, targetId: string, path: TreeNode[] = []): TreeNode[] | null => {
    const currentPath = [...path, current]
    if (current.id === targetId) return currentPath
    if (current.leftChild) {
      const leftPath = findPath(current.leftChild, targetId, currentPath)
      if (leftPath) return leftPath
    }
    if (current.rightChild) {
      const rightPath = findPath(current.rightChild, targetId, currentPath)
      if (rightPath) return rightPath
    }
    return null
  }

  // Drill down into a node as the new tree view root
  const handleDrillDown = (node: TreeNode) => {
    const path = findPath(binaryGenealogyRoot, node.id)
    if (path) {
      setViewRoot(node)
      setBreadcrumbs(path)
    } else {
      setViewRoot(node)
      setBreadcrumbs((prev) => [...prev, node])
    }
  }

  // Jump to breadcrumb
  const handleBreadcrumbClick = (node: TreeNode, index: number) => {
    setViewRoot(node)
    setBreadcrumbs((prev) => prev.slice(0, index + 1))
  }

  const handleResetToRoot = () => {
    setViewRoot(binaryGenealogyRoot)
    setBreadcrumbs([binaryGenealogyRoot])
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 1800)
  }

  // Top Global StatCards Data
  const genealogyStats: StatItem[] = [
    {
      id: 'left_bv',
      title: 'Left Leg Volume',
      value: `${(viewRoot.leftBV / 1000).toFixed(0)}k BV`,
      subtitle: ``,
      change: '',
      isPositive: true,
      color: 'primary',
      icon: ArrowLeft,
    },
    {
      id: 'right_bv',
      title: 'Right Leg Volume',
      value: `${(viewRoot.rightBV / 1000).toFixed(0)}k BV`,
      subtitle: ``,
      change: '',
      isPositive: true,
      color: 'sky',
      icon: ArrowRight,
    },
    {
      id: 'matched_bv',
      title: 'Matched Pair Volume',
      value: `${(Math.min(viewRoot.leftBV, viewRoot.rightBV) / 1000).toFixed(0)}k BV`,
      subtitle: '',
      change: '',
      isPositive: true,
      color: 'emerald',
      icon: CheckCircle2,
    },
    {
      id: 'carry_forward',
      title: 'Surplus Carry Forward',
      value: `${(Math.abs(viewRoot.leftBV - viewRoot.rightBV) / 1000).toFixed(0)}k BV`,
      subtitle: '',
      change: '',
      isPositive: true,
      color: 'amber',
      icon: RefreshCw,
    },
  ]

  // Rank styling helper
  const getRankBadge = (rank: string) => {
    if (rank.includes('Crown')) {
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
        dot: 'bg-amber-500',
      }
    }
    if (rank.includes('Diamond')) {
      return {
        badge: 'bg-primary-50 text-primary-700 border-primary-200/80',
        dot: 'bg-primary-500',
      }
    }
    if (rank.includes('Platinum')) {
      return {
        badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
        dot: 'bg-sky-500',
      }
    }
    if (rank.includes('Gold')) {
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        dot: 'bg-emerald-500',
      }
    }
    return {
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
    }
  }

  // Render a single clean avatar node in the tree
  const renderAvatarNode = (
    node: TreeNode,
    leg?: 'Left' | 'Right',
    isCurrentRoot: boolean = false
  ) => {
    const isSelected = selectedNode?.id === node.id
    const config = getRankBadge(node.rank)
    const hasChildren = !!node.leftChild || !!node.rightChild
    // Smart side-floating placement so popover NEVER gets cut off by canvas borders or lower nodes
    const isFloatingRight = isCurrentRoot || leg === 'Left'
    const popoverPosition = isFloatingRight
      ? 'left-full ml-4 -top-2'
      : 'right-full mr-4 -top-2'

    return (
      <div className="relative flex flex-col items-center group cursor-pointer z-10 hover:z-50">
        {/* Main Circular Avatar Node */}
        <div
          onClick={() => setSelectedNode(node)}
          className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${isCurrentRoot
            ? 'h-16 w-16 p-1 bg-white shadow-md ring-2 ring-primary-500'
            : 'h-13 w-13 p-0.5 bg-white shadow-xs group-hover:shadow-md'
            } ${leg === 'Left'
              ? 'ring-2 ring-primary-400 group-hover:ring-primary-600'
              : leg === 'Right'
                ? 'ring-2 ring-sky-400 group-hover:ring-sky-600'
                : ''
            } ${isSelected ? 'ring-4 ring-primary-500 ring-offset-2' : ''}`}
        >
          <Avatar
            name={node.name}
            size={isCurrentRoot ? 'lg' : 'md'}
            status="online"
          />

          {/* Leg Pill Badge on Top Right of Avatar */}
          {leg && (
            <span
              className={`absolute -top-1 -right-1.5 inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-medium border shadow-2xs ${leg === 'Left'
                ? 'bg-primary-50 text-primary-700 border-primary-200'
                : 'bg-sky-50 text-sky-700 border-sky-200'
                }`}
            >
              {leg}
            </span>
          )}
        </div>

        {/* Name and ID Below Avatar */}
        <div
          onClick={() => setSelectedNode(node)}
          className="mt-2 flex flex-col items-center text-center max-w-[130px]"
        >
          <span className="text-xs font-medium text-slate-800 truncate w-full group-hover:text-primary-600 transition-colors">
            {node.name}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {node.id}
          </span>
          <span
            className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[9px] font-normal border ${config.badge}`}
          >
            <span className={`h-1 w-1 rounded-full ${config.dot}`} />
            {node.rank}
          </span>
        </div>

        {/* Hover Details Popover Card (Side-Floating, Unclipped) */}
        <div
          className={`absolute ${popoverPosition} w-68 rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50`}
        >
          {/* Subtle Pointer Arrow */}
          <div
            className={`absolute top-6 h-2.5 w-2.5 rotate-45 bg-white ${isFloatingRight
              ? '-left-1.5 border-l border-b border-slate-200/90'
              : '-right-1.5 border-r border-t border-slate-200/90'
              }`}
          />
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Avatar name={node.name} size="sm" />
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-800 truncate">
                  {node.name}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {node.id}
                </div>
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-normal ${config.badge}`}
            >
              <span className={`h-1 w-1 rounded-full ${config.dot}`} />
              {node.rank}
            </span>
          </div>

          {/* Details Body */}
          <div className="mt-2 space-y-1.5 text-[11px] font-normal">
            <div className="flex justify-between text-slate-500">
              <span>Placement:</span>
              <span className="font-medium text-slate-700">
                {leg ? `${leg} Leg` : 'Root Focus'}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Direct Sponsor:</span>
              <span className="font-medium text-slate-700 truncate max-w-[120px]">
                {node.sponsorName || 'Dr. Sanjay Rao'}
              </span>
            </div>

            {/* Volume Stats */}
            <div className="mt-2 rounded-lg bg-slate-50 p-2 border border-slate-100 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-primary-700 font-medium">Left Leg BV:</span>
                <span className="font-medium text-slate-800">
                  {(node.leftBV / 1000).toFixed(0)}k BV ({node.leftCount.toLocaleString()})
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-sky-700 font-medium">Right Leg BV:</span>
                <span className="font-medium text-slate-800">
                  {(node.rightBV / 1000).toFixed(0)}k BV ({node.rightCount.toLocaleString()})
                </span>
              </div>
              <div className="flex justify-between text-[11px] pt-1 border-t border-slate-200/60">
                <span className="text-emerald-700 font-medium">Matched Volume:</span>
                <span className="font-medium text-emerald-800">
                  {(Math.min(node.leftBV, node.rightBV) / 1000).toFixed(0)}k BV
                </span>
              </div>
            </div>
          </div>

          {/* Popover Action Buttons */}
          <div className="mt-2.5 flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedNode(node)
              }}
              className="flex-1 rounded-md bg-primary py-1 text-[11px] font-normal text-white hover:bg-slate-200 transition-colors text-center cursor-pointer"
            >
              Full Profile
            </button>
            {hasChildren && !isCurrentRoot && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDrillDown(node)
                }}
                className="flex-1 rounded-md bg-primary-50 py-1 text-[11px] font-medium text-primary-700 hover:bg-primary-100 transition-colors text-center border border-primary-200/60 cursor-pointer"
              >
                Drill Down
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render open placement slot for unfilled positions
  const renderOpenSlot = (leg: 'Left' | 'Right') => (
    <div
      onClick={() =>
        alert(
          `Open placement slot selected on ${leg} Leg. You can register a new partner directly under this position.`
        )
      }
      className="flex flex-col items-center cursor-pointer group z-10"
    >
      <div className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white text-slate-400 group-hover:border-primary-400 group-hover:bg-primary-50/50 group-hover:text-primary-600 shadow-2xs transition-all">
        <UserPlus size={16} strokeWidth={1.75} />
      </div>
      <div className="mt-2 flex flex-col items-center text-center">
        <span className="text-xs font-normal text-slate-500 group-hover:text-primary-600 transition-colors">
          Open Slot
        </span>
        <span className="text-[10px] text-slate-400">
          {leg} Leg
        </span>
      </div>
    </div>
  )

  // Flatten tree for Matrix List view
  const flatMembers = useMemo(() => {
    return flattenTree(binaryGenealogyRoot)
  }, [])

  // Columns for the Matrix Table View
  const tableColumns: Column<FlatMemberItem>[] = [
    {
      key: 'id',
      header: 'Member ID',
      className: 'w-28',
      render: (item) => (
        <span className="font-[11px] text-xs font-normal text-slate-600  px-2 py-0.5 rounded">
          {item.id}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Distributor Name',
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={item.name} size="sm" />
          <div>
            <div className="text-xs font-medium text-slate-800">{item.name}</div>
            <div className="text-[11px] text-slate-400">Joined {item.joinDate}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'placementLeg',
      header: 'Binary Leg',
      render: (item) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-normal border ${item.placementLeg === 'Left'
            ? 'bg-primary-50 text-primary-700 border-primary-200/70'
            : item.placementLeg === 'Right'
              ? 'bg-sky-50 text-sky-700 border-sky-200/70'
              : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
        >
          {item.placementLeg}
        </span>
      ),
    },
    {
      key: 'level',
      header: 'Tree Level',
      render: (item) => (
        <span className="text-xs font-normal text-slate-600">
          {item.level === 0 ? 'Root' : `Level ${item.level}`}
        </span>
      ),
    },
    {
      key: 'sponsorName',
      header: 'Direct Sponsor',
      render: (item) => (
        <div>
          <div className="text-xs text-slate-700">{item.sponsorName}</div>
          <div className="text-[10px] font-mono text-slate-400">{item.sponsorId}</div>
        </div>
      ),
    },
    {
      key: 'rank',
      header: 'Rank',
      render: (item) => {
        const config = getRankBadge(item.rank)
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-normal ${config.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {item.rank}
          </span>
        )
      },
    },
    {
      key: 'leftBV',
      header: 'Left BV (Team)',
      render: (item) => (
        <span className="text-xs font-medium text-primary-700 tabular-nums">
          {(item.leftBV / 1000).toFixed(0)}k BV ({item.leftCount})
        </span>
      ),
    },
    {
      key: 'rightBV',
      header: 'Right BV (Team)',
      render: (item) => (
        <span className="text-xs font-medium text-sky-700 tabular-nums">
          {(item.rightBV / 1000).toFixed(0)}k BV ({item.rightCount})
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'right',
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedNode(item.node)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
            title="Inspect Partner"
          >
            <Eye size={13} />
          </button>
          <button
            onClick={() => {
              handleDrillDown(item.node)
              setViewMode('tree')
            }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 border border-primary-100 text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer"
            title="View in Tree"
          >
            <Network size={13} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title & Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium tracking-tight text-slate-800">
              Binary Tree & Matrix
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-normal text-emerald-700 border border-emerald-100">
              <Sparkles size={11} />
              Auto Balance Active
            </span>
          </div>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Visual organizational structure, left/right spillover placement, and matching volume
          </p>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-lg border border-slate-200/90 bg-white p-0.5 text-xs font-normal shadow-2xs">
            <button
              onClick={() => setViewMode('tree')}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${viewMode === 'tree'
                ? 'bg-slate-100 text-slate-900 font-medium'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <Network size={14} />
              <span>Tree View</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-colors cursor-pointer ${viewMode === 'table'
                ? 'bg-slate-100 text-slate-900 font-medium'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <TableIcon size={14} />
              <span>Matrix List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Global StatCards Grid */}
      <div className="animate-fade-up">
        <StatCardGrid stats={genealogyStats} />
      </div>

      {/* Main Content Area */}
      {viewMode === 'tree' ? (
        <div className="rounded-xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
          {/* Unified Card Header: Breadcrumb Navigation & Tree Canvas Toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 bg-white px-5 py-3.5">
            {/* Breadcrumb trail */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <React.Fragment key={crumb.id}>
                    {idx > 0 && <span className="text-slate-300">/</span>}
                    <button
                      onClick={() => handleBreadcrumbClick(crumb, idx)}
                      disabled={isLast}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${isLast
                        ? 'bg-primary-50 text-primary-700 font-medium border border-primary-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-normal'
                        }`}
                    >
                      <span>{idx === 0 ? 'Home Root' : crumb.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">({crumb.id})</span>
                    </button>
                  </React.Fragment>
                )
              })}

              {breadcrumbs.length > 1 && (
                <button
                  onClick={handleResetToRoot}
                  className="ml-2 inline-flex items-center gap-1 text-[11px] text-primary-600 hover:text-primary-800 transition-colors font-medium cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Reset to Top</span>
                </button>
              )}
            </div>

            {/* Tree Controls: Leg Filter & Zoom */}
            <div className="flex items-center gap-2.5">
              {/* Leg View Filter */}
              <div className="inline-flex rounded-lg border border-slate-200/90 bg-slate-50/70 p-0.5 text-xs font-normal">
                <button
                  onClick={() => setActiveLegView('both')}
                  className={`rounded-md px-2 py-1 transition-colors cursor-pointer ${activeLegView === 'both'
                    ? 'bg-white text-slate-900 font-medium shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  Full Tree
                </button>
                <button
                  onClick={() => setActiveLegView('left')}
                  className={`rounded-md px-2 py-1 transition-colors cursor-pointer ${activeLegView === 'left'
                    ? 'bg-white text-slate-900 font-medium shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  Left Only
                </button>
                <button
                  onClick={() => setActiveLegView('right')}
                  className={`rounded-md px-2 py-1 transition-colors cursor-pointer ${activeLegView === 'right'
                    ? 'bg-white text-slate-900 font-medium shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  Right Only
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 rounded-lg border border-slate-200/90 bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="px-1 text-[11px] font-mono text-slate-600 min-w-8 text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Unified Card Body: Interactive Tree Canvas */}
          <div className="relative overflow-x-auto bg-slate-50/50 p-8 pt-12 pb-20 min-h-[620px]">
            <div
              className="flex flex-col items-center transition-transform duration-200 min-w-[1040px]"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Level 0: View Root Node */}
              <div className="relative z-20">
                {renderAvatarNode(viewRoot, undefined, true)}
              </div>

              {/* Connector lines from Level 0 to Level 1 */}
              <div
                className={`relative w-full h-16 flex items-center justify-center ${activeLegView === 'both' ? 'max-w-[960px]' : 'max-w-[460px]'
                  }`}
              >
                {activeLegView === 'both' ? (
                  <>
                    {/* Vertical stem down from root */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300" />
                    {/* Horizontal branch line */}
                    <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-slate-300" />
                    {/* Left stem down to child */}
                    <div className="absolute top-8 left-1/4 -translate-x-1/2 w-0.5 h-8 bg-primary-400" />
                    {/* Right stem down to child */}
                    <div className="absolute top-8 right-1/4 translate-x-1/2 w-0.5 h-8 bg-sky-400" />
                  </>
                ) : (
                  <div className="w-0.5 h-16 bg-slate-300" />
                )}
              </div>

              {/* Level 1: Left & Right Branches */}
              <div
                className={`flex w-full ${activeLegView === 'both'
                  ? 'max-w-[960px] justify-between'
                  : 'max-w-[460px] justify-center'
                  } relative z-10 px-4`}
              >
                {/* Left Subtree */}
                {(activeLegView === 'both' || activeLegView === 'left') && (
                  <div className="w-[460px] flex flex-col items-center">
                    <div className="flex justify-center w-full">
                      {viewRoot.leftChild ? (
                        renderAvatarNode(viewRoot.leftChild, 'Left')
                      ) : (
                        renderOpenSlot('Left')
                      )}
                    </div>

                    {/* Connectors to Level 2 under Left */}
                    {viewRoot.leftChild && (
                      <>
                        <div className="relative w-full max-w-[420px] h-16 flex items-center justify-center">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300" />
                          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-slate-300" />
                          <div className="absolute top-8 left-1/4 -translate-x-1/2 w-0.5 h-8 bg-primary-400" />
                          <div className="absolute top-8 right-1/4 translate-x-1/2 w-0.5 h-8 bg-sky-400" />
                        </div>

                        {/* Level 2 Children under Left */}
                        <div className="flex w-full max-w-[440px]">
                          <div className="w-1/2 flex justify-center">
                            {viewRoot.leftChild.leftChild ? (
                              renderAvatarNode(viewRoot.leftChild.leftChild, 'Left')
                            ) : (
                              renderOpenSlot('Left')
                            )}
                          </div>
                          <div className="w-1/2 flex justify-center">
                            {viewRoot.leftChild.rightChild ? (
                              renderAvatarNode(viewRoot.leftChild.rightChild, 'Right')
                            ) : (
                              renderOpenSlot('Right')
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Right Subtree */}
                {(activeLegView === 'both' || activeLegView === 'right') && (
                  <div className="w-[460px] flex flex-col items-center">
                    <div className="flex justify-center w-full">
                      {viewRoot.rightChild ? (
                        renderAvatarNode(viewRoot.rightChild, 'Right')
                      ) : (
                        renderOpenSlot('Right')
                      )}
                    </div>

                    {/* Connectors to Level 2 under Right */}
                    {viewRoot.rightChild && (
                      <>
                        <div className="relative w-full max-w-[420px] h-16 flex items-center justify-center">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300" />
                          <div className="absolute top-8 left-1/4 right-1/4 h-0.5 bg-slate-300" />
                          <div className="absolute top-8 left-1/4 -translate-x-1/2 w-0.5 h-8 bg-primary-400" />
                          <div className="absolute top-8 right-1/4 translate-x-1/2 w-0.5 h-8 bg-sky-400" />
                        </div>

                        {/* Level 2 Children under Right */}
                        <div className="flex w-full max-w-[440px]">
                          <div className="w-1/2 flex justify-center">
                            {viewRoot.rightChild.leftChild ? (
                              renderAvatarNode(viewRoot.rightChild.leftChild, 'Left')
                            ) : (
                              renderOpenSlot('Left')
                            )}
                          </div>
                          <div className="w-1/2 flex justify-center">
                            {viewRoot.rightChild.rightChild ? (
                              renderAvatarNode(viewRoot.rightChild.rightChild, 'Right')
                            ) : (
                              renderOpenSlot('Right')
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Unified Card Footer: Bottom Canvas Legend */}
            <div className="mt-8 flex flex-wrap items-center justify-between border-t border-slate-200/70 pt-4 text-xs font-normal text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary-500" />
                  <span>Left Leg (Primary)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  <span>Right Leg (Sky)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full border border-dashed border-slate-400 bg-white" />
                  <span>Open Placement Slot</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-primary-600 font-normal">
                <Info size={13} />
                <span>Click "Drill Down" on any card to view its sub-matrix</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Matrix Table View */
        <div className="animate-fade-up">
          <DataTable<FlatMemberItem>
            title=""
            data={flatMembers}
            columns={tableColumns}
            keyExtractor={(item) => item.id}
            searchPlaceholder="Search ID, name, sponsor..."
            searchKeys={['id', 'name', 'sponsorName', 'rank']}
            pageSize={10}
          />
        </div>
      )}

      {/* Partner Inspector Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedNode(null)}
          />

          {/* Modal Dialog */}
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl z-10 animate-fade-up">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <Avatar name={selectedNode.name} size="lg" status="online" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-slate-800">
                      {selectedNode.name}
                    </h3>
                    <span className="rounded bg-primary-50 px-2 py-0.5 text-xs font-mono text-primary-700 border border-primary-100">
                      {selectedNode.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-normal ${getRankBadge(selectedNode.rank).badge
                        }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${getRankBadge(selectedNode.rank).dot
                          }`}
                      />
                      {selectedNode.rank}
                    </span>
                    <span className="text-xs text-slate-400">
                      • Joined {selectedNode.joinDate || 'Jan 2024'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4 text-xs font-normal">
              {/* Sponsor & Placement Meta */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <div>
                  <div className="text-[11px] text-slate-400">Direct Sponsor</div>
                  <div className="text-xs font-medium text-slate-800 mt-0.5">
                    {selectedNode.sponsorName || 'Dr. Sanjay Rao'}
                  </div>
                  <div className="font-mono text-[10px] text-slate-400">
                    {selectedNode.sponsorId || 'SKB-ROOT'}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Placement Position</div>
                  <div className="text-xs font-medium text-slate-800 mt-0.5">
                    {selectedNode.placementLeg ? `${selectedNode.placementLeg} Leg` : 'Root'}
                  </div>
                  <div className="text-[10px] text-emerald-600">Active & Qualified</div>
                </div>
              </div>

              {/* Volume & Matching Performance */}
              <div>
                <div className="text-xs font-medium text-slate-700 mb-2">
                  Binary Volume Breakdown
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="rounded-lg border border-slate-200/80 p-2.5 bg-white">
                    <div className="text-[10px] text-slate-400">Left Leg BV</div>
                    <div className="text-sm font-medium text-primary-700 mt-0.5">
                      {selectedNode.leftBV.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {selectedNode.leftCount.toLocaleString()} partners
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200/80 p-2.5 bg-white">
                    <div className="text-[10px] text-slate-400">Right Leg BV</div>
                    <div className="text-sm font-medium text-sky-700 mt-0.5">
                      {selectedNode.rightBV.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {selectedNode.rightCount.toLocaleString()} partners
                    </div>
                  </div>

                  <div className="rounded-lg border border-emerald-200 p-2.5 bg-emerald-50/50">
                    <div className="text-[10px] text-emerald-700">Matched Pairs</div>
                    <div className="text-sm font-medium text-emerald-800 mt-0.5">
                      {Math.min(selectedNode.leftBV, selectedNode.rightBV).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">1:1 qualified</div>
                  </div>
                </div>
              </div>

              {/* Direct Link Copier */}
              <div className="rounded-lg border border-slate-200/80 p-3 bg-white flex items-center justify-between gap-2">
                <div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    Distributor Referral Placement Link
                  </div>
                  <div className="font-mono text-[10px] text-slate-400 truncate max-w-[280px]">
                    https://sukhibava.org/join?ref={selectedNode.id}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleCopy(`https://sukhibava.org/join?ref=${selectedNode.id}`)}
                  icon={copiedId ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                >
                  {copiedId ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
              <Button size="sm" variant="secondary" onClick={() => setSelectedNode(null)}>
                Close
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon={<Network size={14} />}
                onClick={() => {
                  handleDrillDown(selectedNode)
                  setSelectedNode(null)
                  setViewMode('tree')
                }}
              >
                Focus Tree on this Member
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
