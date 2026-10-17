import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/api/auth.api';
import { queryKeys } from '@/app/queryKeys';
import { DEMO_MODE, demoUser } from '@/lib/demo';

export function useCurrentUser() {
  const query = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.me,
    enabled: !DEMO_MODE,
    retry: false,
    staleTime: 5 * 60_000,
  });

  if (DEMO_MODE) {
    return {
      user: demoUser,
      isAuthenticated: true,
      isAdmin: demoUser.role === 'admin',
      isLoading: false,
      isError: false,
      error: null,
      refetch: async () => {},
    };
  }

  const user = query.data;

  return {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}