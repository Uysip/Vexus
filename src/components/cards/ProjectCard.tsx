import React from 'react';
import { ExternalLink, ArrowRight, ShieldCheck, Handshake, Sparkles } from 'lucide-react';
import { Web3Project } from '../../types';

interface ProjectCardProps {
  project: Web3Project;
  onSelect: (project: Web3Project) => void;
  onContactClick?: (project: Web3Project) => void;
  variant?: 'directory' | 'partnership' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onContactClick,
  variant = 'directory'
}) => {
  const accent = project.customization.accentColor || '#0D9488';
  const isPartnership = project.isCuratedPartner;

  // Generate clean initials for fallback logo
  const initials = project.name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent modal open when clicking external link
    if ((e.target as HTMLElement).closest('a')) return;
    onSelect(project);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between rounded-xl bg-white p-5 transition-all duration-200 cursor-pointer border hover:shadow-md ${
        isPartnership
          ? 'border-neutral-200/90 shadow-xs'
          : 'border-neutral-200/70 shadow-xs'
      }`}
      style={{
        borderTop: `3px solid ${accent}`
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Logo or Fallback Monogram */}
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold tracking-tight text-white shadow-xs"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            >
              {initials || 'W3'}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base font-semibold text-neutral-900 group-hover:text-teal-700 transition-colors">
                  {project.name}
                </h3>
                {isPartnership && (
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 bg-teal-50/80 px-2 py-0.5 rounded"
                    title="Officially Reviewed Curated Network Member"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Curated Hub
                  </span>
                )}
              </div>

              {/* Unboxed metadata line with typographic bullet separators */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-0.5">
                <span>{project.category}</span>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>{project.primaryEcosystem}</span>
              </div>
            </div>
          </div>

          {/* External link icon */}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit official website of ${project.name}`}
              className="text-neutral-400 hover:text-neutral-700 p-1 rounded transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Tagline / Short Description */}
        <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mb-3 leading-relaxed">
          {project.tagline || project.description}
        </p>

        {/* Partnership Highlights (if curated partner or partnership view) */}
        {isPartnership && project.whatWeOffer && project.whatWeOffer.length > 0 && (
          <div className="mb-3.5 p-2.5 rounded-lg bg-neutral-50/80 border border-neutral-100 text-xs text-neutral-700">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-900 mb-1">
              <Handshake className="w-3 h-3 text-teal-600" />
              <span>Offering:</span>
            </div>
            <p className="line-clamp-1 text-neutral-600">
              {project.whatWeOffer[0]}
            </p>
          </div>
        )}

        {/* Tags / Capabilities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-neutral-600 bg-neutral-100/80 px-2 py-0.5 rounded font-normal"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[11px] text-neutral-400 self-center">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Action Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-1">
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono tabular-nums">
          <span>{project.viewCount || 0} views</span>
        </div>

        <div className="flex items-center gap-2">
          {isPartnership && onContactClick && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onContactClick(project);
              }}
              className="px-2.5 py-1 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 rounded transition-colors"
            >
              Contact BD
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 group-hover:translate-x-0.5 transition-all"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
