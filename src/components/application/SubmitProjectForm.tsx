import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { ProjectCategory, Ecosystem, PartnershipType, ListingApplication } from '../../types';
import { validateApplicationForm, ApplicationFormInput } from '../../utils/filter-projects';
import { storage } from '../../services/storage';

interface SubmitProjectFormProps {
  onSuccess: (application: ListingApplication) => void;
  onNavigateStatus: () => void;
}

const CATEGORIES: ProjectCategory[] = [
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

const ECOSYSTEMS: Ecosystem[] = [
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

const PARTNERSHIP_TYPES: PartnershipType[] = [
  'Integration Partner',
  'Co-Marketing',
  'Liquidity / Grants',
  'Ecosystem Pilot',
  'Joint Research',
  'Security / Audit Partner'
];

const ACCENT_PRESETS = [
  { label: 'Teal', color: '#0D9488' },
  { label: 'Indigo', color: '#6366F1' },
  { label: 'Emerald', color: '#059669' },
  { label: 'Amber', color: '#D97706' },
  { label: 'Sky', color: '#0284C7' },
  { label: 'Violet', color: '#7C3AED' }
];

export const SubmitProjectForm: React.FC<SubmitProjectFormProps> = ({
  onSuccess,
  onNavigateStatus
}) => {
  const [formData, setFormData] = useState<ApplicationFormInput>({
    projectName: '',
    website: '',
    xAccount: '',
    description: '',
    category: 'DeFi',
    representativeName: '',
    representativeRole: '',
    contactEmail: '',
    contactTelegram: '',
    whatWeOffer: '',
    whatWeAreLookingFor: '',
    preferredPartnershipTypes: ['Integration Partner'],
    targetEcosystems: ['Ethereum'],
    applicationReason: '',
    consentGiven: false
  });

  const [accentColor, setAccentColor] = useState('#0D9488');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ListingApplication | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const toggleArrayItem = (field: 'preferredPartnershipTypes' | 'targetEcosystems', item: string) => {
    setFormData((prev) => {
      const current = prev[field] as string[];
      const exists = current.includes(item);
      const updated = exists ? current.filter((x) => x !== item) : [...current, item];
      return { ...prev, [field]: updated };
    });
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateApplicationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      // Scroll to first error
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    try {
      const application = storage.submitApplication(formData, accentColor);
      setSubmittedApp(application);
      onSuccess(application);
    } catch (err) {
      console.error(err);
      setErrors({ global: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // If successfully submitted, render pristine confirmation receipt
  if (submittedApp) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="rounded-2xl bg-white border border-neutral-200 p-8 sm:p-10 shadow-sm text-center">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-200">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Listing Application Submitted!
          </h2>

          <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto">
            Thank you, {submittedApp.representativeName}. Your application for{' '}
            <strong>{submittedApp.projectName}</strong> has been received and queued for review.
          </p>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 mb-6 inline-block w-full max-w-sm text-left">
            <div className="text-xs text-neutral-500 mb-1">Your Application Reference Code:</div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xl font-bold tracking-wider text-neutral-900">
                {submittedApp.referenceCode}
              </span>
              <button
                type="button"
                onClick={() => handleCopyCode(submittedApp.referenceCode)}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-[11px] text-neutral-400 mt-2">
              Save this reference code to check your review status anytime.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onNavigateStatus}
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              Track Application Status
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmittedApp(null);
                setFormData({
                  projectName: '',
                  website: '',
                  xAccount: '',
                  description: '',
                  category: 'DeFi',
                  representativeName: '',
                  representativeRole: '',
                  contactEmail: '',
                  contactTelegram: '',
                  whatWeOffer: '',
                  whatWeAreLookingFor: '',
                  preferredPartnershipTypes: ['Integration Partner'],
                  targetEcosystems: ['Ethereum'],
                  applicationReason: '',
                  consentGiven: false
                });
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
            >
              Submit Another Project
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium mb-3">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Free Network Application · Curated Review</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
          Request a Listing in the Partnership Hub
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Apply to list your Web3 project in the Curated Partnership Hub. Communicate your partnership offerings, ecosystem needs, and approved BD contact channels to fellow builders.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {errors.global && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errors.global}</span>
          </div>
        )}

        {/* Section 1: Project Identity */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 tracking-wide uppercase border-b border-neutral-100 pb-2">
            1. Project Identity & Web Presence
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleTextChange}
                placeholder="e.g. Nexus Protocol"
                className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.projectName ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.projectName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.projectName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Official Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleTextChange}
                placeholder="https://yourproject.io"
                className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.website ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.website && (
                <p className="text-[11px] text-red-600 mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Official X (Twitter) Handle
              </label>
              <input
                type="text"
                name="xAccount"
                value={formData.xAccount}
                onChange={handleTextChange}
                placeholder="@yourproject"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Primary Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleTextChange}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleTextChange}
              placeholder="Provide a clear, hype-free summary of your protocol, infrastructure, or application..."
              className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                errors.description ? 'border-red-400' : 'border-neutral-200'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Accent Color Preset Picker */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Project Card Accent Color
            </label>
            <div className="flex items-center gap-2">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  type="button"
                  onClick={() => setAccentColor(preset.color)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border transition-all ${
                    accentColor === preset.color
                      ? 'border-neutral-900 bg-neutral-100 font-semibold'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Representative Contact */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 tracking-wide uppercase border-b border-neutral-100 pb-2">
            2. Representative & Verified Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Representative Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="representativeName"
                value={formData.representativeName}
                onChange={handleTextChange}
                placeholder="e.g. Sarah Jenkins"
                className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.representativeName ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.representativeName && (
                <p className="text-[11px] text-red-600 mt-1">{errors.representativeName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Your Role / Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="representativeRole"
                value={formData.representativeRole}
                onChange={handleTextChange}
                placeholder="e.g. VP Ecosystem & Partnerships"
                className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.representativeRole ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.representativeRole && (
                <p className="text-[11px] text-red-600 mt-1">{errors.representativeRole}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleTextChange}
                placeholder="partnerships@yourproject.io"
                className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                  errors.contactEmail ? 'border-red-400' : 'border-neutral-200'
                }`}
              />
              {errors.contactEmail && (
                <p className="text-[11px] text-red-600 mt-1">{errors.contactEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Direct Telegram Handle (Optional)
              </label>
              <input
                type="text"
                name="contactTelegram"
                value={formData.contactTelegram}
                onChange={handleTextChange}
                placeholder="@username_BD"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section 3: B2B Partnership Value Proposition */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 tracking-wide uppercase border-b border-neutral-100 pb-2">
            3. Partnership Hub Value & Criteria
          </h2>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              What Does Your Project Offer to Partners? <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-neutral-500 mb-1.5">
              Specific grants, liquidity seeding, developer tooling, SDK integrations, joint marketing, or research support.
            </p>
            <textarea
              name="whatWeOffer"
              rows={3}
              value={formData.whatWeOffer}
              onChange={handleTextChange}
              placeholder="e.g. $25k integration grant, free testnet RPC endpoints, and co-marketing push across 50k followers."
              className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                errors.whatWeOffer ? 'border-red-400' : 'border-neutral-200'
              }`}
            />
            {errors.whatWeOffer && (
              <p className="text-[11px] text-red-600 mt-1">{errors.whatWeOffer}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              What Is Your Project Looking For? <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-neutral-500 mb-1.5">
              Types of protocols, rollups, wallet partners, audit firms, or pilot design partners you want to connect with.
            </p>
            <textarea
              name="whatWeAreLookingFor"
              rows={3}
              value={formData.whatWeAreLookingFor}
              onChange={handleTextChange}
              placeholder="e.g. DeFi protocols looking to integrate our passkey SDK; Arbitrum rollups needing cross-chain liquidity."
              className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                errors.whatWeAreLookingFor ? 'border-red-400' : 'border-neutral-200'
              }`}
            />
            {errors.whatWeAreLookingFor && (
              <p className="text-[11px] text-red-600 mt-1">{errors.whatWeAreLookingFor}</p>
            )}
          </div>

          {/* Preferred Partnership Types */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Preferred Partnership Types <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {PARTNERSHIP_TYPES.map((type) => {
                const isSelected = formData.preferredPartnershipTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayItem('preferredPartnershipTypes', type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            {errors.preferredPartnershipTypes && (
              <p className="text-[11px] text-red-600 mt-1">{errors.preferredPartnershipTypes}</p>
            )}
          </div>

          {/* Target Ecosystems */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
              Target Ecosystems <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ECOSYSTEMS.map((eco) => {
                const isSelected = formData.targetEcosystems.includes(eco);
                return (
                  <button
                    key={eco}
                    type="button"
                    onClick={() => toggleArrayItem('targetEcosystems', eco)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {eco}
                  </button>
                );
              })}
            </div>
            {errors.targetEcosystems && (
              <p className="text-[11px] text-red-600 mt-1">{errors.targetEcosystems}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Reason for Applying to Nexus3 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="applicationReason"
              rows={2}
              value={formData.applicationReason}
              onChange={handleTextChange}
              placeholder="Why are you seeking entry into the Curated Network at this stage?"
              className={`w-full px-3 py-2 bg-neutral-50 border rounded-lg text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                errors.applicationReason ? 'border-red-400' : 'border-neutral-200'
              }`}
            />
            {errors.applicationReason && (
              <p className="text-[11px] text-red-600 mt-1">{errors.applicationReason}</p>
            )}
          </div>
        </div>

        {/* Section 4: Consent & Submission */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consentGiven"
              checked={formData.consentGiven}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, consentGiven: e.target.checked }));
                if (errors.consentGiven) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.consentGiven;
                    return copy;
                  });
                }
              }}
              className="mt-1 rounded border-neutral-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
            />
            <label htmlFor="consentGiven" className="text-xs text-neutral-600 leading-relaxed">
              I certify that I am an authorized core contributor or representative of this project. I consent to the editorial review and public listing of approved partnership details on the Nexus3 platform.
            </label>
          </div>
          {errors.consentGiven && (
            <p className="text-[11px] text-red-600">{errors.consentGiven}</p>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Applications are reviewed within 48 business hours.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application (Free)'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
