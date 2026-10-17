import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';

export function PageLoader({ message = 'Loading...', fullScreen = true }) {
  const wrapperClass = fullScreen ? 'min-h-screen' : 'py-20';

  return (
    <div className={`flex ${wrapperClass} items-center justify-center`}>
      <div className="flex items-center gap-3 text-slate-500">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
        <span>{message}</span>
      </div>
    </div>
  );
}

export function FullScreenLoader({ message }) {
  return <PageLoader message={message} fullScreen />;
}

export function ErrorState({
  title = 'Something went wrong',
  error,
  onRetry,
}) {
  const message = error?.message || String(error || 'Unknown error');

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <AlertTriangle className="mb-3 h-8 w-8 text-red-500" />
      <h2 className="text-lg font-semibold text-red-800">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-red-700">{message}</p>

      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
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

export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <Inbox className="mb-3 h-8 w-8 text-slate-400" />
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>

      {description ? (
        <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
      ) : null}

      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}