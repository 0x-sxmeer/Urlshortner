import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Link2,
  Megaphone,
  Tags,
  Upload,
  ShieldCheck,
} from 'lucide-react';

import { useCurrentUser } from '@/hooks/useCurrentUser';

function SidebarLink({ to, icon: Icon, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
          isActive
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-600 hover:bg-slate-100',
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4" />
      {children}
    </NavLink>
  );
}

export default function AppShell() {
  const { user, isAdmin } = useCurrentUser();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 md:block">
        <div className="mb-8 px-3">
          <h1 className="text-xl font-bold text-slate-900">LinkPulse</h1>
          <p className="text-xs text-slate-500">Smart link governance</p>
        </div>

        <nav className="space-y-1">
          <SidebarLink to="/dashboard" icon={LayoutDashboard} end>
            Dashboard
          </SidebarLink>

          <SidebarLink to="/links" icon={Link2}>
            Links
          </SidebarLink>

          <SidebarLink to="/links/new" icon={Link2}>
            Create Link
          </SidebarLink>

          <SidebarLink to="/campaigns" icon={Megaphone}>
            Campaigns
          </SidebarLink>

          <SidebarLink to="/tags" icon={Tags}>
            Tags
          </SidebarLink>

          <SidebarLink to="/import" icon={Upload}>
            Import CSV
          </SidebarLink>

          {isAdmin ? (
            <SidebarLink to="/admin" icon={ShieldCheck}>
              Admin Console
            </SidebarLink>
          ) : null}
        </nav>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
          <p className="font-medium text-slate-700">Hackathon Demo</p>
          <p>Team: Care Cue</p>
          <p>Code: WFQ25K</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <LayoutDashboard className="h-4 w-4" />
            LinkPulse Dashboard
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{user?.email}</span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {user?.role}
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}