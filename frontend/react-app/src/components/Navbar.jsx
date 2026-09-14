import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Menu, X, Wallet, ShieldAlert, Cpu, Users } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'หน้าแรก' },
    { to: '/wealthpilot', label: 'WealthPilot' },
    { to: '/sentinel', label: 'K-Sentinel' },
    { to: '/architecture', label: 'AI Architecture' },
    { to: '/personas', label: 'Personas' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#070B12]/90 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#008744] via-[#00A950] to-[#22C55E] flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 border border-white/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                K-Sentinel <span className="text-slate-400 font-light">&amp;</span> <span className="text-[#00A950]">WealthPilot</span>
              </span>
              <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] px-2 py-0.5 rounded-full font-bold">
                React Router 6
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">KBTG Kampus Hackathon 2026 — Track 2: Data Science</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `transition-all py-1.5 px-3 rounded-xl text-sm font-medium outline-none focus:outline-none ring-0 ${
                  isActive
                    ? 'text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/25 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="hidden sm:inline-flex items-center gap-2 bg-[#00A950] hover:bg-[#008F43] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] outline-none focus:outline-none ring-0"
          >
            <span>เปิดแอปจำลอง (Simulator)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 hover:text-white outline-none focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#070B12] border-b border-white/10 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors outline-none focus:outline-none ring-0 ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-[#00A950] text-white px-4 py-3 rounded-xl font-bold text-sm mt-2 outline-none focus:outline-none ring-0"
            >
              <span>เปิดแอปจำลอง (Simulator)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
