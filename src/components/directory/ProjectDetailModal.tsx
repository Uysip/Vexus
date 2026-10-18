import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  Mail,
  Calendar,
  Globe,
  FileText,
  Github,
  CheckCircle,
  Sparkles,
  Handshake,
  Target,
  Share2
} from 'lucide-react';
import { Web3Project, ContactMethod } from '../../types';
import { storage } from '../../services/storage';

interface ProjectDetailModalProps {
  project: Web3Project | null;
  onClose: () => void;
  onSelectRelated?: (project: Web3Project) => void;
  allProjects?: Web3Project[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectRelated,
  allProjects = []
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<string | null>(null);

  if (!project) return null;

  const accent = project.customization.accentColor || '#0D9488';
  const isPartnership = project.isCuratedPartner;

  const initials = project.name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleContactAction = (method: ContactMethod) => {
    storage.recordContactClick(project.id, method.type);
    setContactFeedback(`Contacting via ${method.label} (${method.value})`);
    setTimeout(() => setContactFeedback(null), 4000);

    if (method.type === 'email') {
      window.location.href = `mailto:${method.value}?subject=Nexus3 Partnership Inquiry for ${project.name}`;
    } else if (method.type === 'calendly' || method.value.startsWith('http')) {
      window.open(method.value, '_blank', 'noopener,noreferrer');
    } else if (method.type === 'telegram') {
      const handle = method.value.replace('@', '');
      window.open(`https://t.me/${handle}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find 2 related projects in same category
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.primaryEcosystem === project.primaryEcosystem))
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-900/40 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl border border-neutral-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Cover Artwork */}
        <div
          className="h-28 sm:h-36 w-full relative flex items-end px-6 pb-4"
          style={{
            background: `linear-gradient(135deg, ${accent}22 0%, ${accent}08 100%)`,
            borderBottom: `2px solid ${accent}`
          }}
        >
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 rounded-full bg-white/80 p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-white shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Share button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Copy share link"
            className="absolute right-14 top-4 rounded-full bg-white/80 p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-white shadow-xs transition-colors flex items-center gap-1 text-xs px-2.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Identity Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mt-12 sm:-mt-14 relative z-10">
            <div className="flex items-end gap-3.5">
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-xl text-xl sm:text-2xl font-bold text-white shadow-md border-4 border-white"
                style={{ backgroundColor: accent }}
              >
                {initials || 'W3'}
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2
                    id="project-modal-title"
                    className="text-xl sm:text-2xl font-bold text-neutral-900"
                  >
                    {project.name}
                  </h2>
                  {isPartnership && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      Curated Hub Member
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Primary: {project.primaryEcosystem}</span>
                  {project.partnershipStatus && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-teal-700 font-medium">{project.partnershipStatus}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Official Web & Doc Links */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              {project.websiteUrl && (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              )}
              {project.xUrl && (
                <a
                  href={project.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  aria-label="X (Twitter) Profile"
                >
                  𝕏
                </a>
              )}
              {project.docsUrl && (
                <a
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Docs</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
            {project.tagline}
          </p>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Curated B2B Sections: What We Offer & What We Are Looking For */}
          {isPartnership && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* What We Offer */}
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-900 mb-2.5">
                  <Handshake className="w-4 h-4 text-teal-600" />
                  <span>What We Offer to Partners</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {project.whatWeOffer && project.whatWeOffer.length > 0 ? (
                    project.whatWeOffer.map((offer, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{offer}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-neutral-500">Contact the team for custom partner agreements.</li>
                  )}
                </ul>
              </div>

              {/* What We Are Looking For */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 mb-2.5">
                  <Target className="w-4 h-4 text-neutral-700" />
                  <span>What We Are Looking For</span>
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {project.whatWeAreLookingFor && project.whatWeAreLookingFor.length > 0 ? (
                    project.whatWeAreLookingFor.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 mt-1.5" />
                        <span>{need}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-neutral-500">Open to strategic ecosystem opportunities.</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Tags & Supported Ecosystems */}
          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs font-semibold text-neutral-900 block mb-1.5">
                Supported Ecosystems
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.supportedEcosystems.map((eco) => (
                  <span
                    key={eco}
                    className="text-xs bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md"
                  >
                    {eco}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-neutral-900 block mb-1.5">
                Capabilities & Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Approved Contact Channels */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-3">
              Approved Partnership Channels
            </h4>

            {contactFeedback && (
              <div className="mb-3 p-2.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                <span>{contactFeedback}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              {project.contacts && project.contacts.length > 0 ? (
                project.contacts.map((contact, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleContactAction(contact)}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 transition-colors shadow-xs"
                  >
                    {contact.type === 'telegram' && <Send className="w-3.5 h-3.5 text-sky-500" />}
                    {contact.type === 'email' && <Mail className="w-3.5 h-3.5 text-neutral-500" />}
                    {contact.type === 'calendly' && <Calendar className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{contact.label}</span>
                    <span className="text-neutral-400 font-mono text-[11px]">({contact.value})</span>
                  </button>
                ))
              ) : (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Official Website to Connect</span>
                </a>
              )}
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && onSelectRelated && (
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-semibold text-neutral-900 tracking-wide mb-3">
                Related {project.category} Projects
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedProjects.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-lg border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/50 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">{rel.name}</div>
                      <div className="text-[11px] text-neutral-500 line-clamp-1">{rel.tagline}</div>
                    </div>
                    <span className="text-xs text-teal-700 font-medium">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
