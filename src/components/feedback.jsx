import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertTriangle, Inbox, RefreshCw, ServerCrash, Frown } from 'lucide-react';

export function PageLoader({ message = 'Loading...', fullScreen = true }) {
  const wrapperClass = fullScreen ? 'min-h-[70vh]' : 'py-20';

  return (
    <div className={`flex ${wrapperClass} flex-col items-center justify-center gap-5`}>
      {/* Pulse-ring loader */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-indigo-200/60" />
        <span className="absolute inset-2 animate-pulse-soft rounded-full bg-indigo-100" />
        <span className="relative h-14 w-14 animate-spin rounded-full border-[3px] border-slate-200 border-t-indigo-600" />
        <span className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-slate-600">{message}</p>
        <div className="mx-auto mt-3 h-1 w-40 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-400 via-violet-500 to-fuchsia-500"
            style={{ animation: 'loader-slide 1.1s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-slide {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(420%); }
        }
      `}</style>
    </div>
  );
}

export function FullScreenLoader({ message }) {
  return (
    <div className="min-h-screen">
      <PageLoader message={message} fullScreen />
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', error, onRetry }) {
  const message = error?.message || String(error || 'Unknown error');

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-rose-200/70 bg-gradient-to-b from-rose-50/80 to-white p-8 text-center shadow-card">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100/80 ring-1 ring-rose-200">
        <ServerCrash className="h-7 w-7 text-rose-600" />
      </span>
      <h2 className="font-display text-lg font-bold text-rose-900">{title}</h2>
      <p className="mt-2 max-w-md break-words text-sm leading-relaxed text-rose-700/80">{message}</p>

      {onRetry ? (
        <button
          onClick={onRetry}
          className="btn-sheen mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-rose-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_-4px_rgba(225,29,72,0.6)] transition hover:to-rose-700 active:translate-y-px"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function ErrorScreen({ error }) {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <ErrorState error={error} />
    </div>
  );
}

export function RouteErrorScreen() {
  const error = useRouteError();
  return <ErrorScreen error={error} />;
}

export function EmptyState({ title = 'Nothing here yet', description, action, icon: Icon = Inbox }) {
  return (
    <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-card">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(24rem 12rem at 50% -10%, rgba(99,102,241,0.08), transparent 70%)',
        }}
      />
      <span className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
        <Icon className="h-7 w-7 text-indigo-400" />
      </span>
      <h2 className="relative font-display text-lg font-bold text-slate-800">{title}</h2>

      {description ? (
        <p className="relative mt-2 max-w-md text-sm leading-relaxed text-slate-500">{description}</p>
      ) : null}

      {action ? <div className="relative mt-5">{action}</div> : null}
    </div>
  );
}
