import React, { useState } from 'react';
import {
  Shield,
  FileText,
  Layers,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Edit3,
  Eye,
  MousePointerClick,
  Sparkles,
  Save,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Database
} from 'lucide-react';
import {
  ListingApplication,
  Web3Project,
  ApplicationStatus,
  PartnershipStatus
} from '../../types';
import { storage } from '../../services/storage';
import { projectsToCsv, applicationsToCsv, downloadFile } from '../../utils/export-data';

interface AdminDashboardProps {
  onRefreshData: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onRefreshData,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'listings' | 'analytics'>('applications');
  const [selectedApp, setSelectedApp] = useState<ListingApplication | null>(null);
  const [internalNote, setInternalNote] = useState('');
  const [reviewerName, setReviewerName] = useState('Nexus Lead Curator');
  const [editingProject, setEditingProject] = useState<Web3Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const applications = storage.getApplications();
  const projects = storage.getProjects();
  const analytics = storage.getAnalytics();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    const updated = storage.updateApplicationStatus(appId, status, internalNote, reviewerName);
    if (updated) {
      setSelectedApp(updated);
      setInternalNote('');
      showToast(`Application updated to ${status}.`);
      onRefreshData();
    }
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    storage.updateProject(editingProject);
    showToast(`Listing for ${editingProject.name} updated.`);
    setEditingProject(null);
    onRefreshData();
  };

  const handleTogglePublish = (project: Web3Project) => {
    const updated = { ...project, isPublished: !project.isPublished };
    storage.updateProject(updated);
    showToast(`${project.name} is now ${updated.isPublished ? 'published' : 'hidden'}.`);
    onRefreshData();
  };

  const handleToggleCuratedStatus = (project: Web3Project) => {
    const updated = { ...project, isCuratedPartner: !project.isCuratedPartner };
    storage.updateProject(updated);
    showToast(`${project.name} curated membership updated.`);
    onRefreshData();
  };

  return (
    <div className="space-y-6">
      {/* Admin Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">Administrator Console</h1>
              <span className="text-[10px] uppercase font-semibold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30">
                Staff Verified
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Review incoming listing requests, configure curated partner branding, and monitor connection metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <button
            type="button"
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Exit Console
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 rounded-xl text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-neutral-200 pb-px">
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'applications'
              ? 'border-teal-600 text-neutral-900 font-semibold'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Listing Applications</span>
          <span className="ml-1 bg-neutral-100 text-neutral-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {applications.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'listings'
              ? 'border-teal-600 text-neutral-900 font-semibold'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Curated Listings Manager</span>
          <span className="ml-1 bg-neutral-100 text-neutral-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {projects.filter((p) => p.isCuratedPartner).length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'analytics'
              ? 'border-teal-600 text-neutral-900 font-semibold'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Connection Metrics</span>
        </button>
      </div>

      {/* TAB 1: APPLICATIONS REVIEW */}
      {activeTab === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Queue Column */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
              Review Queue ({applications.length})
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {applications.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50/60 border-teal-500 shadow-xs'
                        : 'bg-white border-neutral-200/80 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-neutral-900">{app.projectName}</span>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {app.referenceCode}
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-500 mb-2">
                      {app.category} · {app.representativeName}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          app.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'Under Review'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'More Information Required'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {app.status}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Detail Inspection Column */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-6">
                {/* Header & Status Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-neutral-900">
                        {selectedApp.projectName}
                      </h2>
                      <span className="font-mono text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                        {selectedApp.referenceCode}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      Submitted on {new Date(selectedApp.submittedAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Review Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedApp.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve to Curated Hub</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedApp.id, 'Under Review')}
                      className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-medium rounded-lg transition-colors"
                    >
                      Under Review
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedApp.id, 'More Information Required')}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-medium rounded-lg transition-colors"
                    >
                      Request Info
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedApp.id, 'Rejected')}
                      className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 text-xs font-medium rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Submitted Content Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Representative:</span>
                    <strong className="text-neutral-900">
                      {selectedApp.representativeName} ({selectedApp.representativeRole})
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Official Links:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={selectedApp.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-700 hover:underline inline-flex items-center gap-1"
                      >
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                      {selectedApp.xAccount && (
                        <span className="text-neutral-600">𝕏 {selectedApp.xAccount}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Contact Channels:</span>
                    <span className="text-neutral-800">
                      {selectedApp.contactEmail} {selectedApp.contactTelegram && `· TG: ${selectedApp.contactTelegram}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Target Ecosystems:</span>
                    <span className="text-neutral-800">
                      {selectedApp.targetEcosystems.join(', ')}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1">
                    Project Description
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                    {selectedApp.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-teal-50/60 rounded-xl border border-teal-100 text-xs">
                    <span className="font-semibold text-teal-950 block mb-1">What They Offer:</span>
                    <p className="text-neutral-700">{selectedApp.whatWeOffer}</p>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                    <span className="font-semibold text-neutral-900 block mb-1">What They Need:</span>
                    <p className="text-neutral-700">{selectedApp.whatWeAreLookingFor}</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-neutral-900 block mb-1">
                    Reason for Applying:
                  </span>
                  <p className="text-xs text-neutral-600 italic">
                    "{selectedApp.applicationReason}"
                  </p>
                </div>

                {/* Review Notes Section */}
                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Curator Audit Trail & Notes</span>
                  </h4>

                  {selectedApp.reviewNotes && selectedApp.reviewNotes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedApp.reviewNotes.map((n, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-neutral-100 text-xs text-neutral-700">
                          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-0.5">
                            <span className="font-semibold text-neutral-700">{n.author}</span>
                            <span>{new Date(n.timestamp).toLocaleString()}</span>
                          </div>
                          <p>{n.note}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400">No review notes recorded yet.</p>
                  )}

                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={2}
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      placeholder="Add internal review observation or feedback note..."
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (!internalNote.trim()) return;
                          handleStatusChange(selectedApp.id, selectedApp.status);
                        }}
                        className="px-3 py-1 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-medium rounded-md transition-colors"
                      >
                        Save Note Only
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-white border border-neutral-200 text-center text-neutral-500 text-xs">
                Select an application from the queue to view details and make editorial decisions.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CURATED LISTINGS MANAGER */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900">
              Curated Partnership Listings ({projects.filter((p) => p.isCuratedPartner).length})
            </h3>
            <span className="text-xs text-neutral-500">
              Approved projects can be modified, rebranded, or unpublished below.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {projects
              .filter((p) => p.isCuratedPartner)
              .map((proj) => {
                const isEditing = editingProject?.id === proj.id;
                const accent = proj.customization.accentColor || '#0D9488';

                return (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl bg-white border border-neutral-200/90 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xs"
                          style={{ backgroundColor: accent }}
                        >
                          {proj.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-neutral-900">{proj.name}</h4>
                            <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                              {proj.partnershipStatus || 'Curated'}
                            </span>
                            {!proj.isPublished && (
                              <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                                Draft / Hidden
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">
                            {proj.category} · Primary: {proj.primaryEcosystem}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(isEditing ? null : { ...proj })}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isEditing ? 'Close Editor' : 'Edit Branding & Offers'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTogglePublish(proj)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            proj.isPublished
                              ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {proj.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </div>

                    {/* Inline Editor if expanded */}
                    {isEditing && (
                      <form onSubmit={handleSaveListing} className="pt-4 border-t border-neutral-100 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-800 mb-1">
                              Accent Color (Hex)
                            </label>
                            <input
                              type="text"
                              value={editingProject.customization.accentColor}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  customization: {
                                    ...editingProject.customization,
                                    accentColor: e.target.value
                                  }
                                })
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-800 mb-1">
                              Partnership Status
                            </label>
                            <select
                              value={editingProject.partnershipStatus || 'Open to Pitches'}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  partnershipStatus: e.target.value as PartnershipStatus
                                })
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900"
                            >
                              <option value="Open to Pitches">Open to Pitches</option>
                              <option value="Actively Recruiting">Actively Recruiting</option>
                              <option value="Selective Review">Selective Review</option>
                              <option value="Paused">Paused</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-800 mb-1">
                              Custom Badge Text
                            </label>
                            <input
                              type="text"
                              value={editingProject.customization.badgeText || ''}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  customization: {
                                    ...editingProject.customization,
                                    badgeText: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. Curated Network Member"
                              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-800 mb-1">
                            What We Offer (One per line)
                          </label>
                          <textarea
                            rows={3}
                            value={editingProject.whatWeOffer?.join('\n') || ''}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                whatWeOffer: e.target.value.split('\n').filter(Boolean)
                              })
                            }
                            className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-800 mb-1">
                            What We Are Looking For (One per line)
                          </label>
                          <textarea
                            rows={3}
                            value={editingProject.whatWeAreLookingFor?.join('\n') || ''}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                whatWeAreLookingFor: e.target.value.split('\n').filter(Boolean)
                              })
                            }
                            className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS & CONNECTION METRICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">Total Profile Views</span>
              <div className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                {analytics.totalViews.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">Contact Channel Clicks</span>
              <div className="text-2xl font-bold text-teal-700 font-mono tabular-nums">
                {analytics.totalContactClicks.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">Total Applications</span>
              <div className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
                {analytics.totalApplications}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs">
              <span className="text-xs text-neutral-500 block mb-1">Approval Rate</span>
              <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">
                {analytics.totalApplications > 0
                  ? Math.round((analytics.approvedCount / analytics.totalApplications) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>

          {/* Project Engagement Leaderboard */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
              Top Engaged Web3 Projects (BD Inbound Volume)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400">
                    <th className="pb-2 font-medium">Project Name</th>
                    <th className="pb-2 font-medium text-right">Directory Views</th>
                    <th className="pb-2 font-medium text-right">Contact Clicks</th>
                    <th className="pb-2 font-medium text-right">Conversion Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {analytics.projectPerformance.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50/60">
                      <td className="py-2.5 font-semibold text-neutral-800">{item.name}</td>
                      <td className="py-2.5 text-right font-mono tabular-nums text-neutral-600">
                        {item.views}
                      </td>
                      <td className="py-2.5 text-right font-mono tabular-nums text-teal-700 font-semibold">
                        {item.clicks}
                      </td>
                      <td className="py-2.5 text-right font-mono tabular-nums text-neutral-500">
                        {item.views > 0 ? ((item.clicks / item.views) * 100).toFixed(1) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Portability & Export Center */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                Data Portability & Administrative Exports
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Export platform listings, partnership criteria, and review submissions into standard RFC-compliant CSV or JSON format for external CRM, spreadsheet analysis, or database migration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Directory & Curated Projects</h4>
                  <p className="text-[11px] text-neutral-500">
                    Includes all {projects.length} verified projects, offerings, needs, and branding tokens.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const csv = projectsToCsv(projects);
                      downloadFile(csv, `nexus3-projects-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
                      showToast('Projects CSV downloaded successfully.');
                    }}
                    className="flex-1 py-1.5 px-3 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Download CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const json = JSON.stringify(projects, null, 2);
                      downloadFile(json, `nexus3-projects-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
                      showToast('Projects JSON downloaded successfully.');
                    }}
                    className="flex-1 py-1.5 px-3 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Applications & Review Audit Trail</h4>
                  <p className="text-[11px] text-neutral-500">
                    Includes all {applications.length} submitted applications, reviewer notes, and contacts.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const csv = applicationsToCsv(applications);
                      downloadFile(csv, `nexus3-applications-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
                      showToast('Applications CSV downloaded successfully.');
                    }}
                    className="flex-1 py-1.5 px-3 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Download CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const json = JSON.stringify(applications, null, 2);
                      downloadFile(json, `nexus3-applications-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
                      showToast('Applications JSON downloaded successfully.');
                    }}
                    className="flex-1 py-1.5 px-3 bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
