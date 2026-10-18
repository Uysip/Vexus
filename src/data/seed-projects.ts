import { Web3Project } from '../types';

export const INITIAL_PROJECTS: Web3Project[] = [
  {
    id: 'proj-hyperlane',
    slug: 'hyperlane-nexus',
    name: 'Hyperlane Nexus',
    tagline: 'Permissionless interoperability modular framework for any virtual machine',
    description: 'Hyperlane is the permissionless interoperability layer that connects any blockchain, rollup, or appchain. Through modular security modules, developers configure custom validator sets and fraud-proof verifiers for interchain messaging.',
    category: 'Interoperability',
    primaryEcosystem: 'Multi-Chain',
    supportedEcosystems: ['Ethereum', 'Arbitrum', 'Base', 'Solana', 'Optimism', 'Polygon'],
    tags: ['Interoperability', 'Cross-chain', 'Modular', 'Rollup Infrastructure'],
    websiteUrl: 'https://hyperlane.xyz',
    xUrl: 'https://x.com/hyperlane_xyz',
    githubUrl: 'https://github.com/hyperlane-xyz',
    docsUrl: 'https://docs.hyperlane.xyz',
    customization: {
      accentColor: '#0D9488', // Teal
      tintColor: 'rgba(13, 148, 136, 0.05)',
      badgeText: 'Curated Network Member',
      borderTreatment: 'accent-hover'
    },
    isCuratedPartner: true,
    curatedSince: '2026-01-15',
    partnershipStatus: 'Actively Recruiting',
    partnershipTypes: ['Integration Partner', 'Ecosystem Pilot', 'Co-Marketing'],
    whatWeOffer: [
      'Pre-built cross-chain bridge contracts for testnet and mainnet rollups',
      '$25,000 deployment support grant & co-marketing package',
      'Direct developer relations pairing with core engineering team'
    ],
    whatWeAreLookingFor: [
      'New Arbitrum Orbit & OP Stack L3 teams requiring fast bridge deployments',
      'DeFi protocols building omnichain intent solvers and liquidity vaults',
      'Cross-chain governance frameworks seeking modular verifiers'
    ],
    targetEcosystems: ['Arbitrum', 'Base', 'Optimism', 'Monad'],
    contacts: [
      { type: 'telegram', label: 'BD Telegram Lead', value: '@HyperlaneBD', isPublic: true },
      { type: 'email', label: 'Partnerships Desk', value: 'partnerships@hyperlane.xyz', isPublic: true },
      { type: 'calendly', label: '30-Min Integration Call', value: 'https://calendly.com/sample-hyperlane', isPublic: true }
    ],
    viewCount: 382,
    contactClickCount: 46,
    updatedAt: '2026-03-10',
    isPublished: true
  },
  {
    id: 'proj-beraborrow',
    slug: 'beraborrow-finance',
    name: 'BeraBorrow Protocol',
    tagline: 'Decentralized liquidity debt engine native to Proof-of-Liquidity consensus',
    description: 'BeraBorrow is a capital-efficient CDP lending protocol generating the NECT stablecoin backed by Proof-of-Liquidity LP tokens, staked assets, and yield-bearing collateral.',
    category: 'DeFi',
    primaryEcosystem: 'Arbitrum',
    supportedEcosystems: ['Arbitrum', 'Ethereum', 'Base'],
    tags: ['CDP', 'Stablecoins', 'Lending', 'Liquidity Pools'],
    websiteUrl: 'https://beraborrow.com',
    xUrl: 'https://x.com/beraborrow',
    docsUrl: 'https://docs.beraborrow.com',
    customization: {
      accentColor: '#D97706', // Warm Amber
      tintColor: 'rgba(217, 119, 6, 0.04)',
      badgeText: 'Featured Partner',
      borderTreatment: 'accent-hover'
    },
    isCuratedPartner: true,
    curatedSince: '2026-02-01',
    partnershipStatus: 'Open to Pitches',
    partnershipTypes: ['Liquidity / Grants', 'Integration Partner', 'Joint Research'],
    whatWeOffer: [
      'Initial $500,000 protocol-owned liquidity injection for accepted collateral pairs',
      'Joint incentive liquidity mining campaigns',
      'Custom risk parameters module and collateral oracle integration'
    ],
    whatWeAreLookingFor: [
      'Liquid staking token (LST) & restaking asset issuers',
      'Decentralized oracle networks for real-time TWAP feeds',
      'Institutional yield aggregators seeking high-throughput borrowing vaults'
    ],
    targetEcosystems: ['Arbitrum', 'Ethereum', 'Base'],
    contacts: [
      { type: 'telegram', label: 'Core Contributor BD', value: '@BeraBorrowLead', isPublic: true },
      { type: 'email', label: 'Integrations Desk', value: 'collab@beraborrow.com', isPublic: true }
    ],
    viewCount: 294,
    contactClickCount: 31,
    updatedAt: '2026-03-18',
    isPublished: true
  },
  {
    id: 'proj-zeroentropy',
    slug: 'zero-entropy-ai',
    name: 'ZeroEntropy AI',
    tagline: 'Verifiable confidential machine learning inference for decentralized agents',
    description: 'ZeroEntropy provides cryptographic proof of inference execution using zero-knowledge ML (zkML) and Trusted Execution Environments (TEEs), empowering autonomous on-chain agents with trustless AI reasoning.',
    category: 'AI x Web3',
    primaryEcosystem: 'Base',
    supportedEcosystems: ['Base', 'Ethereum', 'Solana'],
    tags: ['zkML', 'Autonomous Agents', 'TEE', 'Verifiable AI'],
    websiteUrl: 'https://zeroentropy.ai',
    xUrl: 'https://x.com/zeroentropy_ai',
    githubUrl: 'https://github.com/zero-entropy',
    customization: {
      accentColor: '#6366F1', // Indigo
      tintColor: 'rgba(99, 102, 241, 0.04)',
      badgeText: 'Curated Network Member',
      borderTreatment: 'accent-hover'
    },
    isCuratedPartner: true,
    curatedSince: '2026-02-14',
    partnershipStatus: 'Actively Recruiting',
    partnershipTypes: ['Integration Partner', 'Ecosystem Pilot', 'Joint Research'],
    whatWeOffer: [
      'Free API credits for off-chain zk-proof generation and TEE attestation clusters',
      'Turnkey agent SDK compatible with ElizaOS, Virtuals, and LangChain',
      'Co-authoring technical research papers and hackathon bounty sponsorships'
    ],
    whatWeAreLookingFor: [
      'Autonomous on-chain trading and governance agent frameworks',
      'Prediction markets desiring tamper-proof AI oracle feeds',
      'Decentralized compute hardware providers (DePIN GPU clusters)'
    ],
    targetEcosystems: ['Base', 'Solana', 'Ethereum'],
    contacts: [
      { type: 'telegram', label: 'Ecosystem Lead', value: '@ZeroEntropy_BD', isPublic: true },
      { type: 'email', label: 'AI Partnerships', value: 'partners@zeroentropy.ai', isPublic: true }
    ],
    viewCount: 512,
    contactClickCount: 68,
    updatedAt: '2026-03-22',
    isPublished: true
  },
  {
    id: 'proj-passkeyauth',
    slug: 'passkey-vault-aa',
    name: 'PasskeyVault AA',
    tagline: 'ERC-4337 smart accounts powered by biometric WebAuthn & session keys',
    description: 'PasskeyVault eliminates seed phrases for Web3 consumer applications. Users create gasless, recoverable smart contract accounts in under 2 seconds using FaceID, TouchID, or hardware security keys.',
    category: 'Account Abstraction',
    primaryEcosystem: 'Ethereum',
    supportedEcosystems: ['Ethereum', 'Base', 'Arbitrum', 'Polygon', 'Optimism'],
    tags: ['ERC-4337', 'Passkeys', 'WebAuthn', 'Smart Accounts', 'Gasless UX'],
    websiteUrl: 'https://passkeyvault.network',
    xUrl: 'https://x.com/passkey_vault',
    docsUrl: 'https://docs.passkeyvault.network',
    customization: {
      accentColor: '#059669', // Emerald
      tintColor: 'rgba(5, 150, 105, 0.04)',
      badgeText: 'Curated Network Member',
      borderTreatment: 'accent-hover'
    },
    isCuratedPartner: true,
    curatedSince: '2026-01-20',
    partnershipStatus: 'Open to Pitches',
    partnershipTypes: ['Integration Partner', 'Co-Marketing', 'Ecosystem Pilot'],
    whatWeOffer: [
      'Subsidized paymaster bundler relayer credits (up to 10,000 gasless tx/month)',
      'Whitelabel modular embedded wallet SDK for React, React Native, and Unity',
      'Joint PR and case-study feature upon mainnet integration'
    ],
    whatWeAreLookingFor: [
      'Consumer Web3 apps, Telegram mini-apps, and mobile crypto wallets',
      'Gaming studios seeking zero-friction player onboarding',
      'Enterprise fintech rails bridging fiat payments to smart contracts'
    ],
    targetEcosystems: ['Base', 'Arbitrum', 'Optimism', 'Polygon'],
    contacts: [
      { type: 'telegram', label: 'Product Partnerships', value: '@PasskeyVaultBD', isPublic: true },
      { type: 'calendly', label: 'Schedule SDK Demo', value: 'https://calendly.com/passkey-vault-demo', isPublic: true }
    ],
    viewCount: 420,
    contactClickCount: 52,
    updatedAt: '2026-03-12',
    isPublished: true
  },
  {
    id: 'proj-veritas-audits',
    slug: 'veritas-security-labs',
    name: 'Veritas Security Labs',
    tagline: 'Continuous formal verification and runtime invariant monitoring',
    description: 'Veritas Labs conducts high-assurance smart contract security audits, symbolic execution testing, and live mempool exploit simulation for mission-critical decentralized protocols.',
    category: 'Security & Audits',
    primaryEcosystem: 'Ethereum',
    supportedEcosystems: ['Ethereum', 'Arbitrum', 'Optimism', 'Base', 'Solana'],
    tags: ['Formal Verification', 'Smart Contract Audits', 'Mempool Defense', 'Invariants'],
    websiteUrl: 'https://veritas-security.io',
    xUrl: 'https://x.com/veritas_sec',
    customization: {
      accentColor: '#475569', // Slate
      tintColor: 'rgba(71, 85, 105, 0.04)',
      badgeText: 'Curated Auditor',
      borderTreatment: 'accent-hover'
    },
    isCuratedPartner: true,
    curatedSince: '2026-02-10',
    partnershipStatus: 'Selective Review',
    partnershipTypes: ['Security / Audit Partner', 'Joint Research', 'Ecosystem Pilot'],
    whatWeOffer: [
      'Fast-track 10-day audit turnarounds for verified curated network projects',
      'Real-time automated invariant watcher bot integration on Discord/Telegram',
      'Discounted audit rates for pre-launch seed-stage protocols'
    ],
    whatWeAreLookingFor: [
      'DeFi protocols preparing for multi-million dollar TVL deployments',
      'Layer 2 bridge teams requiring formal mathematical verification',
      'Restaking and liquid staking architectures'
    ],
    targetEcosystems: ['Ethereum', 'Arbitrum', 'Base'],
    contacts: [
      { type: 'email', label: 'Security Lead', value: 'audits@veritas-security.io', isPublic: true },
      { type: 'telegram', label: 'Private Security Desk', value: '@VeritasSecurityLead', isPublic: true }
    ],
    viewCount: 310,
    contactClickCount: 38,
    updatedAt: '2026-03-25',
    isPublished: true
  },
  {
    id: 'proj-sensorgrid-depin',
    slug: 'sensorgrid-depin',
    name: 'SensorGrid DePIN',
    tagline: 'Decentralized physical sensor mesh for hyper-local environmental telemetry',
    description: 'SensorGrid orchestrates a global decentralized hardware mesh of weather, emissions, and air quality nodes rewarded with real-time on-chain micro-settlements on Solana.',
    category: 'DePIN',
    primaryEcosystem: 'Solana',
    supportedEcosystems: ['Solana', 'Base'],
    tags: ['DePIN', 'Hardware Mesh', 'IoT', 'Micro-Settlements', 'Real-World Data'],
    websiteUrl: 'https://sensorgrid.network',
    xUrl: 'https://x.com/sensorgrid_depin',
    customization: {
      accentColor: '#0284C7', // Sky Blue
      tintColor: 'rgba(2, 132, 199, 0.04)',
      badgeText: 'Curated Network Member',
      borderTreatment: 'accent-hover'
    },
    isCuratedPartner: true,
    curatedSince: '2026-03-01',
    partnershipStatus: 'Actively Recruiting',
    partnershipTypes: ['Integration Partner', 'Ecosystem Pilot', 'Co-Marketing'],
    whatWeOffer: [
      'Live programmatic API feeds of verified sensor telemetry data',
      'Hardware developer kits and co-branded sensor distribution campaigns',
      'Solana tokenomics architecture sharing and token-incentive tooling'
    ],
    whatWeAreLookingFor: [
      'Parametric insurance protocols requiring automated weather trigger oracles',
      'ESG data aggregators and carbon credit tokenization platforms',
      'Edge compute node operators wanting dual-mining hardware setups'
    ],
    targetEcosystems: ['Solana', 'Ethereum', 'Base'],
    contacts: [
      { type: 'telegram', label: 'DePIN Alliances Lead', value: '@SensorGrid_BD', isPublic: true },
      { type: 'email', label: 'Data Inquiries', value: 'ecosystem@sensorgrid.network', isPublic: true }
    ],
    viewCount: 275,
    contactClickCount: 29,
    updatedAt: '2026-03-28',
    isPublished: true
  },
  // Additional public directory projects
  {
    id: 'proj-monadpulse',
    slug: 'monad-pulse-amm',
    name: 'MonadPulse AMM',
    tagline: 'Parallelized asynchronous CLMM decentralized exchange designed for 10,000 TPS',
    description: 'MonadPulse is an ultra-low latency automated market maker built natively for pipelined EVM execution environments, featuring limit orders with sub-second finality.',
    category: 'DeFi',
    primaryEcosystem: 'Monad',
    supportedEcosystems: ['Monad'],
    tags: ['AMM', 'DEX', 'Parallel EVM', 'Concentrated Liquidity'],
    websiteUrl: 'https://monadpulse.io',
    xUrl: 'https://x.com/monadpulse',
    customization: {
      accentColor: '#7C3AED', // Violet
      tintColor: 'rgba(124, 58, 237, 0.03)',
      badgeText: 'Directory Listing',
      borderTreatment: 'subtle'
    },
    isCuratedPartner: false,
    viewCount: 198,
    contactClickCount: 14,
    updatedAt: '2026-03-15',
    isPublished: true
  },
  {
    id: 'proj-celestia-blobstream',
    slug: 'modular-blobstream-relay',
    name: 'BlobStream Relay',
    tagline: 'High-bandwidth zero-knowledge data availability relayer for optimistic rollups',
    description: 'BlobStream Relay enables rollups to access modular Data Availability proofs directly within Ethereum and Arbitrum smart contracts, cutting transaction posting costs by up to 90%.',
    category: 'Infrastructure',
    primaryEcosystem: 'Ethereum',
    supportedEcosystems: ['Ethereum', 'Arbitrum', 'Optimism'],
    tags: ['Data Availability', 'Rollup Infra', 'Zero-Knowledge', 'Cost Reduction'],
    websiteUrl: 'https://blobstream.build',
    xUrl: 'https://x.com/blobstream_relay',
    docsUrl: 'https://docs.blobstream.build',
    customization: {
      accentColor: '#BE185D', // Pink
      tintColor: 'rgba(190, 24, 93, 0.03)',
      borderTreatment: 'subtle'
    },
    isCuratedPartner: false,
    viewCount: 245,
    contactClickCount: 18,
    updatedAt: '2026-03-05',
    isPublished: true
  },
  {
    id: 'proj-pythondex',
    slug: 'vector-ai-indexer',
    name: 'VectorMesh Indexer',
    tagline: 'Semantic vector search and real-time event indexing for decentralized applications',
    description: 'VectorMesh bridges raw blockchain transaction logs with embeddings databases, enabling AI agents and developers to query smart contract state with semantic natural language prompts.',
    category: 'Infrastructure',
    primaryEcosystem: 'Base',
    supportedEcosystems: ['Base', 'Ethereum', 'Arbitrum', 'Solana'],
    tags: ['Indexing', 'Vector Database', 'Developer Tooling', 'GraphQL'],
    websiteUrl: 'https://vectormesh.dev',
    xUrl: 'https://x.com/vectormesh_dev',
    githubUrl: 'https://github.com/vectormesh',
    customization: {
      accentColor: '#0F766E', // Dark Teal
      tintColor: 'rgba(15, 118, 110, 0.03)',
      borderTreatment: 'subtle'
    },
    isCuratedPartner: false,
    viewCount: 182,
    contactClickCount: 11,
    updatedAt: '2026-02-28',
    isPublished: true
  },
  {
    id: 'proj-cosmo-bridge',
    slug: 'cosmos-ibc-hyperbridge',
    name: 'IBC HyperBridge',
    tagline: 'Trustless light-client verification between Cosmos Appchains and Ethereum L2s',
    description: 'IBC HyperBridge connects EVM ecosystems with the Cosmos Inter-Blockchain Communication protocol using recursive SNARKs, eliminating trusted multi-sig bridge vulnerabilities.',
    category: 'Interoperability',
    primaryEcosystem: 'Cosmos',
    supportedEcosystems: ['Cosmos', 'Ethereum', 'Arbitrum'],
    tags: ['IBC', 'Light Client', 'Zero-Knowledge', 'Bridges'],
    websiteUrl: 'https://hyperbridge.network',
    xUrl: 'https://x.com/hyperbridge_ibc',
    customization: {
      accentColor: '#1E293B', // Slate
      tintColor: 'rgba(30, 41, 59, 0.03)',
      borderTreatment: 'subtle'
    },
    isCuratedPartner: false,
    viewCount: 164,
    contactClickCount: 9,
    updatedAt: '2026-02-18',
    isPublished: true
  },
  {
    id: 'proj-chronos-gaming',
    slug: 'chronos-realm-sdk',
    name: 'Chronos Gaming Mesh',
    tagline: 'Low-latency state synchronization and account abstraction engine for on-chain games',
    description: 'Chronos provides an Unreal Engine and Unity SDK with built-in optimistic state channels, allowing multiplayer game studios to process high-frequency game moves with zero gas friction.',
    category: 'Gaming & Social',
    primaryEcosystem: 'Arbitrum',
    supportedEcosystems: ['Arbitrum', 'Base', 'Avalanche'],
    tags: ['Gaming', 'Unity SDK', 'State Channels', 'Micro-Transactions'],
    websiteUrl: 'https://chronosgaming.io',
    xUrl: 'https://x.com/chronos_gaming',
    customization: {
      accentColor: '#EA580C', // Orange
      tintColor: 'rgba(234, 88, 12, 0.03)',
      borderTreatment: 'subtle'
    },
    isCuratedPartner: false,
    viewCount: 220,
    contactClickCount: 16,
    updatedAt: '2026-03-01',
    isPublished: true
  },
  {
    id: 'proj-starlight-l2',
    slug: 'starlight-validium-l2',
    name: 'Starlight Validium',
    tagline: 'Privacy-preserving zk-Validium execution environment for institutional finance',
    description: 'Starlight Validium leverages zero-knowledge proofs and off-chain data availability committees to offer institutional trading desks compliant privacy and instant transaction finality.',
    category: 'Layer 1 / Layer 2',
    primaryEcosystem: 'Ethereum',
    supportedEcosystems: ['Ethereum', 'Arbitrum'],
    tags: ['Validium', 'zk-Rollup', 'Institutional DeFi', 'Confidentiality'],
    websiteUrl: 'https://starlightl2.finance',
    xUrl: 'https://x.com/starlight_l2',
    customization: {
      accentColor: '#2563EB', // Royal Blue
      tintColor: 'rgba(37, 99, 235, 0.03)',
      borderTreatment: 'subtle'
    },
    isCuratedPartner: false,
    viewCount: 290,
    contactClickCount: 22,
    updatedAt: '2026-03-20',
    isPublished: true
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-001',
    referenceCode: 'APP-8392',
    submittedAt: '2026-03-24T14:22:00Z',
    projectName: 'Axiom Oracles',
    website: 'https://axiom-oracles.io',
    xAccount: '@AxiomOracles',
    description: 'Zk-coprocessor powered price feeds and historical storage proofs for Ethereum smart contracts without trusted oracles.',
    category: 'Infrastructure' as const,
    representativeName: 'Elena Rostova',
    representativeRole: 'Head of Business Development',
    contactEmail: 'elena@axiom-oracles.io',
    contactTelegram: '@Elena_Axiom',
    whatWeOffer: 'Free testnet storage proof queries, dedicated engineering integration support, and 3-month co-marketing campaign.',
    whatWeAreLookingFor: 'DeFi lending markets, dynamic NFT games, and on-chain hedge funds needing trustless historical state proofs.',
    preferredPartnershipTypes: ['Integration Partner' as const, 'Co-Marketing' as const],
    targetEcosystems: ['Ethereum' as const, 'Arbitrum' as const, 'Base' as const],
    applicationReason: 'Seeking high-quality protocol partners to pilot our V2 historical storage proofs before public mainnet launch.',
    status: 'Pending' as const,
    reviewNotes: [
      {
        author: 'Nexus Lead Curator',
        note: 'High technical reputation; team was previously core contributors to Ethereum L2 research. Good fit for Curated Hub.',
        timestamp: '2026-03-25T09:15:00Z'
      }
    ],
    customAccentColor: '#0D9488',
    consentGiven: true
  },
  {
    id: 'app-002',
    referenceCode: 'APP-5419',
    submittedAt: '2026-03-21T11:05:00Z',
    projectName: 'DePIN SoundMesh',
    website: 'https://soundmesh.network',
    xAccount: '@SoundMesh_DePIN',
    description: 'Decentralized ambient acoustic noise monitoring nodes rewarding cafe and store owners with on-chain micro-yields.',
    category: 'DePIN' as const,
    representativeName: 'Marcus Vance',
    representativeRole: 'Co-Founder & VP Partnerships',
    contactEmail: 'marcus@soundmesh.network',
    contactTelegram: '@MarcusSoundMesh',
    whatWeOffer: 'Hardware devices, open-source noise acoustic SDK, and data API endpoints for smart city applications.',
    whatWeAreLookingFor: 'Solana tokenomics advisors, smart city pilot programs, and municipal data consumers.',
    preferredPartnershipTypes: ['Ecosystem Pilot' as const, 'Liquidity / Grants' as const],
    targetEcosystems: ['Solana' as const],
    applicationReason: 'Looking to connect with enterprise IoT buyers and Solana ecosystem grant committees.',
    status: 'Under Review' as const,
    reviewNotes: [
      {
        author: 'Nexus Auditor',
        note: 'Requested hardware specifications and proof of compliance before final approval.',
        timestamp: '2026-03-22T16:40:00Z'
      }
    ],
    customAccentColor: '#0284C7',
    consentGiven: true
  }
];
