import React from 'react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-neutral-200/80 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-600 text-white font-bold text-xs">
                N3
              </div>
              <span className="text-base font-bold text-neutral-900">Nexus3</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              A curated B2B networking directory for Web3 protocols, ecosystem foundations, and business development leads.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-900 tracking-wide mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Project Directory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('partnerships')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Partnership Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('submit-project')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Request a Free Listing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('application-status')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Application Status
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-900 tracking-wide mb-3">
              Ecosystems
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-neutral-600">
              <span className="text-neutral-500">Ethereum · Arbitrum · Base · Solana · Optimism · Monad · Cosmos</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-900 tracking-wide mb-3">
              Governance & Integrity
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Curated listings require verified team representation and explicit partnership criteria review. External directory records are indexed for ecosystem discovery.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Nexus3 Web3 B2B Network. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-600 cursor-pointer">Privacy Notice</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Listing Guidelines</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
