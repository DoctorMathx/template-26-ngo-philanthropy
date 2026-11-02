import type { Indicator } from "@/lib/types";
import { ChartDataTable, LineChart } from "./line-chart";

export const SCENARIO = {
  actual: "#0B1F3A",
  current: "#5B6880",
  best: "#0072CE",
  worst: "#F2795B",
};

function fmtFor(ind: Indicator) {
  if (ind.yMax <= 5) return (n: number) => n.toFixed(1);
  return (n: number) => Math.round(n).toLocaleString("en-NG");
}

/** Actual vs. projected best/worst-case scenarios, Progress-Report style. */
export function IndicatorChart({ ind, compact, animate }: { ind: Indicator; compact?: boolean; animate?: boolean }) {
  const fmt = fmtFor(ind);
  const xMin = ind.actual[0].x;
  const series = [
    { label: "Actual", points: ind.actual, color: SCENARIO.actual, width: 3 },
    { label: "Current trajectory", points: ind.current, color: SCENARIO.current, dashed: true, width: 2.25 },
    { label: "Best case", points: ind.best, color: SCENARIO.best, dashed: true, width: 2.25 },
    { label: "Worst case", points: ind.worst, color: SCENARIO.worst, dashed: true, width: 2.25 },
  ];
  return (
    <div className="text-navy">
      <LineChart
        ariaLabel={`${ind.title}: ${ind.unit}. Actual values from ${xMin} to ${ind.actual[ind.actual.length - 1].x}, then current-trajectory, best-case and worst-case projections to 2035. ${ind.headline}`}
        series={series}
        xMin={xMin}
        xMax={2035}
        yMin={ind.yMin}
        yMax={ind.yMax}
        format={fmt}
        band={{ upper: ind.higherIsBetter ? ind.best : ind.worst, lower: ind.higherIsBetter ? ind.worst : ind.best, color: SCENARIO.best }}
        target={ind.target ? { x: ind.target.year, y: ind.target.value, label: ind.target.label } : undefined}
        dividerX={ind.actual[ind.actual.length - 1].x}
        dividerLabel="Projected"
        height={compact ? 300 : 360}
        animate={animate}
      />
      {!compact && (
        <ChartDataTable
          caption={`${ind.title} — ${ind.unit}`}
          format={fmt}
          series={series.map((s) => ({ label: s.label, points: s.points }))}
        />
      )}
    </div>
  );
}

export function ScenarioLegend({ className }: { className?: string }) {
  const items = [
    { label: "Actual", color: SCENARIO.actual, dashed: false },
    { label: "Current trajectory", color: SCENARIO.current, dashed: true },
    { label: "Best case", color: SCENARIO.best, dashed: true },
    { label: "Worst case", color: SCENARIO.worst, dashed: true },
  ];
  return (
    <div className={className}>
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-2">
      {items.map((s) => (
        <li key={s.label} className="flex items-center gap-2">
          <svg width="26" height="8" aria-hidden="true"><line x1="0" x2="26" y1="4" y2="4" stroke={s.color} strokeWidth="3" strokeDasharray={s.dashed ? "5 4" : undefined} /></svg>
          {s.label}
        </li>
      ))}
    </ul>
    </div>
  );
}
