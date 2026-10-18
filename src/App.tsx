import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { ProjectCard } from './components/cards/ProjectCard';
import { DirectoryFilters } from './components/directory/DirectoryFilters';
import { ProjectDetailModal } from './components/directory/ProjectDetailModal';
import { PartnershipHubView } from './components/partnerships/PartnershipHubView';
import { SubmitProjectForm } from './components/application/SubmitProjectForm';
import { ApplicationStatusTracker } from './components/application/ApplicationStatusTracker';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Web3Project, DirectoryFilterState, ListingApplication } from './types';
import { filterProjects } from './utils/filter-projects';
import { projectsToCsv, downloadFile } from './utils/export-data';
import { storage } from './services/storage';
import { ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [projects, setProjects] = useState<Web3Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Web3Project | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [applications, setApplications] = useState<ListingApplication[]>([]);

  // Directory filter state
  const [directoryFilters, setDirectoryFilters] = useState<DirectoryFilterState>({
    searchQuery: '',
    category: 'all',
    ecosystem: 'all',
    partnershipOnly: false,
    partnershipType: 'all',
    sortBy: 'relevance'
  });

  // Load initial data
  const loadData = () => {
    const projs = storage.getProjects();
    const apps = storage.getApplications();
    setProjects(projs);
    setApplications(apps);
  };

  useEffect(() => {
    loadData();

    // Listen to hash route changes for shareable URLs
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentRoute('landing');
        return;
      }

      if (hash.startsWith('explore/')) {
        const slug = hash.replace('explore/', '');
        const p = storage.getProjectBySlug(slug);
        if (p) {
          setSelectedProject(p);
          storage.recordProjectView(p.id);
        }
        setCurrentRoute('explore');
      } else if (hash.startsWith('partnerships/')) {
        const slug = hash.replace('partnerships/', '');
        const p = storage.getProjectBySlug(slug);
        if (p) {
          setSelectedProject(p);
          storage.recordProjectView(p.id);
        }
        setCurrentRoute('partnerships');
      } else if (['explore', 'partnerships', 'submit-project', 'application-status', 'admin', 'how-it-works'].includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Web3Project) => {
    setSelectedProject(project);
    storage.recordProjectView(project.id);
    window.location.hash = `#/explore/${project.slug}`;
    loadData();
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    if (currentRoute === 'explore') {
      window.location.hash = '#/explore';
    } else if (currentRoute === 'partnerships') {
      window.location.hash = '#/partnerships';
    }
  };

  const handleContactProject = (project: Web3Project) => {
    setSelectedProject(project);
  };

  // Filtered projects for public directory
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, directoryFilters);
  }, [projects, directoryFilters]);

  // Featured curated projects for landing page
  const featuredCuratedProjects = useMemo(() => {
    return projects.filter((p) => p.isCuratedPartner && p.isPublished);
  }, [projects]);

  const pendingCount = applications.filter(
    (a) => a.status === 'Pending' || a.status === 'Under Review'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-neutral-900 selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isAdmin={isAdminMode}
        onToggleAdmin={() => {
          setIsAdminMode(!isAdminMode);
          if (!isAdminMode) {
            handleNavigate('admin');
          } else {
            handleNavigate('explore');
          }
        }}
        pendingApplicationsCount={pendingCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Route: Admin Console */}
        {currentRoute === 'admin' ? (
          <AdminDashboard
            onRefreshData={loadData}
            onExitAdmin={() => handleNavigate('explore')}
          />
        ) : currentRoute === 'partnerships' ? (
          /* Route: Curated Partnership Hub */
          <PartnershipHubView
            projects={projects}
            onSelectProject={handleSelectProject}
            onRequestListing={() => handleNavigate('submit-project')}
          />
        ) : currentRoute === 'submit-project' ? (
          /* Route: Request a Listing Form */
          <SubmitProjectForm
            onSuccess={(app) => {
              loadData();
            }}
            onNavigateStatus={() => handleNavigate('application-status')}
          />
        ) : currentRoute === 'application-status' ? (
          /* Route: Application Status Lookup */
          <ApplicationStatusTracker
            onNavigateExplore={() => handleNavigate('partnerships')}
            onNavigateSubmit={() => handleNavigate('submit-project')}
          />
        ) : currentRoute === 'how-it-works' ? (
          /* Route: How It Works Dedicated View */
          <div className="max-w-3xl mx-auto space-y-8 py-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Web3 B2B Protocol Collaboration</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                How the Nexus3 Partnership Network Works
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto">
                Unlike consumer crypto aggregators or token price terminals, Nexus3 exists purely to connect protocol business development teams, ecosystem grants, and technical integration leads.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0">
                  01
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Free Application & Identity Verification
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Core contributors and BD leads apply with verified contact information, official documentation, and explicit statements of what they offer and what they seek.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0">
                  02
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Editorial Review & Structured Onboarding
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Every Curated Partnership Hub listing is independently evaluated. We verify GitHub repos, mainnet contracts, and ensure that commercial partnership claims are accurate.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0">
                  03
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Direct High-Fidelity Connections
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Builders skip the noise of public Discord servers and connect directly via designated Telegram handles, Calendly booking links, and official partnership inboxes.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => handleNavigate('submit-project')}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
              >
                Apply for Free Curated Listing
              </button>
            </div>
          </div>
        ) : currentRoute === 'explore' ? (
          /* Route: Public Project Directory */
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">
                Web3 Project Directory
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600">
                Explore verified decentralized protocols, Layer 2 networks, and developer infrastructure across ecosystems.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <DirectoryFilters
              filters={directoryFilters}
              onChange={(updated) =>
                setDirectoryFilters((prev) => ({ ...prev, ...updated }))
              }
              onReset={() =>
                setDirectoryFilters({
                  searchQuery: '',
                  category: 'all',
                  ecosystem: 'all',
                  partnershipOnly: false,
                  partnershipType: 'all',
                  sortBy: 'relevance'
                })
              }
              totalCount={filteredProjects.length}
              onExport={(format) => {
                const dateStr = new Date().toISOString().split('T')[0];
                if (format === 'csv') {
                  const csv = projectsToCsv(filteredProjects);
                  downloadFile(csv, `nexus3-directory-${dateStr}.csv`, 'text/csv;charset=utf-8;');
                } else {
                  const json = JSON.stringify(filteredProjects, null, 2);
                  downloadFile(json, `nexus3-directory-${dateStr}.json`, 'application/json');
                }
              }}
            />

            {/* Project Grid */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-neutral-200 shadow-xs">
                <p className="text-sm font-semibold text-neutral-800 mb-1">
                  No projects match your filter criteria
                </p>
                <p className="text-xs text-neutral-500 mb-4">
                  Try adjusting your search terms or clearing active filters.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setDirectoryFilters({
                      searchQuery: '',
                      category: 'all',
                      ecosystem: 'all',
                      partnershipOnly: false,
                      partnershipType: 'all',
                      sortBy: 'relevance'
                    })
                  }
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={handleSelectProject}
                    onContactClick={handleContactProject}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Route: Landing Page (default) */
          <LandingPage
            onNavigate={handleNavigate}
            featuredProjects={featuredCuratedProjects}
            onSelectProject={handleSelectProject}
          />
        )}
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseModal}
        onSelectRelated={handleSelectProject}
        allProjects={projects}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
