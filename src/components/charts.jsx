import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/95 shadow-lg backdrop-blur">
      <p className="border-b border-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="space-y-1 px-3 py-2">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: entry.stroke || entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-mono font-semibold text-slate-900">
              {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClicksAreaChart({ data, height = 300 }) {
  const gradientDefs = (
    <defs>
      <linearGradient id="gradHuman" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
      </linearGradient>
      <linearGradient id="gradBot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.28} />
        <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.02} />
      </linearGradient>
    </defs>
  );

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 0 }}>
        {gradientDefs}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={{ stroke: '#e2e8f0' }}
          tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
          dy={6}
        />
        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#c7d2fe', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
        <Area
          type="monotone"
          dataKey="human"
          name="Human clicks"
          stroke="#4f46e5"
          strokeWidth={2.5}
          fill="url(#gradHuman)"
          activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
        />
        <Area
          type="monotone"
          dataKey="bot"
          name="Bot traffic"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeDasharray="6 3"
          fill="url(#gradBot)"
          activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ChartLegend() {
  return (
    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" /> Human
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Bot (filtered)
      </span>
    </div>
  );
}
