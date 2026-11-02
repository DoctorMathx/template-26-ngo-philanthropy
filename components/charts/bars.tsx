// Pure CSS/SVG bar charts, stacked bars, sparklines and small multiples. Server-safe.
import { cn } from "@/lib/utils";

export type BarDatum = { label: string; value: number; color?: string; display?: string; highlight?: boolean };

/** Horizontal bar list — labels left, values right. */
export function HBarChart({ data, max, className, ariaLabel }: { data: BarDatum[]; max?: number; className?: string; ariaLabel: string }) {
  const m = max ?? Math.max(...data.map((d) => d.value));
  return (
    <figure className={cn("space-y-3.5", className)} role="img" aria-label={ariaLabel}>
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_auto] items-center gap-3 text-[13.5px]">
          <span className="text-ink-2 leading-tight">{d.label}</span>
          <span className="h-3 bg-paper-2 relative" aria-hidden="true">
            <span className="absolute inset-y-0 left-0" style={{ width: `${(d.value / m) * 100}%`, background: d.color ?? (d.highlight ? "var(--coral)" : "var(--navy)") }} />
          </span>
          <span className="font-semibold tabular text-navy min-w-[3.5rem] text-right">{d.display ?? d.value}</span>
        </div>
      ))}
    </figure>
  );
}

/** 100% stacked horizontal bar with legend. */
export function StackedBar({ data, total, format, ariaLabel, height = 28 }: { data: BarDatum[]; total?: number; format?: (n: number) => string; ariaLabel: string; height?: number }) {
  const t = total ?? data.reduce((s, d) => s + d.value, 0);
  const fmt = format ?? ((n: number) => String(n));
  return (
    <figure role="img" aria-label={ariaLabel}>
      <div className="flex w-full overflow-hidden" style={{ height }} aria-hidden="true">
        {data.map((d) => (
          <span key={d.label} style={{ width: `${(d.value / t) * 100}%`, background: d.color }} className="h-full border-r-2 border-white last:border-r-0" title={`${d.label}: ${fmt(d.value)}`} />
        ))}
      </div>
      <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[13.5px]">
        {data.map((d) => (
          <li key={d.label} className="flex items-center justify-between gap-3 border-b border-line pb-2">
            <span className="flex items-center gap-2 text-ink-2"><span className="chip-dot" style={{ background: d.color }} />{d.label}</span>
            <span className="font-semibold tabular text-navy">{fmt(d.value)} <span className="text-muted font-normal">· {Math.round((d.value / t) * 100)}%</span></span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Vertical stacked columns (e.g. commitments by year by focus area). */
export function StackedColumns({
  rows,
  keys,
  ariaLabel,
  format,
}: {
  rows: { label: string; values: Record<string, number> }[];
  keys: { key: string; label: string; color: string }[];
  ariaLabel: string;
  format?: (n: number) => string;
}) {
  const W = 720;
  const H = 300;
  const m = { top: 20, right: 10, bottom: 28, left: 48 };
  const totals = rows.map((r) => keys.reduce((s, k) => s + (r.values[k.key] ?? 0), 0));
  const maxT = Math.max(...totals);
  const raw = maxT / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((s) => s >= raw) ?? raw;
  const yMax = Math.ceil(maxT / step) * step;
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const bw = (iw / rows.length) * 0.62;
  const fmt = format ?? ((n: number) => String(n));
  const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, i) => i * step);
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={ariaLabel} className="block text-navy">
        {ticks.map((t) => {
          const y = m.top + ih - (t / yMax) * ih;
          return (
            <g key={t}>
              <line x1={m.left} x2={W - m.right} y1={y} y2={y} className="chart-grid" />
              <text x={m.left - 8} y={y + 4} textAnchor="end" className="chart-axis" style={{ fontSize: 12 }}>{fmt(t)}</text>
            </g>
          );
        })}
        {rows.map((r, i) => {
          const x = m.left + (iw / rows.length) * i + ((iw / rows.length) - bw) / 2;
          let acc = 0;
          return (
            <g key={r.label}>
              {keys.map((k) => {
                const v = r.values[k.key] ?? 0;
                const h = (v / yMax) * ih;
                const y = m.top + ih - ((acc + v) / yMax) * ih;
                acc += v;
                return <rect key={k.key} x={x} y={y} width={bw} height={Math.max(0, h - 1)} fill={k.color}><title>{`${r.label} · ${k.label}: ${fmt(v)}`}</title></rect>;
              })}
              <text x={x + bw / 2} y={H - 8} textAnchor="middle" className="chart-axis" style={{ fontSize: 12 }}>{r.label}</text>
              <text x={x + bw / 2} y={m.top + ih - (totals[i] / yMax) * ih - 6} textAnchor="middle" className="chart-label" fill="currentColor" style={{ fontSize: 11 }}>{fmt(totals[i])}</text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-ink-2">
        {keys.map((k) => (
          <li key={k.key} className="flex items-center gap-2"><span className="chip-dot" style={{ background: k.color }} />{k.label}</li>
        ))}
      </ul>
    </figure>
  );
}

/** Tiny sparkline / area. */
export function Sparkline({ values, color = "var(--cobalt)", width = 120, height = 36, ariaLabel }: { values: readonly number[]; color?: string; width?: number; height?: number; ariaLabel?: string }) {
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const sx = (i: number) => (i / (values.length - 1)) * (width - 4) + 2;
  const sy = (v: number) => height - 3 - ((v - min) / (max - min || 1)) * (height - 8);
  const d = values.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role={ariaLabel ? "img" : undefined} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} className="shrink-0">
      <path d={`${d} L${sx(values.length - 1)},${height} L${sx(0)},${height} Z`} fill={color} opacity={0.12} />
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <circle cx={sx(values.length - 1)} cy={sy(values[values.length - 1])} r={3} fill={color} />
    </svg>
  );
}

/** Column chart with one highlighted bar (e.g. LOI decisions, funds raised by month). */
export function MiniColumns({ values, labels, highlightLast = true, ariaLabel, color = "var(--navy)" }: { values: number[]; labels: string[]; highlightLast?: boolean; ariaLabel: string; color?: string }) {
  const max = Math.max(...values);
  return (
    <figure role="img" aria-label={ariaLabel} className="flex items-end gap-1.5 h-28">
      {values.map((v, i) => (
        <div key={labels[i]} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end" aria-hidden="true">
          <span className="w-full" style={{ height: `${(v / max) * 100}%`, background: highlightLast && i === values.length - 1 ? "var(--coral)" : color }} />
          <span className="text-[10.5px] text-muted">{labels[i]}</span>
        </div>
      ))}
    </figure>
  );
}
