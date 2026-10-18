import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateSlug,
  normalizeSearchText,
  generateReferenceCode,
  filterProjects,
  validateApplicationForm
} from './filter-projects.ts';
import type { Web3Project, DirectoryFilterState } from '../types/index.ts';

const mockProjects: Web3Project[] = [
  {
    id: 'p1',
    slug: 'arbitrum-flow',
    name: 'Arbitrum Flow',
    tagline: 'High-throughput DEX liquidity manager',
    description: 'Autonomous liquidity pools for Arbitrum DeFi protocols.',
    category: 'DeFi',
    primaryEcosystem: 'Arbitrum',
    supportedEcosystems: ['Arbitrum', 'Ethereum'],
    tags: ['DEX', 'Liquidity', 'Yield'],
    websiteUrl: 'https://arbitrumflow.xyz',
    customization: { accentColor: '#0D9488' },
    isCuratedPartner: true,
    partnershipStatus: 'Actively Recruiting',
    partnershipTypes: ['Integration Partner', 'Liquidity / Grants'],
    whatWeOffer: ['Deep seed liquidity', 'Co-marketing campaigns'],
    whatWeAreLookingFor: ['L2 lending markets'],
    targetEcosystems: ['Arbitrum'],
    viewCount: 150,
    contactClickCount: 12,
    updatedAt: '2026-03-01',
    isPublished: true
  },
  {
    id: 'p2',
    slug: 'solana-sensor-mesh',
    name: 'Solana Sensor Mesh',
    tagline: 'DePIN hardware verification mesh',
    description: 'Hardware sensors reporting real-time weather on Solana.',
    category: 'DePIN',
    primaryEcosystem: 'Solana',
    supportedEcosystems: ['Solana'],
    tags: ['DePIN', 'Sensors', 'IoT'],
    websiteUrl: 'https://sensormesh.io',
    customization: { accentColor: '#0284C7' },
    isCuratedPartner: false,
    viewCount: 80,
    contactClickCount: 3,
    updatedAt: '2026-02-15',
    isPublished: true
  },
  {
    id: 'p3',
    slug: 'zk-secret-ai',
    name: 'ZkSecret AI',
    tagline: 'Zero-knowledge machine learning for on-chain models',
    description: 'Verifiable AI models with privacy preserving inferences.',
    category: 'AI x Web3',
    primaryEcosystem: 'Base',
    supportedEcosystems: ['Base', 'Ethereum'],
    tags: ['AI', 'zkML', 'Privacy'],
    websiteUrl: 'https://zksecret.ai',
    customization: { accentColor: '#6366F1' },
    isCuratedPartner: true,
    partnershipStatus: 'Open to Pitches',
    partnershipTypes: ['Integration Partner', 'Joint Research'],
    whatWeOffer: ['Free inference API compute'],
    whatWeAreLookingFor: ['Autonomous agents and DeFi oracles'],
    targetEcosystems: ['Base'],
    viewCount: 320,
    contactClickCount: 25,
    updatedAt: '2026-03-10',
    isPublished: true
  }
];

test('generateSlug formats project names into URL-safe slugs', () => {
  assert.equal(generateSlug('Nexus3 Protocol V2!'), 'nexus3-protocol-v2');
  assert.equal(generateSlug('  DePIN Sensor Mesh & Co.  '), 'depin-sensor-mesh-co');
});

test('normalizeSearchText strips punctuation and handles whitespace', () => {
  assert.equal(normalizeSearchText('ERC-4337: Smart Accounts!'), 'erc 4337 smart accounts');
});

test('generateReferenceCode returns APP- prefixed string of length 8', () => {
  const code = generateReferenceCode();
  assert.match(code, /^APP-[A-Z0-9]{4}$/);
});

test('filterProjects filters by search query across multiple fields', () => {
  const defaultFilter: DirectoryFilterState = {
    searchQuery: 'liquidity',
    category: 'all',
    ecosystem: 'all',
    partnershipOnly: false,
    partnershipType: 'all',
    sortBy: 'relevance'
  };

  const results = filterProjects(mockProjects, defaultFilter);
  assert.equal(results.length, 1);
  assert.equal(results[0].name, 'Arbitrum Flow');
});

test('filterProjects handles ecosystem filtering correctly', () => {
  const filter: DirectoryFilterState = {
    searchQuery: '',
    category: 'all',
    ecosystem: 'Base',
    partnershipOnly: false,
    partnershipType: 'all',
    sortBy: 'relevance'
  };

  const results = filterProjects(mockProjects, filter);
  assert.equal(results.length, 1);
  assert.equal(results[0].name, 'ZkSecret AI');
});

test('filterProjects handles curated partnership only flag', () => {
  const filter: DirectoryFilterState = {
    searchQuery: '',
    category: 'all',
    ecosystem: 'all',
    partnershipOnly: true,
    partnershipType: 'all',
    sortBy: 'relevance'
  };

  const results = filterProjects(mockProjects, filter);
  assert.equal(results.length, 2);
  assert.ok(results.every((p) => p.isCuratedPartner));
});

test('validateApplicationForm rejects empty required fields and validates email/urls', () => {
  const emptyRes = validateApplicationForm({});
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.projectName);
  assert.ok(emptyRes.errors.website);
  assert.ok(emptyRes.errors.contactEmail);
  assert.ok(emptyRes.errors.consentGiven);

  const validRes = validateApplicationForm({
    projectName: 'Valid Web3 Project',
    website: 'https://validproject.org',
    description: 'A solid decentralized protocol with robust on-chain governance and tokenomics.',
    category: 'DeFi',
    representativeName: 'Alice Contributor',
    representativeRole: 'Head of Partnerships',
    contactEmail: 'alice@validproject.org',
    whatWeOffer: 'Liquidity seeding and technical integration support for all partners.',
    whatWeAreLookingFor: 'Layer 2 ecosystem rollups and cross-chain bridge integrations.',
    preferredPartnershipTypes: ['Integration Partner'],
    targetEcosystems: ['Arbitrum'],
    applicationReason: 'We want to expand our partner network across leading Ethereum rollups.',
    consentGiven: true
  });

  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});
