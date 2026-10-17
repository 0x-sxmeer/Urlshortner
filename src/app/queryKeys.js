export const queryKeys = {
  auth: {
    me: ['auth', 'me'],
  },

  links: {
    all: ['links'],
    lists: () => [...queryKeys.links.all, 'list'],
    list: (filters = {}) => [...queryKeys.links.lists(), filters],
    details: () => [...queryKeys.links.all, 'detail'],
    detail: (linkId) => [...queryKeys.links.details(), linkId],
    qr: (linkId, format = 'png') => [...queryKeys.links.all, 'qr', linkId, format],
    analytics: (linkId, params = {}) => ['analytics', 'link', linkId, params],
  },

  campaigns: {
    all: ['campaigns'],
    lists: () => [...queryKeys.campaigns.all, 'list'],
    list: (filters = {}) => [...queryKeys.campaigns.lists(), filters],
    details: () => [...queryKeys.campaigns.all, 'detail'],
    detail: (campaignId) => [...queryKeys.campaigns.details(), campaignId],
    analytics: (campaignId, params = {}) => [
      'analytics',
      'campaign',
      campaignId,
      params,
    ],
  },

  tags: {
    all: ['tags'],
    list: () => [...queryKeys.tags.all, 'list'],
  },

  imports: {
    preview: ['imports', 'preview'],
  },

  analytics: {
    overview: (params = {}) => ['analytics', 'overview', params],
  },

  admin: {
    links: (filters = {}) => ['admin', 'links', filters],
    users: (filters = {}) => ['admin', 'users', filters],
    audit: (filters = {}) => ['admin', 'audit', filters],
    analytics: (params = {}) => ['admin', 'analytics', params],
    blocklist: () => ['admin', 'blocklist'],
  },
};