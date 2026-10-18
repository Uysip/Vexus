import {
  Web3Project,
  ListingApplication,
  ApplicationStatus,
  ProjectCustomization,
  AnalyticsSummary
} from '../types';
import { INITIAL_PROJECTS, INITIAL_APPLICATIONS } from '../data/seed-projects';
import { generateSlug, generateReferenceCode, computeAnalytics, ApplicationFormInput } from '../utils/filter-projects';

const STORAGE_KEYS = {
  PROJECTS: 'nexus3_projects_v1',
  APPLICATIONS: 'nexus3_applications_v1',
  ANALYTICS_SESSION: 'nexus3_analytics_events_v1',
  ADMIN_AUTH: 'nexus3_admin_auth_v1'
};

class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // --- PROJECTS ---
  public getProjects(): Web3Project[] {
    if (!this.isBrowser()) return INITIAL_PROJECTS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PROJECTS;
    }
  }

  public getProjectBySlug(slug: string): Web3Project | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.slug === slug || p.id === slug);
  }

  public saveProjects(projects: Web3Project[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }

  public updateProject(updated: Web3Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === updated.id);
    if (index >= 0) {
      projects[index] = {
        ...updated,
        updatedAt: new Date().toISOString()
      };
    } else {
      projects.unshift(updated);
    }
    this.saveProjects(projects);
  }

  public updateProjectBranding(
    projectId: string,
    customization: Partial<ProjectCustomization>,
    partnershipDetails?: {
      whatWeOffer?: string[];
      whatWeAreLookingFor?: string[];
      partnershipStatus?: Web3Project['partnershipStatus'];
      isCuratedPartner?: boolean;
      isPublished?: boolean;
    }
  ): Web3Project | null {
    const projects = this.getProjects();
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return null;

    proj.customization = {
      ...proj.customization,
      ...customization
    };

    if (partnershipDetails) {
      if (partnershipDetails.whatWeOffer) proj.whatWeOffer = partnershipDetails.whatWeOffer;
      if (partnershipDetails.whatWeAreLookingFor) proj.whatWeAreLookingFor = partnershipDetails.whatWeAreLookingFor;
      if (partnershipDetails.partnershipStatus) proj.partnershipStatus = partnershipDetails.partnershipStatus;
      if (partnershipDetails.isCuratedPartner !== undefined) proj.isCuratedPartner = partnershipDetails.isCuratedPartner;
      if (partnershipDetails.isPublished !== undefined) proj.isPublished = partnershipDetails.isPublished;
    }

    proj.updatedAt = new Date().toISOString();
    this.saveProjects(projects);
    return proj;
  }

  public recordProjectView(projectId: string): void {
    const projects = this.getProjects();
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      proj.viewCount = (proj.viewCount || 0) + 1;
      this.saveProjects(projects);
    }
  }

  public recordContactClick(projectId: string, methodType: string): void {
    const projects = this.getProjects();
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      proj.contactClickCount = (proj.contactClickCount || 0) + 1;
      this.saveProjects(projects);
    }

    // Also record event
    if (this.isBrowser()) {
      try {
        const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYTICS_SESSION) || '[]');
        events.push({
          type: 'contact_click',
          projectId,
          methodType,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.ANALYTICS_SESSION, JSON.stringify(events.slice(-100)));
      } catch {
        // ignore
      }
    }
  }

  // --- APPLICATIONS ---
  public getApplications(): ListingApplication[] {
    if (!this.isBrowser()) return INITIAL_APPLICATIONS as unknown as ListingApplication[];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS as unknown as ListingApplication[];
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_APPLICATIONS as unknown as ListingApplication[];
    }
  }

  public saveApplications(applications: ListingApplication[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Failed to save applications:', e);
    }
  }

  public submitApplication(input: ApplicationFormInput, customAccentColor?: string): ListingApplication {
    const applications = this.getApplications();
    const refCode = generateReferenceCode();

    const newApp: ListingApplication = {
      id: `app-${Date.now()}`,
      referenceCode: refCode,
      submittedAt: new Date().toISOString(),
      projectName: input.projectName.trim(),
      website: input.website.trim(),
      xAccount: input.xAccount ? input.xAccount.trim() : undefined,
      description: input.description.trim(),
      category: input.category as any,
      representativeName: input.representativeName.trim(),
      representativeRole: input.representativeRole.trim(),
      contactEmail: input.contactEmail.trim(),
      contactTelegram: input.contactTelegram ? input.contactTelegram.trim() : undefined,
      whatWeOffer: input.whatWeOffer.trim(),
      whatWeAreLookingFor: input.whatWeAreLookingFor.trim(),
      preferredPartnershipTypes: input.preferredPartnershipTypes as any,
      targetEcosystems: input.targetEcosystems as any,
      applicationReason: input.applicationReason.trim(),
      status: 'Pending',
      reviewNotes: [],
      customAccentColor: customAccentColor || '#0D9488',
      consentGiven: true
    };

    applications.unshift(newApp);
    this.saveApplications(applications);
    return newApp;
  }

  public updateApplicationStatus(
    appId: string,
    status: ApplicationStatus,
    note?: string,
    author: string = 'Curator Lead'
  ): ListingApplication | null {
    const applications = this.getApplications();
    const app = applications.find((a) => a.id === appId);
    if (!app) return null;

    app.status = status;
    app.reviewedAt = new Date().toISOString();
    app.reviewedBy = author;

    if (note && note.trim().length > 0) {
      if (!app.reviewNotes) app.reviewNotes = [];
      app.reviewNotes.push({
        author,
        note: note.trim(),
        timestamp: new Date().toISOString()
      });
    }

    this.saveApplications(applications);

    // If approved, sync or add to Curated Partnership Hub automatically!
    if (status === 'Approved') {
      this.promoteApplicationToProject(app);
    }

    return app;
  }

  private promoteApplicationToProject(app: ListingApplication): void {
    const projects = this.getProjects();
    const slug = generateSlug(app.projectName);
    const existingIndex = projects.findIndex((p) => p.slug === slug || p.name.toLowerCase() === app.projectName.toLowerCase());

    const curatedEntry: Web3Project = {
      id: existingIndex >= 0 ? projects[existingIndex].id : `proj-${Date.now()}`,
      slug,
      name: app.projectName,
      tagline: `${app.category} protocol expanding ecosystem partnerships`,
      description: app.description,
      category: app.category,
      primaryEcosystem: app.targetEcosystems[0] || 'Ethereum',
      supportedEcosystems: app.targetEcosystems.length > 0 ? app.targetEcosystems : ['Ethereum'],
      tags: [app.category, ...app.preferredPartnershipTypes],
      websiteUrl: app.website,
      xUrl: app.xAccount ? (app.xAccount.startsWith('http') ? app.xAccount : `https://x.com/${app.xAccount.replace('@', '')}`) : undefined,
      customization: {
        accentColor: app.customAccentColor || '#0D9488',
        tintColor: 'rgba(13, 148, 136, 0.05)',
        badgeText: 'Curated Network Member',
        borderTreatment: 'accent-hover'
      },
      isCuratedPartner: true,
      curatedSince: new Date().toISOString().split('T')[0],
      partnershipStatus: 'Open to Pitches',
      partnershipTypes: app.preferredPartnershipTypes,
      whatWeOffer: app.whatWeOffer.split(/\n|;/).map((s) => s.trim()).filter(Boolean),
      whatWeAreLookingFor: app.whatWeAreLookingFor.split(/\n|;/).map((s) => s.trim()).filter(Boolean),
      targetEcosystems: app.targetEcosystems,
      contacts: [
        {
          type: 'email',
          label: `${app.representativeName} (${app.representativeRole})`,
          value: app.contactEmail,
          isPublic: true
        },
        ...(app.contactTelegram ? [{
          type: 'telegram' as const,
          label: 'Telegram Contact',
          value: app.contactTelegram.startsWith('@') ? app.contactTelegram : `@${app.contactTelegram}`,
          isPublic: true
        }] : [])
      ],
      viewCount: existingIndex >= 0 ? projects[existingIndex].viewCount : 45,
      contactClickCount: existingIndex >= 0 ? projects[existingIndex].contactClickCount : 2,
      updatedAt: new Date().toISOString(),
      isPublished: true
    };

    if (existingIndex >= 0) {
      projects[existingIndex] = {
        ...projects[existingIndex],
        ...curatedEntry
      };
    } else {
      projects.unshift(curatedEntry);
    }

    this.saveProjects(projects);
  }

  public getAnalytics(): AnalyticsSummary {
    const projects = this.getProjects();
    const apps = this.getApplications();
    return computeAnalytics(projects, apps);
  }

  public resetAllData(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS_SESSION);
    // Reload initial data
    this.getProjects();
    this.getApplications();
  }
}

export const storage = new StorageService();
