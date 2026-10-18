import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Handshake,
  Search,
  CheckCircle,
  Network,
  Users,
  Compass
} from 'lucide-react';
import { Web3Project } from '../../types';
import { ProjectCard } from '../cards/ProjectCard';

interface LandingPageProps {
  onNavigate: (route: string) => void;
  featuredProjects: Web3Project[];
  onSelectProject: (project: Web3Project) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  featuredProjects,
  onSelectProject
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center pt-8 sm:pt-14 pb-4">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[300px] bg-teal-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-neutral-200/90 text-neutral-800 text-xs font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Curated Web3 B2B Network · Editorial Review</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
            Discover Projects.{' '}
            <span className="text-teal-700">Build Partnerships.</span>
          </h1>

          <p className="text-sm sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            A curated network for Web3 teams to discover relevant projects, explore partnership opportunities, and connect with the people building them.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('partnerships')}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2"
            >
              <Handshake className="w-4 h-4 text-teal-600" />
              <span>Join the Partnership Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Curated Partnership Projects Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Curated Network Spotlight</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Featured Partnership Listings
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('partnerships')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All Curated Members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              variant="partnership"
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="p-8 sm:p-12 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-3xl font-bold text-neutral-900">
            How Nexus3 Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            A structured workflow designed for Web3 business development leads, founders, and ecosystem directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-neutral-900">Discover Projects</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Explore decentralized protocols, rollup architectures, and tooling categorized by category and supported chains.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-neutral-900">Find Partnership Opportunities</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Inspect explicit offers and partnership needs: grants, liquidity mining, SDK integrations, co-marketing, and pilots.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-neutral-900">Connect with Relevant Teams</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Reach verified project representatives directly via official Telegram, Calendly demo schedules, or partnership desks.
            </p>
          </div>
        </div>
      </section>

      {/* Submission CTA Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-teal-900 to-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase font-semibold text-teal-400 tracking-wider">
              Free Listing Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Expand Your Partner Network?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Join the Curated Partnership Hub to showcase what your protocol offers and connect with active ecosystem partners across EVM, Solana, and Cosmos.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('submit-project')}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-neutral-950 text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs whitespace-nowrap self-start md:self-auto"
          >
            Apply for Free Listing
          </button>
        </div>
      </section>
    </div>
  );
};
