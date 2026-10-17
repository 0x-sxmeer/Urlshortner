export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export const delay = (ms = 450) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const demoUser = {
  id: 'user_demo',
  email: 'demo@linkpulse.dev',
  full_name: 'Demo Admin',
  role: 'admin',
};

export const demoOverview = {
  human_clicks: 1842,
  bot_share: 17.6,
  daily_unique_visitors: 426,
  clicks_over_time: [
    { date: 'Feb 5', human: 145, bot: 21 },
    { date: 'Feb 6', human: 188, bot: 34 },
    { date: 'Feb 7', human: 214, bot: 28 },
    { date: 'Feb 8', human: 176, bot: 41 },
    { date: 'Feb 9', human: 251, bot: 36 },
    { date: 'Feb 10', human: 289, bot: 49 },
    { date: 'Feb 11', human: 318, bot: 44 },
  ],
  top_links: [
    { code: 'launch', clicks: 382 },
    { code: 'webinar', clicks: 294 },
    { code: 'github', clicks: 246 },
    { code: 'docs', clicks: 187 },
    { code: 'discord', clicks: 151 },
  ],
  alerts: [
    {
      id: 'alert_1',
      severity: 'warning',
      message: 'launch expires in 5 days',
    },
    {
      id: 'alert_2',
      severity: 'critical',
      message: 'webinar reached 91% of its click cap',
    },
    {
      id: 'alert_3',
      severity: 'info',
      message: 'Bot share increased to 17.6% today',
    },
    {
      id: 'alert_4',
      severity: 'warning',
      message: 'Disabled link promo-old still received 12 blocked attempts',
    },
  ],
};

export const demoLinks = [
  {
    id: 'lnk_1',
    code: 'launch',
    destination_url: 'https://example.com/launch',
    status: 'active',
    click_count: 420,
    max_clicks: 1000,
    expires_at: null,
    password_hash: null,
    campaign: {
      id: 'camp_1',
      name: 'Product Launch',
    },
    tags: [
      { id: 'tag_1', name: 'social' },
      { id: 'tag_2', name: 'launch' },
    ],
    created_at: '2026-02-01T10:15:00Z',
  },
  {
    id: 'lnk_2',
    code: 'webinar',
    destination_url: 'https://example.com/webinar',
    status: 'active',
    click_count: 910,
    max_clicks: 1000,
    expires_at: '2026-02-28T23:59:59Z',
    password_hash: null,
    campaign: {
      id: 'camp_2',
      name: 'Community Webinar',
    },
    tags: [{ id: 'tag_3', name: 'event' }],
    created_at: '2026-02-02T09:00:00Z',
  },
  {
    id: 'lnk_3',
    code: 'github',
    destination_url: 'https://github.com/techgeeks/linkpulse',
    status: 'active',
    click_count: 246,
    max_clicks: null,
    expires_at: null,
    password_hash: null,
    campaign: null,
    tags: [{ id: 'tag_4', name: 'dev' }],
    created_at: '2026-02-03T14:20:00Z',
  },
  {
    id: 'lnk_4',
    code: 'promo-old',
    destination_url: 'https://example.com/promo-old',
    status: 'disabled',
    click_count: 182,
    max_clicks: null,
    expires_at: null,
    password_hash: null,
    disabled_reason: 'Phishing report confirmed',
    disabled_at: '2026-02-08T16:30:00Z',
    campaign: null,
    tags: [],
    created_at: '2026-01-22T11:00:00Z',
  },
  {
    id: 'lnk_5',
    code: 'early-bird',
    destination_url: 'https://example.com/early-bird',
    status: 'expired',
    click_count: 391,
    max_clicks: null,
    expires_at: '2026-01-31T23:59:59Z',
    password_hash: null,
    campaign: {
      id: 'camp_2',
      name: 'Community Webinar',
    },
    tags: [{ id: 'tag_5', name: 'promo' }],
    created_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 'lnk_6',
    code: 'vip-access',
    destination_url: 'https://example.com/vip',
    status: 'limit_reached',
    click_count: 250,
    max_clicks: 250,
    expires_at: null,
    password_hash: 'hashed-secret',
    campaign: null,
    tags: [{ id: 'tag_6', name: 'vip' }],
    created_at: '2026-02-04T18:45:00Z',
  },
];

export const demoCampaigns = [
  {
    id: 'camp_1',
    name: 'Product Launch',
    description: 'Launch campaign across social and email',
    link_count: 8,
    total_clicks: 1290,
    top_link: 'launch',
    created_at: '2026-01-28T10:00:00Z',
  },
  {
    id: 'camp_2',
    name: 'Community Webinar',
    description: 'Webinar registrations and reminders',
    link_count: 5,
    total_clicks: 874,
    top_link: 'webinar',
    created_at: '2026-01-30T13:30:00Z',
  },
  {
    id: 'camp_3',
    name: 'Developer Outreach',
    description: 'GitHub, docs, and OSS promotion',
    link_count: 3,
    total_clicks: 419,
    top_link: 'github',
    created_at: '2026-02-01T09:15:00Z',
  },
];

export const demoTags = [
  { id: 'tag_1', name: 'social' },
  { id: 'tag_2', name: 'launch' },
  { id: 'tag_3', name: 'event' },
  { id: 'tag_4', name: 'dev' },
  { id: 'tag_5', name: 'promo' },
  { id: 'tag_6', name: 'vip' },
];

export const demoImportPreview = {
  summary: {
    total: 5,
    valid: 3,
    invalid: 1,
    duplicates: 1,
  },
  rows: [
    {
      row: 1,
      destination_url: 'https://example.com/spring-sale',
      alias: 'spring',
      campaign: 'Promo',
      tags: 'promo;email',
      status: 'valid',
      reason: 'OK',
    },
    {
      row: 2,
      destination_url: 'not-a-url',
      alias: 'bad-row',
      campaign: 'Promo',
      tags: '',
      status: 'invalid',
      reason: 'Destination must be an absolute http/https URL',
    },
    {
      row: 3,
      destination_url: 'https://example.com/launch',
      alias: 'launch',
      campaign: 'Product Launch',
      tags: 'launch',
      status: 'duplicate',
      reason: 'Alias already exists in database',
    },
    {
      row: 4,
      destination_url: 'https://example.com/docs',
      alias: 'docs-new',
      campaign: 'Developer Outreach',
      tags: 'dev;docs',
      status: 'valid',
      reason: 'OK',
    },
    {
      row: 5,
      destination_url: 'https://example.com/community',
      alias: 'community',
      campaign: 'Community',
      tags: 'community',
      status: 'valid',
      reason: 'OK',
    },
  ],
};

export const demoAdminLinks = demoLinks;

export const demoUsers = [
  {
    id: 'user_demo',
    email: 'demo@linkpulse.dev',
    role: 'admin',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user_2',
    email: 'marketing@example.com',
    role: 'user',
    created_at: '2026-01-05T09:00:00Z',
  },
  {
    id: 'user_3',
    email: 'growth@example.com',
    role: 'user',
    created_at: '2026-01-08T10:30:00Z',
  },
];

export const demoBlocklist = [
  {
    id: 'blk_1',
    domain: 'evil-phishing.example',
    reason: 'Confirmed phishing domain',
    created_at: '2026-02-01T12:00:00Z',
  },
  {
    id: 'blk_2',
    domain: 'malware.example',
    reason: 'Malware distribution',
    created_at: '2026-02-03T15:10:00Z',
  },
];

export const demoAudit = [
  {
    id: 'aud_1',
    actor: 'demo@linkpulse.dev',
    action: 'disable_link',
    target: 'promo-old',
    detail: 'Phishing report confirmed',
    created_at: '2026-02-08T16:30:00Z',
  },
  {
    id: 'aud_2',
    actor: 'demo@linkpulse.dev',
    action: 'add_blocklist_domain',
    target: 'evil-phishing.example',
    detail: 'Added to domain blocklist',
    created_at: '2026-02-01T12:00:00Z',
  },
];