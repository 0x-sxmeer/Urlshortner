import { createBrowserRouter, Navigate } from 'react-router-dom';

import RequireAuth from '@/routes/RequireAuth';
import RoleGuard from '@/routes/RoleGuard';
import RedirectIfAuthenticated from '@/routes/RedirectIfAuthenticated';

import AppShell from '@/components/layout/AppShell';
import AdminLayout from '@/components/layout/AdminLayout';
import { RouteErrorScreen } from '@/components/feedback';

import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  LinksPage,
  CreateLinkPage,
  LinkDetailPage,
  CampaignsPage,
  TagsPage,
  ImportPage,
  AdminOverviewPage,
  AdminLinksPage,
  AdminUsersPage,
  AdminBlocklistPage,
  AdminAuditLogPage,
  PasswordGatePage,
  NotFoundPage,
  GonePage,
  ForbiddenPage,
} from '@/pages';

export const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: (
        <RedirectIfAuthenticated>
          <LoginPage />
        </RedirectIfAuthenticated>
      ),
    },
    {
      path: '/register',
      element: (
        <RedirectIfAuthenticated>
          <RegisterPage />
        </RedirectIfAuthenticated>
      ),
    },

    {
      path: '/password/:code',
      element: <PasswordGatePage />,
    },

    {
      path: '/404',
      element: <NotFoundPage />,
    },

    {
      path: '/410',
      element: <GonePage />,
    },

    {
      path: '/forbidden',
      element: <ForbiddenPage />,
    },

    {
      element: <RequireAuth allowedRoles={['user', 'admin']} />,
      errorElement: <RouteErrorScreen />,
      children: [
        {
          element: <AppShell />,
          children: [
            {
              index: true,
              element: <Navigate to="/dashboard" replace />,
            },
            {
              path: 'dashboard',
              element: <DashboardPage />,
            },

            {
              path: 'links',
              element: <LinksPage />,
            },
            {
              path: 'links/new',
              element: <CreateLinkPage />,
            },
            {
              path: 'links/:linkId',
              element: <LinkDetailPage />,
            },

            {
              path: 'campaigns',
              element: <CampaignsPage />,
            },

            {
              path: 'tags',
              element: <TagsPage />,
            },

            {
              path: 'import',
              element: <ImportPage />,
            },

            {
              path: 'admin',
              element: <RoleGuard allowedRoles={['admin']} />,
              children: [
                {
                  element: <AdminLayout />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="overview" replace />,
                    },
                    {
                      path: 'overview',
                      element: <AdminOverviewPage />,
                    },
                    {
                      path: 'links',
                      element: <AdminLinksPage />,
                    },
                    {
                      path: 'users',
                      element: <AdminUsersPage />,
                    },
                    {
                      path: 'blocklist',
                      element: <AdminBlocklistPage />,
                    },
                    {
                      path: 'audit',
                      element: <AdminAuditLogPage />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ],
  {
    basename: import.meta.env.VITE_ROUTER_BASE || '/',
  }
);