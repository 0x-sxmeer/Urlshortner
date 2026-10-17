import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FullScreenLoader, ErrorScreen } from '@/components/feedback';

export default function RoleGuard({ allowedRoles }) {
  const { user, isLoading, isError, error } = useCurrentUser();

  if (isLoading) {
    return <FullScreenLoader message="Checking permissions..." />;
  }

  if (isError) {
    if (error?.status === 401) {
      return <Navigate to="/login" replace />;
    }

    return <ErrorScreen error={error} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}