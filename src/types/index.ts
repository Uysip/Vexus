export type ProjectCategory =
  | 'DeFi'
  | 'Layer 1 / Layer 2'
  | 'Infrastructure'
  | 'AI x Web3'
  | 'DePIN'
  | 'Account Abstraction'
  | 'Interoperability'
  | 'Security & Audits'
  | 'Gaming & Social';

export type Ecosystem =
  | 'Ethereum'
  | 'Arbitrum'
  | 'Base'
  | 'Solana'
  | 'Optimism'
  | 'Polygon'
  | 'Cosmos'
  | 'Avalanche'
  | 'Monad'
  | 'Multi-Chain';

export type PartnershipType =
  | 'Integration Partner'
  | 'Co-Marketing'
  | 'Liquidity / Grants'
  | 'Ecosystem Pilot'
  | 'Joint Research'
  | 'Security / Audit Partner';

export type PartnershipStatus =
  | 'Open to Pitches'
  | 'Actively Recruiting'
  | 'Selective Review'
  | 'Paused';

export interface ContactMethod {
  type: 'telegram' | 'email' | 'x' | 'discord' | 'calendly' | 'form';
  label: string;
  value: string;
  isPublic: boolean;
}

export interface ProjectCustomization {
  accentColor: string; // e.g. '#0D9488'
  tintColor?: string; // subtle background tint (e.g. 'rgba(13, 148, 136, 0.04)')
  coverGradient?: string;
  bannerUrl?: string;
  badgeText?: string;
  borderTreatment?: 'subtle' | 'accent-hover' | 'highlighted';
}

export interface Web3Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  primaryEcosystem: Ecosystem;
  supportedEcosystems: Ecosystem[];
  tags: string[];
  logoUrl?: string;
  websiteUrl: string;
  xUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  
  // Customization configuration
  customization: ProjectCustomization;

  // Curated Partnership Hub Status
  isCuratedPartner: boolean;
  curatedSince?: string;
  partnershipStatus?: PartnershipStatus;
  partnershipTypes?: PartnershipType[];
  whatWeOffer?: string[];
  whatWeAreLookingFor?: string[];
  targetEcosystems?: Ecosystem[];
  contacts?: ContactMethod[];
  
  // Analytics
  viewCount: number;
  contactClickCount: number;
  updatedAt: string;
  isPublished: boolean;
}

export type ApplicationStatus =
  | 'Pending'
  | 'Under Review'
  | 'More Information Required'
  | 'Approved'
  | 'Rejected';

export interface ListingApplication {
  id: string;
  referenceCode: string; // e.g. 'APP-7294'
  submittedAt: string;
  projectName: string;
  website: string;
  xAccount?: string;
  description: string;
  category: ProjectCategory;
  representativeName: string;
  representativeRole: string;
  contactEmail: string;
  contactTelegram?: string;
  whatWeOffer: string;
  whatWeAreLookingFor: string;
  preferredPartnershipTypes: PartnershipType[];
  targetEcosystems: Ecosystem[];
  applicationReason: string;
  status: ApplicationStatus;
  reviewNotes: {
    author: string;
    note: string;
    timestamp: string;
  }[];
  reviewedAt?: string;
  reviewedBy?: string;
  customAccentColor?: string;
  consentGiven: boolean;
}

export interface AnalyticsSummary {
  totalViews: number;
  totalContactClicks: number;
  totalApplications: number;
  approvedCount: number;
  pendingCount: number;
  popularCategories: { category: string; count: number }[];
  projectPerformance: {
    id: string;
    name: string;
    views: number;
    clicks: number;
  }[];
}

export interface DirectoryFilterState {
  searchQuery: string;
  category: string; // 'all' or category
  ecosystem: string; // 'all' or ecosystem
  partnershipOnly: boolean;
  partnershipType: string; // 'all' or partnership type
  sortBy: 'relevance' | 'views' | 'name' | 'newest';
}
