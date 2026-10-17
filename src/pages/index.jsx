import React, { useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import {
  Activity,
  Bot,
  Users,
  AlertTriangle,
  Link2,
  QrCode,
  Copy,
  ArrowLeft,
  ArrowRight,
  Megaphone,
  Tag,
  Upload,
  ShieldCheck,
  ShieldAlert,
  Lock,
  CheckCircle,
  XCircle,
  Search,
  Trash2,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

import {
  demoOverview,
  demoLinks,
  demoCampaigns,
  demoTags,
  demoImportPreview,
  demoUsers,
  demoBlocklist,
  demoAudit,
  delay,
} from '@/lib/demo';

import { queryKeys } from '@/app/queryKeys';
import { authApi } from '@/api/auth.api';
import { EmptyState, ErrorState, PageLoader } from '@/components/feedback';

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          {sub ? <p className="mt-1 text-xs text-slate-400">{sub}</p> : null}
        </div>

        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function StatusChip({ status }) {
  const styles = {
    active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    disabled: 'border-red-200 bg-red-50 text-red-700',
    expired: 'border-amber-200 bg-amber-50 text-amber-700',
    limit_reached: 'border-orange-200 bg-orange-50 text-orange-700',
  };

  const labels = {
    active: 'Active',
    disabled: 'Disabled',
    expired: 'Expired',
    limit_reached: 'Limit Reached',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || 'border-slate-200 bg-slate-50 text-slate-600'
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function randomCode(length = 7) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let code = '';

  for (let i = 0; i < length; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

export function LoginPage() {
  const [email, setEmail] = useState('demo@linkpulse.dev');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.login({ email, password });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Sign in to LinkPulse</h1>
        <p className="mt-1 text-sm text-slate-500">
          Demo mode is currently disabled. Use your backend credentials.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          No account?{' '}
          <Link to="/register" className="font-medium text-indigo-600">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.register({
        full_name: fullName,
        email,
        password,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Create LinkPulse account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Register to create campaign-aware smart links.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}

export function DashboardPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.analytics.overview({ period: '7d' }),
    queryFn: async () => {
      await delay(500);
      return demoOverview;
    },
  });

  if (isLoading) {
    return <PageLoader message="Loading dashboard analytics..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data) {
    return (
      <EmptyState
        title="No analytics yet"
        description="Create a link and generate clicks to see analytics."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Live click telemetry, bot filtering, and link alerts."
        action={
          <Link
            to="/links/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create link
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={Activity}
          label="Human clicks"
          value={data.human_clicks.toLocaleString()}
          sub="Last 7 days"
        />

        <MetricCard
          icon={Bot}
          label="Bot share"
          value={`${data.bot_share}%`}
          sub="Flagged, never counted as human"
        />

        <MetricCard
          icon={Users}
          label="Daily unique visitors"
          value={data.daily_unique_visitors.toLocaleString()}
          sub="Hashed visitor count"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h2 className="mb-4 font-semibold text-slate-900">Clicks over time</h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.clicks_over_time}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="human"
                  stroke="#4f46e5"
                  fill="#c7d2fe"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="bot"
                  stroke="#94a3b8"
                  fill="#e2e8f0"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold text-slate-900">Link alerts</h2>

          <div className="space-y-3">
            {data.alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 rounded-lg border border-slate-200 p-3"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                <p className="text-sm text-slate-700">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 font-semibold text-slate-900">Top links</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4 font-medium">Short code</th>
                <th className="py-2 pr-4 font-medium">Human clicks</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.top_links.map((item) => (
                <tr key={item.code} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    /{item.code}
                  </td>
                  <td className="py-3 pr-4">{item.clicks}</td>
                  <td className="py-3">
                    <Link
                      to="/links"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      View links
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function LinksPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.links.list(),
    queryFn: async () => {
      await delay(450);
      return demoLinks;
    },
  });

  if (isLoading) {
    return <PageLoader message="Loading links..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="No links yet"
        description="Create your first smart link with rules, campaign, and tags."
        action={
          <Link
            to="/links/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create link
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Links"
        description="Manage rules, analytics, QR codes, and lifecycle."
        action={
          <Link
            to="/links/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create link
          </Link>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-4 font-medium">Code</th>
                <th className="py-2 pr-4 font-medium">Destination</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Clicks</th>
                <th className="py-2 pr-4 font-medium">Campaign</th>
                <th className="py-2 pr-4 font-medium">Tags</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((link) => (
                <tr key={link.id} className="border-b border-slate-100 align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    /{link.code}
                  </td>

                  <td className="max-w-[220px] truncate py-3 pr-4 text-slate-600">
                    {link.destination_url}
                  </td>

                  <td className="py-3 pr-4">
                    <StatusChip status={link.status} />
                  </td>

                  <td className="py-3 pr-4">
                    {link.click_count}
                    {link.max_clicks ? ` / ${link.max_clicks}` : ''}
                  </td>

                  <td className="py-3 pr-4">
                    {link.campaign?.name || <span className="text-slate-400">—</span>}
                  </td>

                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {link.tags.length
                        ? link.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                            >
                              {tag.name}
                            </span>
                          ))
                        : '—'}
                    </div>
                  </td>

                  <td className="py-3">
                    <Link
                      to={`/links/${link.id}`}
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function validateDestination(value) {
  const errors = [];
  const warnings = [];

  if (!value) {
    errors.push('Destination URL is required.');
    return { errors, warnings };
  }

  try {
    const url = new URL(value);

    if (!['http:', 'https:'].includes(url.protocol)) {
      errors.push('Destination must use http or https.');
    }

    if (url.hostname === 'localhost' || url.hostname.startsWith('127.')) {
      errors.push('Localhost destinations are not allowed.');
    }

    if (/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) {
      warnings.push('Destination host is a raw IP address.');
    }

    if (url.hostname.includes('xn--')) {
      warnings.push('Destination uses punycode and may look like a lookalike domain.');
    }

    if (url.protocol === 'http:') {
      warnings.push('Destination uses plain HTTP instead of HTTPS.');
    }
  } catch {
    errors.push('Destination must be a valid absolute URL.');
  }

  return { errors, warnings };
}

function validateAlias(value) {
  const errors = [];
  const warnings = [];

  if (!value) {
    return { errors, warnings };
  }

  const reserved = [
    'api',
    'app',
    'admin',
    'login',
    'static',
    'assets',
    'docs',
    'healthz',
    'unlock',
    'favicon.ico',
    'robots.txt',
  ];

  if (value.length < 3 || value.length > 32) {
    errors.push('Alias must be between 3 and 32 characters.');
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    errors.push('Alias may only contain letters, numbers, hyphen, and underscore.');
  }

  if (reserved.includes(value.toLowerCase())) {
    errors.push('This alias is reserved.');
  }

  if (demoLinks.some((link) => link.code === value)) {
    errors.push('This alias already exists.');
  }

  return { errors, warnings };
}

export function CreateLinkPage() {
  const [step, setStep] = useState(1);
  const [published, setPublished] = useState(null);

  const [form, setForm] = useState({
    destination_url: 'https://example.com/launch',
    alias: 'launch-demo',
    expires_at: '',
    max_clicks: '',
    password: '',
    campaign: 'Product Launch',
    tags: 'launch,social',
  });

  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);

  function update(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  React.useEffect(() => {
    const destination = validateDestination(form.destination_url);
    const alias = validateAlias(form.alias);

    setErrors([...destination.errors, ...alias.errors]);
    setWarnings([...destination.warnings, ...alias.warnings]);
  }, [form.destination_url, form.alias]);

  if (published) {
    const shortUrl = `${window.location.origin}/${published.code}`;

    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Link published"
          description="Your short link is ready. In the full implementation, this will call the backend and return the persisted record."
        />

        <Card className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Short URL</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{shortUrl}</p>
            </div>

            <CopyButton text={shortUrl} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-700">Destination</p>
              <p className="mt-2 break-all text-sm text-slate-600">
                {form.destination_url}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-700">Rules</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>Expiry: {form.expires_at || 'None'}</li>
                <li>Click cap: {form.max_clicks || 'None'}</li>
                <li>Password: {form.password ? 'Enabled' : 'Disabled'}</li>
                <li>Campaign: {form.campaign || 'None'}</li>
                <li>Tags: {form.tags || 'None'}</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-lg bg-white p-4 text-slate-400">
              <QrCode className="h-16 w-16" />
            </div>

            <div>
              <p className="font-medium text-slate-800">QR code</p>
              <p className="mt-1 text-sm text-slate-500">
                The production version will render PNG/SVG from the backend.
              </p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Create link"
        description="Two-step wizard with live validation and pre-publish warnings."
      />

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`h-8 w-8 rounded-full text-sm font-semibold flex items-center justify-center ${
              step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            1
          </div>

          <div className="h-px flex-1 bg-slate-200" />

          <div
            className={`h-8 w-8 rounded-full text-sm font-semibold flex items-center justify-center ${
              step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            2
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Destination URL
              </label>
              <input
                value={form.destination_url}
                onChange={(event) => update('destination_url', event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Custom alias
              </label>
              <input
                value={form.alias}
                onChange={(event) => update('alias', event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="Optional"
              />
            </div>

            {errors.length > 0 ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errors.map((message) => (
                  <p key={message}>{message}</p>
                ))}
              </div>
            ) : null}

            {warnings.length > 0 ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                {warnings.map((message) => (
                  <p key={message}>{message}</p>
                ))}
              </div>
            ) : null}

            <div className="flex justify-end">
              <button
                disabled={errors.length > 0}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Expiry
                </label>
                <input
                  type="datetime-local"
                  value={form.expires_at}
                  onChange={(event) => update('expires_at', event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Click cap
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.max_clicks}
                  onChange={(event) => update('max_clicks', event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Unlimited"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => update('password', event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Campaign
                </label>
                <input
                  value={form.campaign}
                  onChange={(event) => update('campaign', event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Tags
                </label>
                <input
                  value={form.tags}
                  onChange={(event) => update('tags', event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="launch,social,email"
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-800">Review</h3>

              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>Destination: {form.destination_url}</li>
                <li>Alias: {form.alias || 'Auto-generated'}</li>
                <li>Expiry: {form.expires_at || 'None'}</li>
                <li>Click cap: {form.max_clicks || 'None'}</li>
                <li>Password: {form.password ? 'Enabled' : 'Disabled'}</li>
                <li>Campaign: {form.campaign || 'None'}</li>
                <li>Tags: {form.tags || 'None'}</li>
              </ul>

              {warnings.length > 0 ? (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                  {warnings.map((message) => (
                    <p key={message}>{message}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                onClick={() => {
                  setPublished({
                    code: form.alias || randomCode(),
                  });
                }}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Publish link
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export function LinkDetailPage() {
  const { linkId } = useParams();
  const [tab, setTab] = useState('analytics');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.links.detail(linkId),
    queryFn: async () => {
      await delay(350);
      return demoLinks.find((link) => link.id === linkId || link.code === linkId) || null;
    },
  });

  if (isLoading) {
    return <PageLoader message="Loading link detail..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data) {
    return (
      <EmptyState
        title="Link not found"
        description="This link may have been removed or you may not have access."
      />
    );
  }

  const shortUrl = `${window.location.origin}/${data.code}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`/${data.code}`}
        description={data.destination_url}
        action={<StatusChip status={data.status} />}
      />

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'analytics', label: 'Analytics' },
          { id: 'qr', label: 'QR Code' },
          { id: 'rules', label: 'Rules' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === item.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'analytics' ? (
        <Card>
          <h2 className="mb-4 font-semibold text-slate-900">Link analytics</h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoOverview.clicks_over_time}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="human"
                  stroke="#4f46e5"
                  fill="#c7d2fe"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="bot"
                  stroke="#94a3b8"
                  fill="#e2e8f0"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ) : null}

      {tab === 'qr' ? (
        <Card>
          <h2 className="mb-4 font-semibold text-slate-900">QR code</h2>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-slate-400">
              <QrCode className="h-24 w-24" />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                QR code target: <span className="font-medium">{shortUrl}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                <CopyButton text={shortUrl} />

                <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Download PNG
                </button>

                <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Download SVG
                </button>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {tab === 'rules' ? (
        <Card>
          <h2 className="mb-4 font-semibold text-slate-900">Rules</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Expiry</p>
              <p className="mt-1 font-medium text-slate-800">
                {data.expires_at || 'No expiry'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Click cap</p>
              <p className="mt-1 font-medium text-slate-800">
                {data.max_clicks ? `${data.click_count} / ${data.max_clicks}` : 'Unlimited'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Password</p>
              <p className="mt-1 font-medium text-slate-800">
                {data.password_hash ? 'Enabled' : 'Disabled'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Campaign</p>
              <p className="mt-1 font-medium text-slate-800">
                {data.campaign?.name || 'None'}
              </p>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}

export function CampaignsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.campaigns.list(),
    queryFn: async () => {
      await delay(350);
      return demoCampaigns;
    },
  });

  if (isLoading) {
    return <PageLoader message="Loading campaigns..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data?.length) {
    return <EmptyState title="No campaigns yet" />;
  }

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Group links into campaign-level analytics."
        action={
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Create campaign
          </button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {data.map((campaign) => (
          <Card key={campaign.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">{campaign.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{campaign.description}</p>
              </div>

              <Megaphone className="h-5 w-5 text-indigo-500" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Links</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {campaign.link_count}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Clicks</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {campaign.total_clicks}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Top link</p>
                <p className="mt-1 font-semibold text-slate-900">
                  /{campaign.top_link}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TagsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.tags.list(),
    queryFn: async () => {
      await delay(300);
      return demoTags;
    },
  });

  if (isLoading) {
    return <PageLoader message="Loading tags..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data?.length) {
    return <EmptyState title="No tags yet" />;
  }

  return (
    <div>
      <PageHeader
        title="Tags"
        description="Flexible labels for links, reports, and filtering."
        action={
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Create tag
          </button>
        }
      />

      <Card>
        <div className="flex flex-wrap gap-3">
          {data.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              {tag.name}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function ImportPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [committed, setCommitted] = useState(false);

  const preview = demoImportPreview;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Batch Import Links"
        description="Upload CSV files to create or update multiple short links simultaneously with validation and deduplication."
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Rows</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{preview.summary.total}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Valid Rows</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">{preview.summary.valid}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-red-600 uppercase tracking-wide">Invalid Rows</p>
          <p className="mt-2 text-2xl font-bold text-red-600">{preview.summary.invalid}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Duplicates</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">{preview.summary.duplicates}</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8 text-center hover:border-indigo-400 transition cursor-pointer">
          <Upload className="h-10 w-10 text-slate-400" />
          <p className="mt-3 text-sm font-medium text-slate-700">Drop your CSV here or click to browse</p>
          <p className="mt-1 text-xs text-slate-400">Required header: destination_url, alias, campaign, tags</p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files?.[0]?.name || 'links_export.csv')}
            className="mt-4 text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-slate-900">Pre-Import Validation Preview</h2>
            <p className="text-xs text-slate-500 mt-0.5">Previewing simulated rows from sample import</p>
          </div>

          <button
            disabled={committed}
            onClick={() => setCommitted(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {committed ? 'Import Complete!' : `Commit Import (${preview.summary.valid} Valid)`}
          </button>
        </div>

        {committed && (
          <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            Successfully imported {preview.summary.valid} short links into LinkPulse!
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2.5 pr-4 font-medium">Row</th>
                <th className="py-2.5 pr-4 font-medium">Destination URL</th>
                <th className="py-2.5 pr-4 font-medium">Alias</th>
                <th className="py-2.5 pr-4 font-medium">Campaign</th>
                <th className="py-2.5 pr-4 font-medium">Tags</th>
                <th className="py-2.5 pr-4 font-medium">Status</th>
                <th className="py-2.5 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody>
              {preview.rows.map((row) => (
                <tr key={row.row} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-mono text-xs text-slate-400">#{row.row}</td>
                  <td className="py-3 pr-4 font-mono text-xs max-w-[200px] truncate text-slate-800">{row.destination_url}</td>
                  <td className="py-3 pr-4 font-medium text-slate-900">{row.alias || '—'}</td>
                  <td className="py-3 pr-4 text-slate-600">{row.campaign || '—'}</td>
                  <td className="py-3 pr-4 text-slate-600">{row.tags || '—'}</td>
                  <td className="py-3 pr-4">
                    {row.status === 'valid' && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle className="h-3 w-3" /> Valid
                      </span>
                    )}
                    {row.status === 'invalid' && (
                      <span className="inline-flex items-center gap-1 text-xs text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                        <XCircle className="h-3 w-3" /> Invalid
                      </span>
                    )}
                    {row.status === 'duplicate' && (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                        <AlertCircle className="h-3 w-3" /> Duplicate
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-xs text-slate-500">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AdminOverviewPage() {
  const { data = demoOverview } = useQuery({
    queryKey: queryKeys.admin.analytics(),
    queryFn: async () => {
      await delay(250);
      return demoOverview;
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          icon={Link2}
          label="Total Managed Links"
          value={demoLinks.length}
          sub="Platform-wide active links"
        />
        <MetricCard
          icon={Users}
          label="Registered Users"
          value={demoUsers.length}
          sub="1 Admin, 2 Regular users"
        />
        <MetricCard
          icon={ShieldAlert}
          label="Blocked Domains"
          value={demoBlocklist.length}
          sub="Malicious / phishing blocklist"
        />
        <MetricCard
          icon={Bot}
          label="Bot Share"
          value={`${data.bot_share}%`}
          sub="Automated threat mitigation"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Governance & Security Alerts</h2>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
              {data.alerts.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {data.alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition"
              >
                <AlertTriangle className={`mt-0.5 h-4 w-4 shrink-0 ${alert.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                  <p className="text-xs text-slate-400 capitalize mt-0.5">Severity: {alert.severity}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Recent Admin Audit Activity</h2>
            <Link to="/admin/audit" className="text-xs font-medium text-indigo-600 hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {demoAudit.map((log) => (
              <div key={log.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{log.action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{log.detail} (target: {log.target})</p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(log.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminLinksPage() {
  const [links, setLinks] = useState(demoLinks);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredLinks = links.filter((l) => {
    if (filter !== 'all' && l.status !== filter) return false;
    if (search && !l.code.toLowerCase().includes(search.toLowerCase()) && !l.destination_url.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const toggleStatus = (id) => {
    setLinks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'disabled' ? 'active' : 'disabled';
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Platform Link Management</h2>
          <p className="text-xs text-slate-500">Inspect, monitor, and enforce takedowns on any user short link.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search code or URL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
            <option value="expired">Expired</option>
            <option value="limit_reached">Limit Reached</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2.5 pr-4 font-medium">Code</th>
              <th className="py-2.5 pr-4 font-medium">Destination URL</th>
              <th className="py-2.5 pr-4 font-medium">Status</th>
              <th className="py-2.5 pr-4 font-medium">Clicks</th>
              <th className="py-2.5 pr-4 font-medium">Flags / Notes</th>
              <th className="py-2.5 font-medium">Takedown Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.map((link) => (
              <tr key={link.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium text-slate-900">/{link.code}</td>
                <td className="py-3 pr-4 max-w-[240px] truncate text-slate-600 font-mono text-xs">{link.destination_url}</td>
                <td className="py-3 pr-4"><StatusChip status={link.status} /></td>
                <td className="py-3 pr-4 text-slate-700 font-medium">{link.click_count}</td>
                <td className="py-3 pr-4 text-xs text-slate-500">{link.disabled_reason || 'Clean'}</td>
                <td className="py-3">
                  <button
                    onClick={() => toggleStatus(link.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                      link.status === 'disabled'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {link.status === 'disabled' ? 'Reinstate Link' : 'Disable / Takedown'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function AdminUsersPage() {
  const [users, setUsers] = useState(demoUsers);

  const toggleRole = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, role: u.role === 'admin' ? 'user' : 'admin' };
        }
        return u;
      })
    );
  };

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Platform Users & Roles</h2>
        <p className="text-xs text-slate-500">Manage user authorization and platform permissions.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2.5 pr-4 font-medium">User ID</th>
              <th className="py-2.5 pr-4 font-medium">Email</th>
              <th className="py-2.5 pr-4 font-medium">Role</th>
              <th className="py-2.5 pr-4 font-medium">Member Since</th>
              <th className="py-2.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-mono text-xs text-slate-500">{user.id}</td>
                <td className="py-3 pr-4 font-medium text-slate-800">{user.email}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 pr-4 text-xs text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="py-3">
                  <button
                    onClick={() => toggleRole(user.id)}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Toggle {user.role === 'admin' ? 'User' : 'Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function AdminBlocklistPage() {
  const [blocklist, setBlocklist] = useState(demoBlocklist);
  const [domain, setDomain] = useState('');
  const [reason, setReason] = useState('');

  const addDomain = (e) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setBlocklist((prev) => [
      ...prev,
      {
        id: `blk_${Date.now()}`,
        domain: domain.trim(),
        reason: reason.trim() || 'Blocked by administrator',
        created_at: new Date().toISOString(),
      },
    ]);
    setDomain('');
    setReason('');
  };

  const removeDomain = (id) => {
    setBlocklist((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-base font-semibold text-slate-900 mb-2">Add Domain to Global Blocklist</h2>
        <p className="text-xs text-slate-500 mb-4">Prevent destination links to confirmed phishing, scam, or malware domains.</p>

        <form onSubmit={addDomain} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="example-scam.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none focus:border-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Reason (e.g. Confirmed phishing)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Block Domain
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-slate-900 mb-4">Currently Blocklisted Domains ({blocklist.length})</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2.5 pr-4 font-medium">Domain</th>
                <th className="py-2.5 pr-4 font-medium">Reason</th>
                <th className="py-2.5 pr-4 font-medium">Date Added</th>
                <th className="py-2.5 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blocklist.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-mono font-medium text-red-600">{item.domain}</td>
                  <td className="py-3 pr-4 text-slate-600">{item.reason}</td>
                  <td className="py-3 pr-4 text-xs text-slate-400">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="py-3">
                    <button
                      onClick={() => removeDomain(item.id)}
                      className="text-xs text-slate-500 hover:text-red-600 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AdminAuditLogPage() {
  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Governance Audit Trail</h2>
        <p className="text-xs text-slate-500">Immutable record of administrative actions and platform enforcement.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2.5 pr-4 font-medium">Timestamp</th>
              <th className="py-2.5 pr-4 font-medium">Actor</th>
              <th className="py-2.5 pr-4 font-medium">Action</th>
              <th className="py-2.5 pr-4 font-medium">Target</th>
              <th className="py-2.5 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {demoAudit.map((log) => (
              <tr key={log.id} className="border-b border-slate-100">
                <td className="py-3 pr-4 text-xs font-mono text-slate-400">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="py-3 pr-4 font-medium text-slate-700">{log.actor}</td>
                <td className="py-3 pr-4">
                  <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                    {log.action}
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-indigo-600">{log.target}</td>
                <td className="py-3 text-xs text-slate-600">{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function PasswordGatePage() {
  const { code } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Password is required.');
      return;
    }

    // Demo validation
    if (password === 'secret' || password === '123456') {
      setUnlocked(true);
      setError(null);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50">
        <Card className="max-w-md w-full text-center">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Link Unlocked!</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Redirecting to destination for <span className="font-mono font-semibold">/{code}</span>...
          </p>
          <a
            href="https://example.com/vip"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Proceed to Destination <ExternalLink className="h-4 w-4" />
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Password Protected Link</h1>
          <p className="text-sm text-slate-500 mt-1">
            Access to <span className="font-mono font-medium text-slate-700">/{code}</span> requires an authorization password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Enter Link Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Unlock & Proceed
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          Demo hint: try entering password <span className="font-mono text-slate-600">secret</span>
        </p>
      </Card>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <Card className="max-w-md w-full p-8">
        <p className="text-5xl font-extrabold text-indigo-600 mb-2">404</p>
        <h1 className="text-xl font-bold text-slate-900 mb-2">Page or Link Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The short link or page you are looking for does not exist, has expired, or has been removed.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Return to Dashboard
        </Link>
      </Card>
    </div>
  );
}

export function GonePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <Card className="max-w-md w-full p-8 border-amber-200">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
        <p className="text-3xl font-extrabold text-slate-800 mb-1">410 Gone</p>
        <h1 className="text-lg font-bold text-slate-900 mb-2">Link Expired or Inactive</h1>
        <p className="text-sm text-slate-500 mb-6">
          This short link has reached its maximum click limit or its expiration timestamp has elapsed. Traffic forwarding is permanently disabled.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900"
        >
          Back to LinkPulse
        </Link>
      </Card>
    </div>
  );
}

export function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50 text-center">
      <Card className="max-w-md w-full p-8 border-red-200">
        <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <p className="text-3xl font-extrabold text-red-700 mb-1">403</p>
        <h1 className="text-lg font-bold text-slate-900 mb-2">Access Forbidden</h1>
        <p className="text-sm text-slate-500 mb-6">
          You do not have permissions to access the administrator governance console. Please log in with an administrator account.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Return to Dashboard
        </Link>
      </Card>
    </div>
  );
}