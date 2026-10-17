import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FullScreenLoader, ErrorScreen } from '@/components/feedback';

export default function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const { user, isLoading, isError, error, isAuthenticated } = useCurrentUser();

  if (isLoading) {
    return <FullScreenLoader message="Checking your session..." />;
  }

  if (isError) {
    if (error?.status === 401) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <ErrorScreen error={error} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}