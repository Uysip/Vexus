import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeCsvField, projectsToCsv, applicationsToCsv } from './export-data.ts';
import type { Web3Project, ListingApplication } from '../types/index.ts';

test('escapeCsvField escapes quotes, commas and newlines', () => {
  assert.equal(escapeCsvField('simple'), '"simple"');
  assert.equal(escapeCsvField('with, comma'), '"with, comma"');
  assert.equal(escapeCsvField('with "quotes"'), '"with ""quotes"""');
  assert.equal(escapeCsvField(['DeFi', 'L2']), '"DeFi; L2"');
  assert.equal(escapeCsvField(null), '""');
});

test('projectsToCsv outputs proper header and formatted rows', () => {
  const sampleProjects: Web3Project[] = [
    {
      id: 'p1',
      slug: 'sample-project',
      name: 'Sample Web3 Project',
      tagline: 'Test tagline',
      description: 'Test description',
      category: 'DeFi',
      primaryEcosystem: 'Ethereum',
      supportedEcosystems: ['Ethereum', 'Arbitrum'],
      tags: ['DEX', 'AMM'],
      websiteUrl: 'https://sample.org',
      customization: { accentColor: '#0D9488' },
      isCuratedPartner: true,
      partnershipStatus: 'Actively Recruiting',
      viewCount: 120,
      contactClickCount: 15,
      updatedAt: '2026-03-01',
      isPublished: true
    }
  ];

  const csv = projectsToCsv(sampleProjects);
  const lines = csv.split('\n');
  assert.equal(lines.length, 2);
  assert.ok(lines[0].includes('ID,Slug,Name,Category'));
  assert.ok(lines[1].includes('"Sample Web3 Project"'));
  assert.ok(lines[1].includes('"DeFi"'));
  assert.ok(lines[1].includes('"Yes"'));
});

test('applicationsToCsv outputs proper headers for listing applications', () => {
  const sampleApps: ListingApplication[] = [
    {
      id: 'app-1',
      referenceCode: 'APP-9999',
      submittedAt: '2026-03-20',
      projectName: 'Test Protocol',
      website: 'https://test.io',
      description: 'Test application description',
      category: 'Infrastructure',
      representativeName: 'Alice',
      representativeRole: 'Lead BD',
      contactEmail: 'alice@test.io',
      whatWeOffer: 'Grant money',
      whatWeAreLookingFor: 'DeFi protocols',
      preferredPartnershipTypes: ['Integration Partner'],
      targetEcosystems: ['Arbitrum'],
      applicationReason: 'Growth',
      status: 'Approved',
      reviewNotes: [],
      consentGiven: true
    }
  ];

  const csv = applicationsToCsv(sampleApps);
  const lines = csv.split('\n');
  assert.equal(lines.length, 2);
  assert.ok(lines[0].includes('Reference Code,Project Name'));
  assert.ok(lines[1].includes('"APP-9999"'));
  assert.ok(lines[1].includes('"Alice"'));
});
