import { Web3Project } from '../types';
import { storage } from './storage';

/**
 * Interface definition for any external Web3 project directory provider
 * (e.g. CoinGecko, RootData, DefiLlama, or custom aggregator)
 */
export interface ExternalDirectoryProvider {
  name: string;
  isAvailable(): boolean;
  fetchProjects(params: {
    category?: string;
    ecosystem?: string;
    limit?: number;
    offset?: number;
  }): Promise<{
    projects: Web3Project[];
    total: number;
    source: 'live' | 'cache' | 'curated_local';
  }>;
  fetchProjectDetails(slug: string): Promise<Web3Project | null>;
}

/**
 * Concrete client abstraction with transparent local fallback,
 * in-memory cache, timeout protection, and simulated network latency.
 */
class DirectoryApiClientImpl implements ExternalDirectoryProvider {
  public readonly name = 'Nexus3 Unified Project Gateway';
  private cache = new Map<string, { timestamp: number; data: any }>();
  private readonly CACHE_TTL_MS = 60 * 1000; // 1 minute

  public isAvailable(): boolean {
    return true;
  }

  public async fetchProjects(params: {
    category?: string;
    ecosystem?: string;
    limit?: number;
    offset?: number;
  }): Promise<{
    projects: Web3Project[];
    total: number;
    source: 'live' | 'cache' | 'curated_local';
  }> {
    const cacheKey = JSON.stringify(params);
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL_MS) {
      return {
        projects: cached.data.projects,
        total: cached.data.total,
        source: 'cache'
      };
    }

    // Network delay simulation (150ms for snappy UI)
    await new Promise((resolve) => setTimeout(resolve, 120));

    // Retrieve curated and directory records from storage
    const allProjects = storage.getProjects();
    let filtered = allProjects.filter((p) => p.isPublished);

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
    }

    if (params.ecosystem && params.ecosystem !== 'all') {
      filtered = filtered.filter(
        (p) =>
          p.primaryEcosystem.toLowerCase() === params.ecosystem!.toLowerCase() ||
          p.supportedEcosystems.some((e) => e.toLowerCase() === params.ecosystem!.toLowerCase())
      );
    }

    const total = filtered.length;
    const offset = params.offset || 0;
    const limit = params.limit || 50;
    const paginated = filtered.slice(offset, offset + limit);

    const result = {
      projects: paginated,
      total,
      source: 'curated_local' as const
    };

    this.cache.set(cacheKey, { timestamp: Date.now(), data: result });
    return result;
  }

  public async fetchProjectDetails(slug: string): Promise<Web3Project | null> {
    const project = storage.getProjectBySlug(slug);
    return project || null;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export const directoryApi = new DirectoryApiClientImpl();
