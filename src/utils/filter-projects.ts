import type { Web3Project, DirectoryFilterState, ListingApplication, AnalyticsSummary } from '../types/index.ts';

/**
 * Normalizes text for clean search matching
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates an SEO & URL friendly slug from project name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates unique human-readable application reference code
 */
export function generateReferenceCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `APP-${code}`;
}

/**
 * Pure filter and sort function for projects
 */
export function filterProjects(
  projects: Web3Project[],
  filters: DirectoryFilterState
): Web3Project[] {
  let result = projects.filter((project) => project.isPublished);

  // Curated partnership filter
  if (filters.partnershipOnly) {
    result = result.filter((p) => p.isCuratedPartner);
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
  }

  // Ecosystem filter
  if (filters.ecosystem && filters.ecosystem !== 'all') {
    result = result.filter(
      (p) =>
        p.primaryEcosystem.toLowerCase() === filters.ecosystem.toLowerCase() ||
        p.supportedEcosystems.some((e) => e.toLowerCase() === filters.ecosystem.toLowerCase())
    );
  }

  // Partnership type filter
  if (filters.partnershipType && filters.partnershipType !== 'all') {
    result = result.filter((p) =>
      p.partnershipTypes?.some(
        (type) => type.toLowerCase() === filters.partnershipType.toLowerCase()
      )
    );
  }

  // Search query filter
  if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
    const rawTerms = normalizeSearchText(filters.searchQuery).split(/\s+/).filter(Boolean);
    
    result = result.filter((p) => {
      const searchTarget = [
        p.name,
        p.tagline,
        p.description,
        p.category,
        p.primaryEcosystem,
        ...(p.supportedEcosystems || []),
        ...(p.tags || []),
        ...(p.whatWeOffer || []),
        ...(p.whatWeAreLookingFor || [])
      ]
        .join(' ')
        .toLowerCase();

      // All search terms must match (AND search)
      return rawTerms.every((term) => searchTarget.includes(term));
    });
  }

  // Sorting
  const sorted = [...result];
  switch (filters.sortBy) {
    case 'views':
      sorted.sort((a, b) => b.viewCount - a.viewCount);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      break;
    case 'relevance':
    default:
      // Curated partners first, then view count
      sorted.sort((a, b) => {
        if (a.isCuratedPartner && !b.isCuratedPartner) return -1;
        if (!a.isCuratedPartner && b.isCuratedPartner) return 1;
        return b.viewCount - a.viewCount;
      });
      break;
  }

  return sorted;
}

/**
 * Validates a listing application submission
 */
export interface ApplicationFormInput {
  projectName: string;
  website: string;
  xAccount?: string;
  description: string;
  category: string;
  representativeName: string;
  representativeRole: string;
  contactEmail: string;
  contactTelegram?: string;
  whatWeOffer: string;
  whatWeAreLookingFor: string;
  preferredPartnershipTypes: string[];
  targetEcosystems: string[];
  applicationReason: string;
  consentGiven: boolean;
}

export function validateApplicationForm(input: Partial<ApplicationFormInput>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!input.projectName || input.projectName.trim().length < 2) {
    errors.projectName = 'Project name must be at least 2 characters.';
  }

  if (!input.website || !/^https?:\/\/.+\..+/i.test(input.website.trim())) {
    errors.website = 'Enter a valid official website URL starting with https://';
  }

  if (!input.description || input.description.trim().length < 20) {
    errors.description = 'Provide a descriptive overview of at least 20 characters.';
  }

  if (!input.category || input.category.trim().length === 0) {
    errors.category = 'Select a primary Web3 category.';
  }

  if (!input.representativeName || input.representativeName.trim().length < 2) {
    errors.representativeName = 'Representative name is required.';
  }

  if (!input.representativeRole || input.representativeRole.trim().length < 2) {
    errors.representativeRole = 'Your role or title is required.';
  }

  if (!input.contactEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.contactEmail.trim())) {
    errors.contactEmail = 'Enter a valid corporate or work email address.';
  }

  if (!input.whatWeOffer || input.whatWeOffer.trim().length < 15) {
    errors.whatWeOffer = 'Describe specifically what your project offers to prospective partners (min 15 chars).';
  }

  if (!input.whatWeAreLookingFor || input.whatWeAreLookingFor.trim().length < 15) {
    errors.whatWeAreLookingFor = 'Describe what types of partners, integrations, or ecosystems you are seeking (min 15 chars).';
  }

  if (!input.preferredPartnershipTypes || input.preferredPartnershipTypes.length === 0) {
    errors.preferredPartnershipTypes = 'Select at least one preferred partnership type.';
  }

  if (!input.targetEcosystems || input.targetEcosystems.length === 0) {
    errors.targetEcosystems = 'Select at least one target ecosystem.';
  }

  if (!input.applicationReason || input.applicationReason.trim().length < 15) {
    errors.applicationReason = 'Please explain why you want to join the Curated Partnership Hub (min 15 chars).';
  }

  if (!input.consentGiven) {
    errors.consentGiven = 'You must confirm that you represent this project and consent to published review.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Computes aggregated platform analytics
 */
export function computeAnalytics(
  projects: Web3Project[],
  applications: ListingApplication[]
): AnalyticsSummary {
  const totalViews = projects.reduce((acc, p) => acc + (p.viewCount || 0), 0);
  const totalContactClicks = projects.reduce((acc, p) => acc + (p.contactClickCount || 0), 0);
  const totalApplications = applications.length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const pendingCount = applications.filter((a) => a.status === 'Pending' || a.status === 'Under Review').length;

  const categoryMap: Record<string, number> = {};
  for (const p of projects) {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  }

  const popularCategories = Object.entries(categoryMap)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const projectPerformance = [...projects]
    .map((p) => ({
      id: p.id,
      name: p.name,
      views: p.viewCount || 0,
      clicks: p.contactClickCount || 0
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 8);

  return {
    totalViews,
    totalContactClicks,
    totalApplications,
    approvedCount,
    pendingCount,
    popularCategories,
    projectPerformance
  };
}
