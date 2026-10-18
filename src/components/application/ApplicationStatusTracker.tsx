import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, XCircle, AlertCircle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { ListingApplication } from '../../types';
import { storage } from '../../services/storage';

interface ApplicationStatusTrackerProps {
  onNavigateExplore: () => void;
  onNavigateSubmit: () => void;
}

export const ApplicationStatusTracker: React.FC<ApplicationStatusTrackerProps> = ({
  onNavigateExplore,
  onNavigateSubmit
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedApp, setMatchedApp] = useState<ListingApplication | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const apps = storage.getApplications();
    const cleanQuery = query.trim().toUpperCase();

    const found = apps.find(
      (a) =>
        a.referenceCode.toUpperCase() === cleanQuery ||
        a.contactEmail.toLowerCase() === query.trim().toLowerCase() ||
        a.projectName.toLowerCase() === query.trim().toLowerCase()
    );

    setMatchedApp(found || null);
    setSearched(true);
  };

  const getStatusBadge = (status: ListingApplication['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved & Curated
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Under Active Review
          </span>
        );
      case 'More Information Required':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
            More Info Requested
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            Not Accepted
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
          Track Listing Application
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Enter your Application Reference Code (e.g. <span className="font-mono font-medium">APP-8392</span>) or contact email to check review status.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="APP-XXXX or partnerships@yourproject.io"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
        >
          Check Status
        </button>
      </form>

      {/* Result Display */}
      {searched && (
        <div>
          {matchedApp ? (
            <div className="rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-neutral-900">
                      {matchedApp.projectName}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400">
                      {matchedApp.referenceCode}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    Submitted on {new Date(matchedApp.submittedAt).toLocaleDateString()} by{' '}
                    {matchedApp.representativeName} ({matchedApp.representativeRole})
                  </div>
                </div>

                <div>{getStatusBadge(matchedApp.status)}</div>
              </div>

              {/* Status Explanation */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 text-xs space-y-2">
                <div className="font-semibold text-neutral-900">Review Summary:</div>
                {matchedApp.status === 'Approved' && (
                  <p className="text-emerald-800">
                    Congratulations! This application has been approved by the Nexus3 editorial board and automatically published to the Curated Partnership Hub.
                  </p>
                )}
                {matchedApp.status === 'Under Review' && (
                  <p className="text-amber-800">
                    Your application is currently being evaluated by our Web3 partnership curation team. We verify core smart contract repos, team authenticity, and partnership alignment.
                  </p>
                )}
                {matchedApp.status === 'More Information Required' && (
                  <p className="text-blue-800">
                    Our curators need additional technical documentation or proof of ecosystem deployment before finalizing approval. Please check notes below.
                  </p>
                )}
                {matchedApp.status === 'Rejected' && (
                  <p className="text-red-800">
                    This submission does not meet current Curated Partnership Hub criteria at this time. You may submit an updated application in 30 days.
                  </p>
                )}
                {matchedApp.status === 'Pending' && (
                  <p className="text-neutral-600">
                    Your application is queued in the review pipeline. Expected review time is within 48 business hours.
                  </p>
                )}
              </div>

              {/* Internal Notes / Feedback (if available) */}
              {matchedApp.reviewNotes && matchedApp.reviewNotes.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                    Curator Feedback & Notes
                  </h4>
                  <div className="space-y-2">
                    {matchedApp.reviewNotes.map((note, i) => (
                      <div key={i} className="p-3 rounded-lg bg-neutral-100 text-xs text-neutral-700">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                          <span className="font-semibold text-neutral-600">{note.author}</span>
                          <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p>{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submitted Details Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-600 border-t border-neutral-100">
                <div>
                  <span className="font-medium text-neutral-800 block">Category & Target Chains:</span>
                  <span>{matchedApp.category} · {matchedApp.targetEcosystems.join(', ')}</span>
                </div>
                <div>
                  <span className="font-medium text-neutral-800 block">Partnership Types:</span>
                  <span>{matchedApp.preferredPartnershipTypes.join(', ')}</span>
                </div>
              </div>

              {matchedApp.status === 'Approved' && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onNavigateExplore}
                    className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <span>View in Partnership Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 text-center">
              <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-neutral-800 mb-1">
                No matching application found
              </p>
              <p className="text-xs text-neutral-500 mb-4 max-w-sm mx-auto">
                Please double-check the reference code format (e.g. <span className="font-mono">APP-8392</span>) or submit a new listing request.
              </p>
              <button
                type="button"
                onClick={onNavigateSubmit}
                className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Submit New Application
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
