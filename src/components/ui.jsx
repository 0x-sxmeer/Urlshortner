import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Check,
  Loader2,
  Search,
  Plus,
  ArrowRight,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Surface primitives                                                */
/* ------------------------------------------------------------------ */

export function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.08)] ${
        hover ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_32px_-12px_rgba(79,70,229,0.18)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ title, description, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h2>
        {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-enter mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-slate-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                           */
/* ------------------------------------------------------------------ */

const buttonVariants = {
  primary:
    'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_-2px_rgba(79,70,229,0.5)] hover:from-indigo-500 hover:to-indigo-700 active:translate-y-px',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 active:translate-y-px',
  danger:
    'bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_-2px_rgba(225,29,72,0.45)] hover:to-rose-700 active:translate-y-px',
  success:
    'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_8px_-2px_rgba(5,150,105,0.45)] hover:to-emerald-700 active:translate-y-px',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9.5 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-sm gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  className = '',
  children,
  as,
  ...props
}) {
  const Component = as || 'button';
  return (
    <Component
      className={`btn-sheen inline-flex select-none items-center justify-center whitespace-nowrap rounded-xl font-medium outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className="h-4 w-4" />
      ) : null}
      {children}
      {IconRight ? <IconRight className="h-4 w-4" /> : null}
    </Component>
  );
}

export function LinkButton({ to, ...props }) {
  return <Button as={Link} to={to} {...props} />;
}

/* ------------------------------------------------------------------ */
/*  Form controls                                                     */
/* ------------------------------------------------------------------ */

export function Field({ label, hint, error, children, className = '' }) {
  return (
    <div className={className}>
      {label ? (
        <label className="mb-1.5 block text-[13px] font-medium text-slate-700">{label}</label>
      ) : null}
      {children}
      {error ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
          <X className="h-3 w-3" /> {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ icon: Icon, className = '', ...props }) {
  if (Icon) {
    return (
      <div className={`relative ${className}`}>
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 shadow-[inset_0_1px_2px_rgba(16,24,40,0.04)] outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          {...props}
        />
      </div>
    );
  }
  return (
    <input
      className={`h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-[inset_0_1px_2px_rgba(16,24,40,0.04)] outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`h-10 cursor-pointer rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-[inset_0_1px_2px_rgba(16,24,40,0.04)] outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search…', className = '' }) {
  return (
    <Input icon={Search} value={value} onChange={onChange} placeholder={placeholder} className={className} />
  );
}

/* ------------------------------------------------------------------ */
/*  Data display                                                      */
/* ------------------------------------------------------------------ */

const chipTones = {
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  red: 'border-rose-200 bg-rose-50 text-rose-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  orange: 'border-orange-200 bg-orange-50 text-orange-700',
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  slate: 'border-slate-200 bg-slate-50 text-slate-600',
  fuchsia: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700',
  sky: 'border-sky-200 bg-sky-50 text-sky-700',
};

export function Chip({ tone = 'slate', dot = false, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${chipTones[tone] || chipTones.slate} ${className}`}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" /> : null}
      {children}
    </span>
  );
}

/* Stat tile used across admin + import pages */
export function StatTile({ icon: Icon, label, value, tone = 'indigo' }) {
  const tones = {
    indigo: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    red: 'bg-rose-50 text-rose-600 ring-rose-100',
    amber: 'bg-amber-50 text-amber-600 ring-amber-100',
    sky: 'bg-sky-50 text-sky-600 ring-sky-100',
    slate: 'bg-slate-100 text-slate-600 ring-slate-200',
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-card">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${tones[tone] || tones.indigo}`}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="font-display truncate text-lg font-bold leading-tight text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export function TagPill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] text-slate-600">
      {children}
    </span>
  );
}

export function ProgressBar({ value = 0, tone = 'indigo', className = '' }) {
  const pct = Math.min(100, Math.max(0, value));
  const tones = {
    indigo: 'from-indigo-400 to-indigo-600',
    emerald: 'from-emerald-400 to-emerald-600',
    amber: 'from-amber-400 to-amber-500',
    red: 'from-rose-400 to-rose-600',
  };
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ${tones[tone] || tones.indigo}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Avatar({ name = '?', size = 'md', className = '' }) {
  const sizes = { sm: 'h-7 w-7 text-[11px]', md: 'h-9 w-9 text-xs', lg: 'h-12 w-12 text-sm' };
  const initials = String(name)
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 font-semibold text-white shadow-inner ring-2 ring-white ${sizes[size]} ${className}`}
    >
      {initials || '?'}
    </span>
  );
}

export function Table({ columns, children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200/80">
            {columns.map((col) => (
              <th
                key={col}
                className="whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 first:pl-5 last:pr-5"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Tr({ children, className = '', ...props }) {
  return (
    <tr
      className={`group/row border-b border-slate-100 transition-colors last:border-0 hover:bg-indigo-50/40 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function Td({ children, className = '', ...props }) {
  return (
    <td className={`px-4 py-3.5 align-middle first:pl-5 last:pr-5 ${className}`} {...props}>
      {children}
    </td>
  );
}

export function EmptyTableState({ message = 'No results match your filters.' }) {
  return (
    <tr>
      <td colSpan={12} className="px-5 py-12 text-center text-sm text-slate-400">
        {message}
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive helpers                                               */
/* ------------------------------------------------------------------ */

export function CopyButton({ text, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 ${
        copied ? '!border-emerald-200 !bg-emerald-50 !text-emerald-700' : ''
      } ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

export function SegmentedTabs({ items, value, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1">
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-all duration-150 ${
              active
                ? 'bg-white text-slate-900 shadow-[0_1px_3px_rgba(16,24,40,0.1)]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {item.icon ? <item.icon className="h-3.5 w-3.5" /> : null}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function Stepper({ steps, current }) {
  return (
    <div className="mb-8 flex items-center">
      {steps.map((step, index) => {
        const num = index + 1;
        const done = current > num;
        const active = current === num;
        return (
          <React.Fragment key={step}>
            <div className="flex items-center gap-3">
              <span
                className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  done
                    ? 'bg-emerald-500 text-white shadow-[0_2px_10px_-2px_rgba(16,185,129,0.6)]'
                    : active
                      ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[0_2px_10px_-2px_rgba(79,70,229,0.7)] ring-4 ring-indigo-100'
                      : 'border border-slate-200 bg-white text-slate-400'
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : num}
              </span>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  active ? 'text-slate-900' : done ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={`mx-4 h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                  done ? 'bg-emerald-400' : 'bg-slate-200'
                }`}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function Alert({ tone = 'info', icon: Icon, title, children, className = '' }) {
  const tones = {
    info: 'border-sky-200 bg-sky-50 text-sky-800',
    warning: 'border-amber-200 bg-amber-50 text-amber-800',
    error: 'border-rose-200 bg-rose-50 text-rose-800',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  };
  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${tones[tone]} ${className}`}>
      {Icon ? <Icon className="mt-0.5 h-4 w-4 shrink-0" /> : null}
      <div className="min-w-0">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className={title ? 'mt-0.5' : ''}>{children}</div> : null}
      </div>
    </div>
  );
}

export { Plus, ArrowRight };
