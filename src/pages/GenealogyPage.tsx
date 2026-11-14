import React, { useState } from 'react'
import { binaryGenealogyRoot } from '../data/mockData'
import type { TreeNode } from '../types/dashboard'
import { Card } from '../components/common/Card'
import { Avatar } from '../components/common/Avatar'
import { Button } from '../components/common/Button'
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  GitBranch,
} from 'lucide-react'

export const GenealogyPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TreeNode>(binaryGenealogyRoot)
  const [searchId, setSearchId] = useState('')
  const [zoomLevel, setZoomLevel] = useState(100)
  const [activeLegView, setActiveLegView] = useState<'both' | 'left' | 'right'>('both')

  // Find node helper
  const findNode = (node: TreeNode, query: string): TreeNode | null => {
    if (
      node.id.toLowerCase().includes(query.toLowerCase()) ||
      node.name.toLowerCase().includes(query.toLowerCase())
    ) {
      return node
    }
    if (node.leftChild) {
      const found = findNode(node.leftChild, query)
      if (found) return found
    }
    if (node.rightChild) {
      const found = findNode(node.rightChild, query)
      if (found) return found
    }
    return null
  }

  const handleSearch = () => {
    if (!searchId.trim()) return
    const found = findNode(binaryGenealogyRoot, searchId.trim())
    if (found) {
      setSelectedNode(found)
    }
  }

  const getRankBadge = (rank: string) => {
    if (rank.includes('Crown')) {
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
        accentBar: 'bg-gradient-to-r from-amber-400 to-orange-400',
        dot: 'bg-amber-400',
      }
    }
    if (rank.includes('Diamond')) {
      return {
        badge: 'bg-primary-50 text-primary-700 border-primary-200/80',
        accentBar: 'bg-gradient-to-r from-primary-500 to-purple-500',
        dot: 'bg-primary-500',
      }
    }
    if (rank.includes('Platinum')) {
      return {
        badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
        accentBar: 'bg-gradient-to-r from-sky-400 to-blue-500',
        dot: 'bg-sky-400',
      }
    }
    if (rank.includes('Gold')) {
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        accentBar: 'bg-gradient-to-r from-emerald-400 to-teal-500',
        dot: 'bg-emerald-400',
      }
    }
    return {
      badge: 'bg-slate-50 text-slate-700 border-slate-200',
      accentBar: 'bg-slate-300',
      dot: 'bg-slate-400',
    }
  }

  const renderNode = (node: TreeNode, isRoot: boolean = false) => {
    const isSelected = selectedNode.id === node.id
    const config = getRankBadge(node.rank)
    const totalBV = node.leftBV + node.rightBV
    const leftRatio = totalBV > 0 ? Math.round((node.leftBV / totalBV) * 100) : 50

    return (
      <div
        onClick={() => setSelectedNode(node)}
        className={`group relative flex flex-col rounded-xl bg-white shadow-2xs transition-all duration-200 cursor-pointer overflow-hidden ${
          isSelected
            ? 'border-2 border-primary-500 shadow-md ring-4 ring-primary-50/80 -translate-y-0.5'
            : 'border border-slate-200/90 hover:border-primary-300 hover:shadow-xs'
        } ${isRoot ? 'w-[230px]' : 'w-[210px]'}`}
      >
        {/* Top Decorative Rank Accent Stripe */}
        <div className={`h-1 w-full ${config.accentBar}`} />

        <div className="p-3">
          {/* Header Row: Avatar, Name, Rank Pill */}
          <div className="flex items-center gap-2.5">
            <Avatar name={node.name} size="sm" status="online" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-800 truncate">
                {node.name}
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                {node.id}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-normal truncate ${config.badge}`}
            >
              <span className={`h-1 w-1 rounded-full ${config.dot}`} />
              {node.rank}
            </span>
            <span className="text-[10px] font-normal text-slate-400">
              {(node.leftCount + node.rightCount).toLocaleString()} Team
            </span>
          </div>

          {/* Binary BV Ratio Dual Progress Bar */}
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[10px] font-normal">
              <span className="text-primary-600 font-medium">L: {(node.leftBV / 1000).toFixed(0)}k</span>
              <span className="text-sky-600 font-medium">R: {(node.rightBV / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="bg-primary-500 transition-all duration-300"
                style={{ width: `${leftRatio}%` }}
              />
              <div
                className="bg-sky-400 transition-all duration-300"
                style={{ width: `${100 - leftRatio}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium tracking-tight text-slate-800">
              Binary Tree & Matrix
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-normal text-emerald-700 border border-emerald-100">
              <Sparkles size={11} />
              Auto Balance Active
            </span>
          </div>
          <p className="text-sm font-normal text-slate-500 mt-1">
            Visual organizational downline structure, spillover positions, and leg business volume
          </p>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-64">
            <Search
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search Partner ID or Name..."
              className="w-full rounded-lg border border-slate-200/80 bg-white py-1.5 pl-8 pr-3 text-xs font-normal text-slate-700 placeholder-slate-400 focus:border-primary-400 focus:outline-none shadow-2xs"
            />
          </div>
          <Button size="sm" variant="secondary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Selected Partner Highlight HUD Card */}
      <Card padding="md" className="border-primary-100 bg-white shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Avatar name={selectedNode.name} size="lg" status="online" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800">
                  {selectedNode.name}
                </span>
                <span className="rounded bg-primary-50 px-2 py-0.5 text-[11px] font-mono text-primary-700 border border-primary-100/80">
                  {selectedNode.id}
                </span>
              </div>
              <div className="text-xs font-normal text-slate-500 mt-0.5">
                {selectedNode.rank} • Root Binary Placement
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 text-xs font-normal">
            <div>
              <div className="text-[11px] text-slate-400">Left Downlines</div>
              <div className="text-sm font-medium text-primary-700 mt-0.5">
                {selectedNode.leftCount.toLocaleString()}{' '}
                <span className="text-[11px] font-normal text-slate-400">
                  ({(selectedNode.leftBV / 1000).toFixed(0)}k BV)
                </span>
              </div>
            </div>

            <div className="h-7 w-px bg-slate-200/70 hidden sm:block" />

            <div>
              <div className="text-[11px] text-slate-400">Right Downlines</div>
              <div className="text-sm font-medium text-sky-700 mt-0.5">
                {selectedNode.rightCount.toLocaleString()}{' '}
                <span className="text-[11px] font-normal text-slate-400">
                  ({(selectedNode.rightBV / 1000).toFixed(0)}k BV)
                </span>
              </div>
            </div>

            <div className="h-7 w-px bg-slate-200/70 hidden sm:block" />

            <div>
              <div className="text-[11px] text-slate-400">Matched Volume</div>
              <div className="text-sm font-medium text-emerald-600 mt-0.5">
                {Math.min(selectedNode.leftBV, selectedNode.rightBV).toLocaleString()} BV
              </div>
            </div>

            <Button
              size="sm"
              variant="soft"
              onClick={() => setSelectedNode(binaryGenealogyRoot)}
              className="ml-auto"
            >
              Reset to Root
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Interactive Canvas */}
      <Card padding="none" className="relative overflow-hidden bg-slate-50/40">
        {/* Floating Canvas Controls */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          {/* Leg View Filter */}
          <div className="inline-flex rounded-lg border border-slate-200/80 bg-white p-0.5 text-xs font-normal shadow-2xs">
            <button
              onClick={() => setActiveLegView('both')}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                activeLegView === 'both'
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Full Tree
            </button>
            <button
              onClick={() => setActiveLegView('left')}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                activeLegView === 'left'
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Left Leg
            </button>
            <button
              onClick={() => setActiveLegView('right')}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                activeLegView === 'right'
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Right Leg
            </button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white p-1 shadow-2xs">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <span className="px-1 text-[11px] font-mono text-slate-500">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-0.5" />
          <button
            onClick={() => setZoomLevel(100)}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Interactive Matrix Tree Layout */}
        <div className="overflow-x-auto min-h-[520px] p-8 pt-16 flex justify-center">
          <div
            className="flex flex-col items-center transition-transform duration-200 min-w-[850px]"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Level 0: Root Node */}
            <div className="relative z-10">
              {renderNode(binaryGenealogyRoot, true)}
            </div>

            {/* SVG Connecting Bezier Splines from Level 0 to Level 1 */}
            <div className="w-[660px] h-12 relative pointer-events-none">
              <svg className="w-full h-full overflow-visible">
                {/* Left Branch Curve */}
                {(activeLegView === 'both' || activeLegView === 'left') && (
                  <path
                    d="M 330 0 C 330 24, 160 20, 160 48"
                    fill="none"
                    stroke="#c7d2fe"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}
                {/* Right Branch Curve */}
                {(activeLegView === 'both' || activeLegView === 'right') && (
                  <path
                    d="M 330 0 C 330 24, 500 20, 500 48"
                    fill="none"
                    stroke="#bae6fd"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}
                <circle cx="330" cy="0" r="3.5" fill="#6366f1" />
                <circle cx="160" cy="48" r="3.5" fill="#6366f1" />
                <circle cx="500" cy="48" r="3.5" fill="#0ea5e9" />
              </svg>
            </div>

            {/* Level 1: Left & Right Leaders */}
            <div className="flex w-[680px] justify-between relative z-10">
              {/* Left Leader */}
              {(activeLegView === 'both' || activeLegView === 'left') && binaryGenealogyRoot.leftChild && (
                <div className="flex flex-col items-center">
                  {renderNode(binaryGenealogyRoot.leftChild)}

                  {/* SVG Splines from Level 1 Left to Level 2 */}
                  <div className="w-[300px] h-12 relative pointer-events-none">
                    <svg className="w-full h-full overflow-visible">
                      <path
                        d="M 150 0 C 150 24, 55 20, 55 48"
                        fill="none"
                        stroke="#e0e7ff"
                        strokeWidth="1.75"
                        strokeDasharray="3 2"
                      />
                      <path
                        d="M 150 0 C 150 24, 245 20, 245 48"
                        fill="none"
                        stroke="#e0e7ff"
                        strokeWidth="1.75"
                        strokeDasharray="3 2"
                      />
                      <circle cx="150" cy="0" r="3" fill="#6366f1" />
                      <circle cx="55" cy="48" r="3" fill="#6366f1" />
                      <circle cx="245" cy="48" r="3" fill="#6366f1" />
                    </svg>
                  </div>

                  {/* Level 2 Children under Left */}
                  <div className="flex w-[330px] justify-between">
                    {binaryGenealogyRoot.leftChild.leftChild &&
                      renderNode(binaryGenealogyRoot.leftChild.leftChild)}
                    {binaryGenealogyRoot.leftChild.rightChild &&
                      renderNode(binaryGenealogyRoot.leftChild.rightChild)}
                  </div>
                </div>
              )}

              {/* Right Leader */}
              {(activeLegView === 'both' || activeLegView === 'right') && binaryGenealogyRoot.rightChild && (
                <div className="flex flex-col items-center">
                  {renderNode(binaryGenealogyRoot.rightChild)}

                  {/* SVG Splines from Level 1 Right to Level 2 */}
                  <div className="w-[300px] h-12 relative pointer-events-none">
                    <svg className="w-full h-full overflow-visible">
                      <path
                        d="M 150 0 C 150 24, 55 20, 55 48"
                        fill="none"
                        stroke="#e0f2fe"
                        strokeWidth="1.75"
                        strokeDasharray="3 2"
                      />
                      <path
                        d="M 150 0 C 150 24, 245 20, 245 48"
                        fill="none"
                        stroke="#e0f2fe"
                        strokeWidth="1.75"
                        strokeDasharray="3 2"
                      />
                      <circle cx="150" cy="0" r="3" fill="#0ea5e9" />
                      <circle cx="55" cy="48" r="3" fill="#0ea5e9" />
                      <circle cx="245" cy="48" r="3" fill="#0ea5e9" />
                    </svg>
                  </div>

                  {/* Level 2 Children under Right */}
                  <div className="flex w-[330px] justify-between">
                    {binaryGenealogyRoot.rightChild.leftChild &&
                      renderNode(binaryGenealogyRoot.rightChild.leftChild)}
                    {binaryGenealogyRoot.rightChild.rightChild &&
                      renderNode(binaryGenealogyRoot.rightChild.rightChild)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer legend */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-100 bg-white px-5 py-3 text-xs font-normal text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span>Crown</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              <span>Diamond</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span>Platinum</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Gold</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-primary-600 font-normal">
            <GitBranch size={13} />
            <span>Interactive Node Mode Active</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
