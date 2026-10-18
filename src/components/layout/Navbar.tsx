import React, { useState } from 'react';
import { Menu, X, Shield, PlusCircle, Handshake } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  pendingApplicationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  isAdmin,
  onToggleAdmin,
  pendingApplicationsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore Directory', route: 'explore' },
    { label: 'Partnership Hub', route: 'partnerships' },
    { label: 'How It Works', route: 'how-it-works' },
    { label: 'Submit Project', route: 'submit-project' },
    { label: 'Application Status', route: 'application-status' }
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white font-bold text-sm">
            N3
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            Nexus3
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                type="button"
                onClick={() => handleNavClick(link.route)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-neutral-900 font-semibold border-b-2 border-teal-600'
                    : 'hover:text-neutral-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleAdmin}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isAdmin
                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title={isAdmin ? 'Viewing Admin Console' : 'Switch to Admin Review Mode'}
          >
            <Shield className="w-3.5 h-3.5 text-teal-500" />
            <span>{isAdmin ? 'Admin Console' : 'Admin Access'}</span>
            {pendingApplicationsCount > 0 && (
              <span className="ml-1 bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {pendingApplicationsCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.route}
              type="button"
              onClick={() => handleNavClick(link.route)}
              className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                currentRoute === link.route
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
