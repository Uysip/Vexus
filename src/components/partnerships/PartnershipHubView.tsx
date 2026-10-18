import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Handshake,
  Target,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  Send,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Web3Project, PartnershipType, PartnershipStatus, ProjectCategory, Ecosystem } from '../../types';

interface PartnershipHubViewProps {
  projects: Web3Project[];
  onSelectProject: (project: Web3Project) => void;
  onRequestListing: () => void;
}

const PARTNERSHIP_TYPES: ('all' | PartnershipType)[] = [
  'all',
  'Integration Partner',
  'Co-Marketing',
  'Liquidity / Grants',
  'Ecosystem Pilot',
  'Joint Research',
  'Security / Audit Partner'
];

const AVAILABILITY_STATUSES: ('all' | PartnershipStatus)[] = [
  'all',
  'Actively Recruiting',
  'Open to Pitches',
  'Selective Review'
];

export const PartnershipHubView: React.FC<PartnershipHubViewProps> = ({
  projects,
  onSelectProject,
  onRequestListing
}) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | PartnershipType>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | PartnershipStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter curated partners
  const curatedProjects = useMemo(() => {
    return projects.filter((p) => p.isCuratedPartner && p.isPublished);
  }, [projects]);

  const filtered = useMemo(() => {
    return curatedProjects.filter((p) => {
      // Status filter
      if (selectedStatus !== 'all' && p.partnershipStatus !== selectedStatus) {
        return false;
      }
      // Type filter
      if (
        selectedType !== 'all' &&
        !p.partnershipTypes?.some((t) => t.toLowerCase() === selectedType.toLowerCase())
      ) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const haystack = [
          p.name,
          p.tagline,
          p.description,
          p.category,
          p.primaryEcosystem,
          ...(p.whatWeOffer || []),
          ...(p.whatWeAreLookingFor || []),
          ...(p.tags || [])
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(query);
      }
      return true;
    });
  }, [curatedProjects, selectedStatus, selectedType, selectedCategory, search]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    curatedProjects.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [curatedProjects]);

  return (
    <div className="space-y-8">
      {/* Visual Distinguishing Header for Curated Partnership Hub */}
      <div className="relative rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-6 sm:p-10 overflow-hidden shadow-sm">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-medium mb-4">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Curated B2B Network · Verified Representation</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Partnership Hub
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
            Explore Web3 projects that have been reviewed and are actively open to relevant partnership opportunities. Review exact offerings, target ecosystems, and verified contact leads.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onRequestListing}
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-neutral-950 text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
            >
              Apply to Join Partnership Hub
            </button>
            <div className="text-xs text-neutral-400">
              Free listing · 48-hour curator review
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search partnership interests, grants, co-marketing, liquidity..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            aria-label="Filter by partnership availability"
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
          >
            <option value="all">All Availability Statuses</option>
            {AVAILABILITY_STATUSES.filter((s) => s !== 'all').map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Partnership Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            aria-label="Filter by partnership type"
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
          >
            <option value="all">All Partnership Types</option>
            {PARTNERSHIP_TYPES.filter((t) => t !== 'all').map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-400 text-xs shrink-0 font-medium">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Curated Partnership Profiles */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-white border border-neutral-200">
          <p className="text-sm text-neutral-600 font-medium mb-2">
            No curated partnership listings match the current filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedType('all');
              setSelectedStatus('all');
              setSelectedCategory('all');
            }}
            className="text-xs text-teal-700 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((proj) => {
            const accent = proj.customization.accentColor || '#0D9488';
            const initials = proj.name
              .split(' ')
              .map((w) => w[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group relative flex flex-col justify-between rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 p-5 sm:p-6 transition-all shadow-xs hover:shadow-sm cursor-pointer"
                style={{ borderLeft: `4px solid ${accent}` }}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white shadow-xs"
                        style={{ backgroundColor: accent }}
                      >
                        {initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-neutral-900 group-hover:text-teal-700 transition-colors">
                            {proj.name}
                          </h3>
                          {proj.partnershipStatus && (
                            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {proj.partnershipStatus}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                          <span>{proj.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{proj.primaryEcosystem}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
                    {proj.tagline || proj.description}
                  </p>

                  {/* Curated B2B Offering & Needs side-by-side comparison */}
                  <div className="space-y-2 mb-4 bg-neutral-50/70 p-3 rounded-lg border border-neutral-100 text-xs">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-teal-800 mb-1">
                        <Handshake className="w-3.5 h-3.5 text-teal-600" />
                        <span>What We Offer:</span>
                      </div>
                      <p className="text-neutral-700 line-clamp-2">
                        {proj.whatWeOffer && proj.whatWeOffer.length > 0
                          ? proj.whatWeOffer[0]
                          : 'Custom protocol partner agreements and grants.'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/60">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-800 mb-1">
                        <Target className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Looking For:</span>
                      </div>
                      <p className="text-neutral-700 line-clamp-2">
                        {proj.whatWeAreLookingFor && proj.whatWeAreLookingFor.length > 0
                          ? proj.whatWeAreLookingFor[0]
                          : 'Ecosystem protocols and integration partners.'}
                      </p>
                    </div>
                  </div>

                  {/* Partnership Types Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {proj.partnershipTypes?.map((pt) => (
                      <span
                        key={pt}
                        className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-500 mt-2">
                  <div className="flex items-center gap-1">
                    <span>Target Chains:</span>
                    <strong className="text-neutral-700 font-normal">
                      {proj.targetEcosystems?.slice(0, 3).join(', ') || proj.primaryEcosystem}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {proj.contacts && proj.contacts.length > 0 && (
                      <span className="text-[11px] text-teal-700 font-medium">
                        {proj.contacts.length} Approved Channels
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
