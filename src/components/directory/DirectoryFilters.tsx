import React from 'react';
import { Search, X, SlidersHorizontal, ShieldCheck, RotateCcw, Download } from 'lucide-react';
import { DirectoryFilterState, ProjectCategory, Ecosystem } from '../../types';

interface DirectoryFiltersProps {
  filters: DirectoryFilterState;
  onChange: (updated: Partial<DirectoryFilterState>) => void;
  onReset: () => void;
  totalCount: number;
  onExport?: (format: 'csv' | 'json') => void;
}

const CATEGORIES: ('all' | ProjectCategory)[] = [
  'all',
  'DeFi',
  'Layer 1 / Layer 2',
  'Infrastructure',
  'AI x Web3',
  'DePIN',
  'Account Abstraction',
  'Interoperability',
  'Security & Audits',
  'Gaming & Social'
];

const ECOSYSTEMS: ('all' | Ecosystem)[] = [
  'all',
  'Ethereum',
  'Arbitrum',
  'Base',
  'Solana',
  'Optimism',
  'Polygon',
  'Cosmos',
  'Avalanche',
  'Monad',
  'Multi-Chain'
];

export const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
  onExport
}) => {
  const hasActiveFilters =
    filters.searchQuery.trim().length > 0 ||
    filters.category !== 'all' ||
    filters.ecosystem !== 'all' ||
    filters.partnershipOnly ||
    filters.partnershipType !== 'all';

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar & Quick Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input with glassmorphism */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            placeholder="Search Web3 projects, tags, offerings, ecosystems..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-xs"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onChange({ searchQuery: '' })}
              aria-label="Clear search input"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ecosystem Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={filters.ecosystem}
            onChange={(e) => onChange({ ecosystem: e.target.value })}
            aria-label="Filter by ecosystem"
            className="px-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs cursor-pointer"
          >
            <option value="all">All Ecosystems</option>
            {ECOSYSTEMS.filter((e) => e !== 'all').map((eco) => (
              <option key={eco} value={eco}>
                {eco}
              </option>
            ))}
          </select>

          {/* Sort By Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value as any })}
            aria-label="Sort projects"
            className="px-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs cursor-pointer"
          >
            <option value="relevance">Sort: Recommended</option>
            <option value="views">Sort: Most Viewed</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="newest">Sort: Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Segmented Category Buttons (Section 1.A interactive filter controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {CATEGORIES.map((cat) => {
          const isSelected = filters.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange({ category: cat })}
              className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          );
        })}
      </div>

      {/* Auxiliary Filter Strip: Curated Hub Toggle & Result Count */}
      <div className="flex items-center justify-between pt-1 text-xs text-neutral-500">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.partnershipOnly}
              onChange={(e) => onChange({ partnershipOnly: e.target.checked })}
              className="rounded border-neutral-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
            />
            <span className="font-medium text-neutral-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Curated Partnership Hub Members Only
            </span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <span className="tabular-nums">
            Showing <strong className="text-neutral-800">{totalCount}</strong> projects
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}

          {/* Export Dataset dropdown / trigger */}
          {onExport && (
            <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
              <button
                type="button"
                onClick={() => onExport('csv')}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                title="Download current directory view as CSV spreadsheet"
              >
                <Download className="w-3 h-3 text-neutral-500" />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={() => onExport('json')}
                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
                title="Download current directory view as JSON"
              >
                <span>JSON</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
