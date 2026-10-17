import React from 'react';
import { Navigate } from 'react-router-dom';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FullScreenLoader } from '@/components/feedback';

export default function RedirectIfAuthenticated({ children }) {
  const { isLoading, isError, isAuthenticated } = useCurrentUser();

  if (isLoading) {
    return <FullScreenLoader message="Checking session..." />;
  }

  if (!isError && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}