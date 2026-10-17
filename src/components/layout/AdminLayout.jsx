import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutGrid,
  Link2,
  Users,
  Ban,
  ScrollText,
} from 'lucide-react';

const tabs = [
  { to: 'overview', label: 'Overview', icon: LayoutGrid },
  { to: 'links', label: 'Links', icon: Link2 },
  { to: 'users', label: 'Users', icon: Users },
  { to: 'blocklist', label: 'Blocklist', icon: Ban },
  { to: 'audit', label: 'Audit Log', icon: ScrollText },
];

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="space-y-6">
      {/* Console hero banner */}
      <div className="page-enter relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-glow sm:p-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(30rem 18rem at 85% -20%, rgba(99,102,241,0.55), transparent 60%), radial-gradient(24rem 14rem at 8% 130%, rgba(217,70,239,0.35), transparent 55%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Governance Console
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" />
                  Enforcement active
                </span>
              </div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-300/90">
                Platform-wide takedowns, role authorization, domain blocklisting, and an
                immutable audit trail.
              </p>
            </div>
          </div>
        </div>

        {/* Tab pills */}
        <nav className="relative mt-6 flex flex-wrap gap-1.5 rounded-xl bg-white/[0.06] p-1.5 ring-1 ring-white/10 backdrop-blur-sm">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-150',
                  isActive
                    ? 'bg-white text-slate-900 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div key={location.pathname} className="stagger">
        <Outlet />
      </div>
    </div>
  );
}
