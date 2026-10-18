import type { Web3Project, ListingApplication } from '../types/index.ts';

/**
 * Escapes a string field for standard RFC 4180 CSV
 */
export function escapeCsvField(value: any): string {
  if (value === null || value === undefined) return '""';
  if (Array.isArray(value)) {
    value = value.join('; ');
  }
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Converts projects array to CSV string
 */
export function projectsToCsv(projects: Web3Project[]): string {
  const headers = [
    'ID',
    'Slug',
    'Name',
    'Category',
    'Primary Ecosystem',
    'Supported Ecosystems',
    'Tags',
    'Curated Hub Member',
    'Partnership Status',
    'Partnership Types',
    'What We Offer',
    'What We Are Looking For',
    'Website',
    'X (Twitter)',
    'View Count',
    'Contact Clicks',
    'Last Updated'
  ];

  const rows = projects.map((p) => [
    escapeCsvField(p.id),
    escapeCsvField(p.slug),
    escapeCsvField(p.name),
    escapeCsvField(p.category),
    escapeCsvField(p.primaryEcosystem),
    escapeCsvField(p.supportedEcosystems),
    escapeCsvField(p.tags),
    escapeCsvField(p.isCuratedPartner ? 'Yes' : 'No'),
    escapeCsvField(p.partnershipStatus || 'N/A'),
    escapeCsvField(p.partnershipTypes || []),
    escapeCsvField(p.whatWeOffer || []),
    escapeCsvField(p.whatWeAreLookingFor || []),
    escapeCsvField(p.websiteUrl),
    escapeCsvField(p.xUrl || ''),
    escapeCsvField(p.viewCount || 0),
    escapeCsvField(p.contactClickCount || 0),
    escapeCsvField(p.updatedAt)
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Converts applications array to CSV string
 */
export function applicationsToCsv(applications: ListingApplication[]): string {
  const headers = [
    'Reference Code',
    'Project Name',
    'Category',
    'Representative Name',
    'Role',
    'Email',
    'Telegram',
    'Website',
    'Status',
    'What We Offer',
    'What We Are Looking For',
    'Preferred Partnership Types',
    'Target Ecosystems',
    'Submitted At',
    'Reviewed By'
  ];

  const rows = applications.map((a) => [
    escapeCsvField(a.referenceCode),
    escapeCsvField(a.projectName),
    escapeCsvField(a.category),
    escapeCsvField(a.representativeName),
    escapeCsvField(a.representativeRole),
    escapeCsvField(a.contactEmail),
    escapeCsvField(a.contactTelegram || ''),
    escapeCsvField(a.website),
    escapeCsvField(a.status),
    escapeCsvField(a.whatWeOffer),
    escapeCsvField(a.whatWeAreLookingFor),
    escapeCsvField(a.preferredPartnershipTypes),
    escapeCsvField(a.targetEcosystems),
    escapeCsvField(a.submittedAt),
    escapeCsvField(a.reviewedBy || '')
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

/**
 * Triggers a browser download of text data as a file
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
