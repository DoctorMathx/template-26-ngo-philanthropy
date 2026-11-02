// Pure-SVG line/area chart (no chart libraries). Renders a wide and a narrow layout so that
// axis labels stay legible on phones. Server-safe: no hooks.

export type Pt = { x: number; y: number };
export type LineSeries = {
  label: string;
  points: Pt[];
  color: string;
  dashed?: boolean;
  width?: number;
  area?: boolean;
  endLabel?: boolean;
  dots?: boolean;
};

type Props = {
  series: LineSeries[];
  xMin: number;
  xMax: number;
  yMin?: number;
  yMax: number;
  yTicks?: number[];
  xTicks?: number[];
  format?: (n: number) => string;
  band?: { upper: Pt[]; lower: Pt[]; color: string; label?: string };
  target?: { x: number; y: number; label: string };
  dividerX?: number;
  dividerLabel?: string;
  ariaLabel: string;
  height?: number;
  animate?: boolean;
  /** Show the compact legend under the narrow (phone) layout. */
  mobileLegend?: boolean;
};

function niceTicks(min: number, max: number, count = 4) {
  const span = max - min;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count) ?? raw;
  const out: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(Number(v.toFixed(6)));
  return out;
}

function Chart({ width, height, p }: { width: number; height: number; p: Props }) {
  const narrow = width < 500;
  const m = { top: 18, right: narrow ? 14 : 132, bottom: 30, left: narrow ? 38 : 48 };
  const yMin = p.yMin ?? 0;
  const iw = width - m.left - m.right;
  const ih = height - m.top - m.bottom;
  const sx = (x: number) => m.left + ((x - p.xMin) / (p.xMax - p.xMin)) * iw;
  const sy = (y: number) => m.top + (1 - (y - yMin) / (p.yMax - yMin)) * ih;
  const fmt = p.format ?? ((n: number) => String(n));
  const yTicks = p.yTicks ?? niceTicks(yMin, p.yMax, 4);
  const xTicks = (p.xTicks ?? niceTicks(p.xMin, p.xMax, narrow ? 3 : 6)).filter((t) => t >= p.xMin && t <= p.xMax);
  const path = (pts: Pt[]) => pts.map((pt, i) => `${i ? "L" : "M"}${sx(pt.x).toFixed(1)},${sy(pt.y).toFixed(1)}`).join(" ");
  const fs = narrow ? 12 : 12;

  // End labels: avoid overlaps by nudging apart.
  const ends = p.series
    .filter((s) => s.endLabel !== false && s.points.length)
    .map((s) => ({ s, y: sy(s.points[s.points.length - 1].y), x: sx(s.points[s.points.length - 1].x) }))
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 15) ends[i].y = ends[i - 1].y + 15;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label={p.ariaLabel} className="block overflow-visible">
      {/* grid + y axis */}
      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line x1={m.left} x2={width - m.right} y1={sy(t)} y2={sy(t)} className="chart-grid" />
          <text x={m.left - 8} y={sy(t) + 4} textAnchor="end" className="chart-axis" style={{ fontSize: fs }}>{fmt(t)}</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={`x${t}`} x={sx(t)} y={height - 8} textAnchor="middle" className="chart-axis" style={{ fontSize: fs }}>{t}</text>
      ))}
      <line x1={m.left} x2={width - m.right} y1={sy(yMin)} y2={sy(yMin)} stroke="currentColor" strokeOpacity={0.5} />

      {/* projection shading */}
      {p.dividerX !== undefined && (
        <g>
          <rect x={sx(p.dividerX)} y={m.top} width={width - m.right - sx(p.dividerX)} height={ih} fill="currentColor" opacity={0.04} />
          <line x1={sx(p.dividerX)} x2={sx(p.dividerX)} y1={m.top - 6} y2={sy(yMin)} stroke="currentColor" strokeOpacity={0.45} strokeDasharray="2 3" />
          {p.dividerLabel && (
            <text x={sx(p.dividerX) + 6} y={m.top + 4} className="chart-axis" style={{ fontSize: 11, fontWeight: 600 }}>{p.dividerLabel}</text>
          )}
        </g>
      )}

      {/* scenario band */}
      {p.band && (
        <path
          d={`${path(p.band.upper)} ${p.band.lower.slice().reverse().map((pt) => `L${sx(pt.x).toFixed(1)},${sy(pt.y).toFixed(1)}`).join(" ")} Z`}
          fill={p.band.color}
          opacity={0.12}
        />
      )}

      {/* series */}
      {p.series.map((s) => (
        <g key={s.label}>
          {s.area && (
            <path d={`${path(s.points)} L${sx(s.points[s.points.length - 1].x)},${sy(yMin)} L${sx(s.points[0].x)},${sy(yMin)} Z`} fill={s.color} opacity={0.1} />
          )}
          <path
            d={path(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width ?? 2.5}
            strokeDasharray={s.dashed ? "6 5" : undefined}
            strokeLinejoin="round"
            strokeLinecap="round"
            className={p.animate && !s.dashed ? "draw-line" : undefined}
          />
          {s.dots && s.points.map((pt) => <circle key={pt.x} cx={sx(pt.x)} cy={sy(pt.y)} r={3.5} fill="#fff" stroke={s.color} strokeWidth={2} />)}
          {s.points.length > 0 && <circle cx={sx(s.points[s.points.length - 1].x)} cy={sy(s.points[s.points.length - 1].y)} r={4} fill={s.color} />}
        </g>
      ))}

      {/* target */}
      {p.target && (
        <g>
          <line x1={sx(p.target.x) - 10} x2={sx(p.target.x) + 10} y1={sy(p.target.y)} y2={sy(p.target.y)} stroke="currentColor" strokeWidth={2} />
          <circle cx={sx(p.target.x)} cy={sy(p.target.y)} r={5} fill="#fff" stroke="currentColor" strokeWidth={2} />
          <text x={sx(p.target.x)} y={sy(p.target.y) - 10} textAnchor="middle" className="chart-label" fill="currentColor" style={{ fontSize: 11 }}>{p.target.label}</text>
        </g>
      )}

      {/* end labels (wide only) */}
      {!narrow &&
        ends.map(({ s, x, y }) => (
          <g key={`l-${s.label}`}>
            <text x={x + 10} y={y + 4} className="chart-label" fill={s.color} style={{ fontSize: 12 }}>
              {s.label}
            </text>
            <text x={x + 10} y={y + 18} className="chart-axis" style={{ fontSize: 11 }}>{fmt(s.points[s.points.length - 1].y)}</text>
          </g>
        ))}
    </svg>
  );
}

export function LineChart(props: Props) {
  const h = props.height ?? 340;
  return (
    <div>
      <div className="hidden sm:block">
        <Chart width={760} height={h} p={props} />
      </div>
      <div className="sm:hidden">
        <Chart width={360} height={Math.round(h * 0.78)} p={props} />
      </div>
      {props.mobileLegend !== false && (
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-ink-2 sm:hidden" aria-hidden="true">
        {props.series.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <svg width="22" height="8" aria-hidden="true"><line x1="0" x2="22" y1="4" y2="4" stroke={s.color} strokeWidth="3" strokeDasharray={s.dashed ? "5 4" : undefined} /></svg>
            {s.label}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

/** Screen-reader / "view data" table for any set of series. */
export function ChartDataTable({ series, format, caption }: { series: { label: string; points: Pt[] }[]; format?: (n: number) => string; caption: string }) {
  const xs = Array.from(new Set(series.flatMap((s) => s.points.map((p) => Math.round(p.x))))).sort((a, b) => a - b);
  const fmt = format ?? ((n: number) => String(Math.round(n * 100) / 100));
  return (
    <details className="mt-4 text-[13px]">
      <summary className="cursor-pointer font-semibold text-cobalt min-h-[44px] inline-flex items-center">View chart data</summary>
      <div className="overflow-x-auto mt-2">
        <table className="data-table">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              {series.map((s) => <th key={s.label} scope="col">{s.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {xs.map((x) => (
              <tr key={x}>
                <th scope="row" className="font-semibold">{x}</th>
                {series.map((s) => {
                  const pt = s.points.find((p) => Math.round(p.x) === x);
                  return <td key={s.label} className="tabular">{pt ? fmt(pt.y) : "—"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
