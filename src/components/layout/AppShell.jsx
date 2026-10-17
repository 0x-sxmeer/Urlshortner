import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  Link2,
  Megaphone,
  Tags,
  Upload,
  ShieldCheck,
  Plus,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DEMO_MODE } from '@/lib/demo';
import { authApi } from '@/api/auth.api';
import { queryClient } from '@/app/queryClient';
import { Avatar, Chip } from '@/components/ui';

/* Brand mark ------------------------------------------------------- */

export function Logo({ compact = false }) {
  return (
    <Link to="/dashboard" className="group flex items-center gap-2.5 outline-none">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_4px_14px_-4px_rgba(99,102,241,0.7)] transition-transform duration-200 group-hover:scale-105">
        <Activity className="h-5 w-5 text-white" strokeWidth={2.5} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse-soft rounded-full bg-emerald-400 ring-2 ring-white" />
      </span>
      {!compact ? (
        <span className="leading-none">
          <span className="font-display block text-[17px] font-extrabold tracking-tight text-slate-900">
            Link<span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Pulse</span>
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Smart Link Governance
          </span>
        </span>
      ) : null}
    </Link>
  );
}

/* Navigation ------------------------------------------------------ */

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/links', label: 'Links', icon: Link2 },
  { to: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/tags', label: 'Tags', icon: Tags },
  { to: '/import', label: 'Batch Import', icon: Upload },
];

function SidebarLink({ to, icon: Icon, children, end = false, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-gradient-to-r from-indigo-50 via-indigo-50/60 to-transparent text-indigo-700'
            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500 transition-all duration-200 ${
              isActive ? 'opacity-100' : 'scale-y-50 opacity-0'
            }`}
          />
          <Icon
            className={`h-[18px] w-[18px] transition-colors ${
              isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
            }`}
          />
          {children}
        </>
      )}
    </NavLink>
  );
}

function UserMenu({ user, onNavigate }) {
  async function handleLogout() {
    try {
      if (!DEMO_MODE) await authApi.logout();
    } catch {
      /* ignore — clear local state regardless */
    }
    queryClient.clear();
    window.location.href = '/login';
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white/70 p-2 backdrop-blur">
      <div className="flex items-center gap-3 px-1.5 py-1.5">
        <Avatar name={user?.full_name || user?.email || 'U'} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-slate-800">
            {user?.full_name || 'Team member'}
          </p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
        <Chip tone={user?.role === 'admin' ? 'indigo' : 'slate'}>
          {user?.role === 'admin' ? 'Admin' : 'User'}
        </Chip>
      </div>
      <button
        onClick={handleLogout}
        onMouseDown={onNavigate}
        className="mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
      >
        <LogOut className="h-3.5 w-3.5" />
        Sign out
      </button>
    </div>
  );
}

function SidebarContent({ onNavigate }) {
  const { user, isAdmin } = useCurrentUser();

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-2 pt-2">
        <Logo />
      </div>

      <div>
        <Link
          to="/links/new"
          onClick={onNavigate}
          className="btn-sheen flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_18px_-6px_rgba(79,70,229,0.7)] transition hover:to-indigo-700 active:translate-y-px"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New Short Link
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto">
        <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Workspace
        </p>
        {navItems.map((item) => (
          <SidebarLink key={item.to} to={item.to} icon={item.icon} onNavigate={onNavigate}>
            {item.label}
          </SidebarLink>
        ))}

        {isAdmin ? (
          <>
            <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Governance
            </p>
            <SidebarLink to="/admin" icon={ShieldCheck} onNavigate={onNavigate}>
              Admin Console
            </SidebarLink>
          </>
        ) : null}
      </nav>

      {DEMO_MODE ? (
        <div className="relative overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 p-3.5">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-500" />
            <p className="text-xs font-bold text-slate-800">Demo Mode Active</p>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
            Live mock telemetry with zero backend required. Team Care Cue · WFQ25K
          </p>
        </div>
      ) : null}

      <UserMenu user={user} onNavigate={onNavigate} />
    </div>
  );
}

/* Topbar ---------------------------------------------------------- */

const routeLabels = [
  ['/dashboard', 'Command Center'],
  ['/links/new', 'Create Link'],
  ['/links', 'Link Registry'],
  ['/campaigns', 'Campaign Attribution'],
  ['/tags', 'Tag Library'],
  ['/import', 'Batch Import'],
  ['/admin', 'Governance Console'],
];

function useBreadcrumb(pathname) {
  const match = routeLabels.find(([prefix]) => pathname.startsWith(prefix));
  return match ? match[1] : 'LinkPulse';
}

/* Shell ----------------------------------------------------------- */

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const breadcrumb = useBreadcrumb(location.pathname);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 border-r border-slate-200/80 bg-white/80 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="animate-fade-in absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="animate-fade-up absolute inset-y-0 left-0 w-[280px] border-r border-slate-200 bg-white shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-slate-200/70 bg-white/70 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-2 text-sm lg:flex">
              <Link to="/dashboard" className="text-slate-400 transition hover:text-indigo-600">
                LinkPulse
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-800">{breadcrumb}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 lg:hidden">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
              Live
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
              Telemetry streaming
            </span>
            <Link
              to="/links/new"
              className="btn-sheen inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-3.5 text-[13px] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(79,70,229,0.6)] transition hover:to-indigo-700 lg:hidden"
            >
              <Plus className="h-4 w-4" /> New
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200/70 px-6 py-4 text-center text-xs text-slate-400">
          LinkPulse · Smart Link Governance &amp; URL Management · Built by Team Care Cue
        </footer>
      </div>
    </div>
  );
}
