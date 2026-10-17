import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { to: 'overview', label: 'Overview' },
  { to: 'links', label: 'Links' },
  { to: 'users', label: 'Users' },
  { to: 'blocklist', label: 'Blocklist' },
  { to: 'audit', label: 'Audit Log' },
];

export default function AdminLayout() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Admin Console</h2>
        <p className="text-sm text-slate-500">
          Platform governance, takedowns, blocklist, and audit trail.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                ].join(' ')
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}