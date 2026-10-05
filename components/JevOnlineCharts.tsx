// Data from adimyth/jev-online-eval, results/metrics.json and the direct_*_main.jsonl files.
// Latency distributions are stored as percentiles (0, 5, ..., 100) of the measured values.

const Q = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

const LAG = {
  jev: [38.6, 43.0, 45.4, 49.0, 51.5, 53.2, 56.5, 59.6, 62.2, 66.1, 68.9, 71.4, 74.5, 77.5, 81.4, 86.0, 88.9, 92.3, 94.6, 98.2, 108.3],
  llm: [49.9, 53.9, 56.8, 59.4, 62.4, 64.4, 68.0, 70.6, 73.7, 77.4, 80.0, 82.7, 86.3, 88.9, 92.7, 97.1, 100.1, 103.2, 105.8, 108.5, 124.8],
};

const DIRECT = {
  jev: [0.34, 0.36, 0.37, 0.37, 0.38, 0.39, 0.39, 0.4, 0.4, 0.41, 0.42, 0.42, 0.43, 0.44, 0.45, 0.47, 0.48, 0.51, 0.56, 0.75, 1.76],
  pplx: [0.41, 0.46, 0.48, 0.51, 0.53, 0.56, 0.58, 0.6, 0.63, 0.65, 0.67, 0.69, 0.71, 0.75, 0.81, 0.84, 0.91, 0.97, 1.08, 1.24, 2.44],
  luna6: [1.57, 1.74, 1.78, 1.83, 1.88, 1.93, 1.98, 2.04, 2.09, 2.15, 2.2, 2.25, 2.31, 2.36, 2.42, 2.48, 2.63, 2.77, 3.06, 3.55, 6.54],
  llm: [1.37, 1.67, 1.74, 1.8, 1.84, 1.87, 1.9, 1.93, 1.99, 2.04, 2.09, 2.16, 2.19, 2.26, 2.33, 2.46, 2.64, 2.79, 3.0, 3.41, 6.86],
};

const SERIES = {
  jev: { label: "Jev", color: "#4f6d8f" },
  pplx: { label: "Perplexity Decisions", color: "#2f7375" },
  luna6: { label: "gpt-6-luna", color: "#8a7444" },
  llm: { label: "gpt-5.6-luna", color: "#b65c45" },
} as const;

type Key = keyof typeof SERIES;

const COSTS: { key: Key; perTrace: number; tokens: string }[] = [
  { key: "jev", perTrace: 0.00043, tokens: "7.5K tokens billed" },
  { key: "luna6", perTrace: 0.00095, tokens: "9K tokens billed" },
  { key: "pplx", perTrace: 0.00189, tokens: "47K tokens billed" },
  { key: "llm", perTrace: 0.00191, tokens: "9K tokens billed" },
];

const W = 680;

function ecdfPath(vals: number[], x: (v: number) => number, y: (p: number) => number) {
  // step function through the percentile points
  return vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(v).toFixed(1)},${y(Q[i] / 100).toFixed(1)}`).join(" ");
}

function Legend({ keys, xRight, yTop }: { keys: readonly Key[]; xRight: number; yTop: number }) {
  return (
    <g>
      {keys.map((k, i) => (
        <g key={k} transform={`translate(${xRight - 170}, ${yTop + i * 18})`}>
          <line x1={0} x2={22} y1={0} y2={0} stroke={SERIES[k].color} strokeWidth={2.5} />
          <text x={30} y={4} className="quant-axis-label">{SERIES[k].label}</text>
        </g>
      ))}
    </g>
  );
}

function LagChart() {
  const h = 230;
  const m = { top: 18, right: 26, bottom: 44, left: 52 };
  const xMin = 30, xMax = 130;
  const x = (v: number) => m.left + ((v - xMin) / (xMax - xMin)) * (W - m.left - m.right);
  const y = (p: number) => h - m.bottom - p * (h - m.top - m.bottom);
  const keys = ["jev", "llm"] as const;
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>Scores arrive about a minute after the run, whichever judge</span>
        <small>Share of traces scored, against seconds from the agent run ending to the score appearing on the trace, LangSmith online evaluators</small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label="Lag from run end to score on trace, Jev versus gpt-5.6-luna">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={m.left} x2={W - m.right} y1={y(t)} y2={y(t)} className="quant-grid-line" />
            <text x={m.left - 9} y={y(t) + 4} textAnchor="end" className="quant-axis-label">{Math.round(t * 100)}%</text>
          </g>
        ))}
        {[40, 60, 80, 100, 120].map((t) => (
          <text key={t} x={x(t)} y={h - m.bottom + 17} textAnchor="middle" className="quant-axis-label">{t}s</text>
        ))}
        <text x={(m.left + W - m.right) / 2} y={h - 6} textAnchor="middle" className="quant-axis-title">seconds from run end to score on trace</text>
        {keys.map((k) => (
          <g key={k}>
            <path d={ecdfPath(LAG[k], x, y)} fill="none" stroke={SERIES[k].color} strokeWidth={2.5} />
            <circle cx={x(LAG[k][10])} cy={y(0.5)} r={4} fill={SERIES[k].color} className="quant-point" />
          </g>
        ))}
        <text x={x(LAG.jev[10]) - 8} y={y(0.5) - 10} textAnchor="end" className="quant-point-label" style={{ fill: SERIES.jev.color }}>p50 69s</text>
        <text x={x(LAG.llm[10]) + 8} y={y(0.5) + 16} className="quant-point-label" style={{ fill: SERIES.llm.color }}>p50 80s</text>
        <Legend keys={keys} xRight={W - m.right} yTop={h - m.bottom - 18 * keys.length - 2} />
      </svg>
    </figure>
  );
}

function DirectLatencyChart() {
  const h = 230;
  const m = { top: 18, right: 26, bottom: 44, left: 52 };
  const lmin = Math.log10(0.3), lmax = Math.log10(7);
  const x = (v: number) => m.left + ((Math.log10(v) - lmin) / (lmax - lmin)) * (W - m.left - m.right);
  const y = (p: number) => h - m.bottom - p * (h - m.top - m.bottom);
  const keys = ["jev", "pplx", "luna6", "llm"] as const;
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>The decision models answer in under a second, the LLMs in about two</span>
        <small>Share of traces scored, against seconds per call when the same rendered state is sent to each judge directly</small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label="Direct call latency for four judges">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={m.left} x2={W - m.right} y1={y(t)} y2={y(t)} className="quant-grid-line" />
            <text x={m.left - 9} y={y(t) + 4} textAnchor="end" className="quant-axis-label">{Math.round(t * 100)}%</text>
          </g>
        ))}
        {[0.3, 0.5, 1, 2, 3, 5].map((t) => (
          <text key={t} x={x(t)} y={h - m.bottom + 17} textAnchor="middle" className="quant-axis-label">{t}s</text>
        ))}
        <text x={(m.left + W - m.right) / 2} y={h - 6} textAnchor="middle" className="quant-axis-title">seconds per judge call, log scale</text>
        {keys.map((k) => (
          <g key={k}>
            <path d={ecdfPath(DIRECT[k], x, y)} fill="none" stroke={SERIES[k].color} strokeWidth={2.5} />
            <circle cx={x(DIRECT[k][10])} cy={y(0.5)} r={4} fill={SERIES[k].color} className="quant-point" />
          </g>
        ))}
        <text x={x(DIRECT.jev[10]) - 8} y={y(0.5) - 10} textAnchor="end" className="quant-point-label" style={{ fill: SERIES.jev.color }}>0.42s</text>
        <text x={x(DIRECT.pplx[10]) + 8} y={y(0.5) + 16} className="quant-point-label" style={{ fill: SERIES.pplx.color }}>0.67s</text>
        <text x={x(DIRECT.llm[10]) + 10} y={y(0.5) + 16} className="quant-point-label" style={{ fill: SERIES.llm.color }}>2.1s</text>
        <Legend keys={keys} xRight={W - m.right} yTop={h - m.bottom - 18 * keys.length - 2} />
      </svg>
    </figure>
  );
}

function CostChart() {
  const max = 0.002;
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>Cost per evaluated trace, five questions each</span>
        <small>From the input tokens each vendor billed for the same rendered state</small>
      </figcaption>
      <div className="quant-bars">
        {COSTS.map((c) => (
          <div key={c.key} className="quant-bar-row">
            <span className="quant-bar-label">{SERIES[c.key].label}</span>
            <span className="quant-bar-track">
              <span className="quant-bar-fill" style={{ width: `${(c.perTrace / max) * 100}%`, background: SERIES[c.key].color }} />
            </span>
            <span className="quant-bar-value">${(c.perTrace * 1000).toFixed(2)} per 1K traces · {c.tokens}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

const GAP: { key: Key; right: number; wrong: number; auroc: number }[] = [
  { key: "jev", right: 0.87, wrong: 0.67, auroc: 0.83 },
  { key: "pplx", right: 0.97, wrong: 0.86, auroc: 0.9 },
  { key: "luna6", right: 1.0, wrong: 0.91, auroc: 0.74 },
  { key: "llm", right: 0.99, wrong: 0.96, auroc: 0.72 },
];

function ScoreGapChart() {
  const h = 220;
  const m = { top: 30, right: 110, bottom: 40, left: 140 };
  const xMin = 0.6, xMax = 1.0;
  const x = (v: number) => m.left + ((v - xMin) / (xMax - xMin)) * (W - m.left - m.right);
  const rowH = (h - m.top - m.bottom) / GAP.length;
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>How far each judge&apos;s score falls when the agent is wrong</span>
        <small>Average reference-free &quot;correct&quot; score on the 268 right answers (filled dot) and the 17 wrong ones (open dot)</small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label="Average correct score on right versus wrong answers, four judges">
        {[0.6, 0.7, 0.8, 0.9, 1.0].map((tk) => (
          <g key={tk}>
            <line x1={x(tk)} x2={x(tk)} y1={m.top - 6} y2={h - m.bottom} className="quant-grid-line" />
            <text x={x(tk)} y={h - m.bottom + 17} textAnchor="middle" className="quant-axis-label">{tk.toFixed(1)}</text>
          </g>
        ))}
        <text x={(m.left + W - m.right) / 2} y={h - 6} textAnchor="middle" className="quant-axis-title">average &quot;correct&quot; score</text>
        <text x={W - m.right + 12} y={m.top - 12} className="quant-axis-label" style={{ fontWeight: 600 }}>gap</text>
        <text x={W - 8} y={m.top - 12} textAnchor="end" className="quant-axis-label" style={{ fontWeight: 600 }}>AUROC</text>
        {GAP.map((d, i) => {
          const y = m.top + i * rowH + rowH / 2;
          const color = SERIES[d.key].color;
          return (
            <g key={d.key}>
              <text x={m.left - 12} y={y + 4} textAnchor="end" className="quant-axis-label" style={{ fontWeight: 600 }}>{SERIES[d.key].label}</text>
              <line x1={x(d.wrong)} x2={x(d.right)} y1={y} y2={y} stroke={color} strokeWidth={3} opacity={0.5} />
              <circle cx={x(d.wrong)} cy={y} r={5.5} fill="var(--surface)" stroke={color} strokeWidth={2.5} />
              <circle cx={x(d.right)} cy={y} r={5.5} fill={color} className="quant-point" />
              <text x={W - m.right + 12} y={y + 4} className="quant-point-label" style={{ fill: color }}>{(d.right - d.wrong).toFixed(2)}</text>
              <text x={W - 8} y={y + 4} textAnchor="end" className="quant-axis-label">{d.auroc.toFixed(2)}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function JevLagChart() { return <LagChart />; }
export function JevScoreGapChart() { return <ScoreGapChart />; }
export function JevDirectLatencyChart() { return <DirectLatencyChart />; }
export function JevCostChart() { return <CostChart />; }
