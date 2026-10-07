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
  oai: [0.39, 0.4, 0.42, 0.43, 0.44, 0.45, 0.46, 0.47, 0.49, 0.51, 0.52, 0.55, 0.57, 0.59, 0.63, 0.67, 0.71, 0.77, 0.86, 0.99, 4.56],
  luna6: [1.57, 1.74, 1.78, 1.83, 1.88, 1.93, 1.98, 2.04, 2.09, 2.15, 2.2, 2.25, 2.31, 2.36, 2.42, 2.48, 2.63, 2.77, 3.06, 3.55, 6.54],
  llm: [1.37, 1.67, 1.74, 1.8, 1.84, 1.87, 1.9, 1.93, 1.99, 2.04, 2.09, 2.16, 2.19, 2.26, 2.33, 2.46, 2.64, 2.79, 3.0, 3.41, 6.86],
};

const SERIES = {
  jev: { label: "Jev", color: "#4f6d8f" },
  pplx: { label: "Perplexity Decisions", color: "#2f7375" },
  oai: { label: "OpenAI Decisions", color: "#6b5b8f" },
  luna6: { label: "gpt-6-luna", color: "#8a7444" },
  llm: { label: "gpt-5.6-luna", color: "#b65c45" },
} as const;

type Key = keyof typeof SERIES;

const COSTS: { key: Key; perTrace: number; tokens: string }[] = [
  { key: "jev", perTrace: 0.00042, tokens: "10K tokens billed" },
  { key: "oai", perTrace: 0.00094, tokens: "9.4K tokens billed, price assumed" },
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
  const keys = ["jev", "oai", "pplx", "luna6", "llm"] as const;
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

function BarsChart({ title, sub, max, values, fmt }: { title: string; sub: string; max: number; values: { key: Key; v: number }[]; fmt: (v: number) => string }) {
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>{title}</span>
        <small>{sub}</small>
      </figcaption>
      <div className="quant-bars">
        {values.map((d) => (
          <div key={d.key} className="quant-bar-row">
            <span className="quant-bar-label">{SERIES[d.key].label}</span>
            <span className="quant-bar-track">
              <span className="quant-bar-fill" style={{ width: `${(d.v / max) * 100}%`, background: SERIES[d.key].color }} />
            </span>
            <span className="quant-bar-value">{fmt(d.v)}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

const SCORES: Record<"jev" | "oai" | "pplx" | "luna6" | "llm", { right: number[]; wrong: number[] }> = {
  jev: {
    right: [0.45, 0.46, 0.49, 0.51, 0.52, 0.53, 0.54, 0.56, 0.58, 0.63, 0.67, 0.68, 0.7, 0.71, 0.71, 0.71, 0.71, 0.72, 0.72, 0.73, 0.73, 0.73, 0.73, 0.74, 0.75, 0.75, 0.75, 0.75, 0.75, 0.76, 0.76, 0.76, 0.76, 0.77, 0.77, 0.77, 0.77, 0.77, 0.78, 0.78, 0.78, 0.78, 0.79, 0.79, 0.79, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.81, 0.81, 0.81, 0.81, 0.81, 0.82, 0.82, 0.82, 0.82, 0.82, 0.83, 0.83, 0.83, 0.83, 0.83, 0.84, 0.84, 0.84, 0.84, 0.84, 0.84, 0.84, 0.84, 0.84, 0.84, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.87, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.91, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.98],
    wrong: [0.46, 0.47, 0.51, 0.6, 0.61, 0.64, 0.65, 0.69, 0.7, 0.8, 0.83, 0.83, 0.84, 0.84, 0.86, 0.89, 0.91],
  },
  oai: {
    right: [0.01, 0.67, 0.68, 0.69, 0.79, 0.8, 0.82, 0.83, 0.88, 0.89, 0.91, 0.91, 0.92, 0.92, 0.92, 0.92, 0.92, 0.93, 0.93, 0.94, 0.94, 0.94, 0.95, 0.95, 0.95, 0.95, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    wrong: [0.31, 0.63, 0.64, 0.67, 0.68, 0.85, 0.89, 0.92, 0.93, 0.97, 0.97, 0.97, 0.99, 1, 1, 1, 1],
  },
  pplx: {
    right: [0.63, 0.66, 0.67, 0.77, 0.77, 0.79, 0.84, 0.85, 0.85, 0.86, 0.86, 0.9, 0.9, 0.91, 0.91, 0.91, 0.92, 0.92, 0.92, 0.93, 0.93, 0.94, 0.94, 0.94, 0.94, 0.94, 0.95, 0.95, 0.95, 0.95, 0.95, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.96, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.97, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99],
    wrong: [0.31, 0.62, 0.83, 0.84, 0.86, 0.87, 0.88, 0.9, 0.91, 0.93, 0.94, 0.96, 0.96, 0.96, 0.97, 0.98, 0.98],
  },
  luna6: {
    right: [0.8, 0.8, 0.9, 0.95, 0.95, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    wrong: [0.35, 0.65, 0.75, 0.85, 0.95, 0.95, 0.96, 0.98, 0.98, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  llm: {
    right: [0.85, 0.93, 0.95, 0.95, 0.95, 0.95, 0.97, 0.97, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    wrong: [0.7, 0.88, 0.92, 0.93, 0.94, 0.96, 0.98, 0.98, 0.99, 1, 1, 1, 1, 1, 1, 1, 1],
  },
};

const AUROC: { key: Key; v: number }[] = [
  { key: "jev", v: 0.83 },
  { key: "oai", v: 0.8 },
  { key: "pplx", v: 0.9 },
  { key: "luna6", v: 0.74 },
  { key: "llm", v: 0.72 },
];

const ROWS: Key[] = ["jev", "oai", "pplx", "luna6", "llm"];

function jitter(i: number) {
  return ((i * 0.6180339887) % 1) - 0.5;
}

function StripChart({ which }: { which: "right" | "wrong" }) {
  const rowH = 44;
  const m = { top: 34, right: 64, bottom: 40, left: 150 };
  const h = m.top + rowH * ROWS.length + m.bottom;
  const x = (v: number) => m.left + v * (W - m.left - m.right);
  const many = which === "right";
  const n = which === "right" ? 268 : 17;
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>{many ? "Scores each judge gave the 268 right answers" : "Scores each judge gave the 17 wrong answers"}</span>
        <small>
          Each dot is one answer&apos;s &quot;correct&quot; score. Left of the dashed line, the judge would call the answer wrong.
          {many ? " A good judge keeps these dots on the right." : " A good judge pushes these dots to the left."}
        </small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label={`Correct score for each of the ${n} ${which} answers, five judges`}>
        {[0, 0.25, 0.5, 0.75, 1].map((tk) => (
          <g key={tk}>
            <line x1={x(tk)} x2={x(tk)} y1={m.top - 6} y2={h - m.bottom} className="quant-grid-line" />
            <text x={x(tk)} y={h - m.bottom + 17} textAnchor="middle" className="quant-axis-label">{tk}</text>
          </g>
        ))}
        <line x1={x(0.5)} x2={x(0.5)} y1={m.top - 14} y2={h - m.bottom} stroke="currentColor" strokeWidth={1.2} strokeDasharray="4 3" opacity={0.55} />
        <text x={x(0.5) - 8} y={m.top - 18} textAnchor="end" className="quant-axis-label">called wrong</text>
        <text x={x(0.5) + 8} y={m.top - 18} className="quant-axis-label">called correct</text>
        <text x={W - 8} y={m.top - 18} textAnchor="end" className="quant-axis-label" style={{ fontWeight: 600 }}>average</text>
        <text x={(m.left + W - m.right) / 2} y={h - 6} textAnchor="middle" className="quant-axis-title">&quot;correct&quot; score, 0 to 1</text>
        {ROWS.map((k, r) => {
          const vals = SCORES[k][which];
          const cy = m.top + r * rowH + rowH / 2;
          const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
          const color = SERIES[k].color;
          return (
            <g key={k}>
              <text x={m.left - 14} y={cy + 4} textAnchor="end" className="quant-axis-label" style={{ fontWeight: 600 }}>{SERIES[k].label}</text>
              {vals.map((v, i) => (
                <circle key={i} cx={x(v)} cy={cy + jitter(i) * (rowH - 14)} r={many ? 2.4 : 4.2} fill={color} opacity={many ? 0.35 : 0.8} />
              ))}
              <line x1={x(avg)} x2={x(avg)} y1={cy - rowH / 2 + 4} y2={cy + rowH / 2 - 4} stroke={color} strokeWidth={2.5} />
              <text x={W - 8} y={cy + 4} textAnchor="end" className="quant-point-label" style={{ fill: color }}>{avg.toFixed(2)}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function AurocChart() {
  const rowH = 34;
  const m = { top: 30, right: 40, bottom: 40, left: 150 };
  const h = m.top + rowH * ROWS.length + m.bottom;
  const x = (v: number) => m.left + ((v - 0.5) / 0.5) * (W - m.left - m.right);
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>AUROC: how often a right answer outscores a wrong one</span>
        <small>Pick one right and one wrong answer at random. 0.5 means the judge orders them no better than a coin flip; 1.0 means always right.</small>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${h}`} role="img" aria-label="AUROC for five judges">
        {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((tk) => (
          <g key={tk}>
            <line x1={x(tk)} x2={x(tk)} y1={m.top - 6} y2={h - m.bottom} className="quant-grid-line" />
            <text x={x(tk)} y={h - m.bottom + 17} textAnchor="middle" className="quant-axis-label">{tk.toFixed(1)}</text>
          </g>
        ))}
        <text x={x(0.5) + 6} y={m.top - 12} className="quant-axis-label">coin flip</text>
        <text x={x(1.0) - 6} y={m.top - 12} textAnchor="end" className="quant-axis-label">perfect</text>
        <text x={(m.left + W - m.right) / 2} y={h - 6} textAnchor="middle" className="quant-axis-title">AUROC</text>
        {ROWS.map((k, r) => {
          const d = AUROC.find((a) => a.key === k)!;
          const cy = m.top + r * rowH + rowH / 2;
          const color = SERIES[k].color;
          return (
            <g key={k}>
              <text x={m.left - 14} y={cy + 4} textAnchor="end" className="quant-axis-label" style={{ fontWeight: 600 }}>{SERIES[k].label}</text>
              <line x1={x(0.5)} x2={x(d.v)} y1={cy} y2={cy} stroke={color} strokeWidth={1.5} opacity={0.35} />
              <circle cx={x(d.v)} cy={cy} r={6} fill={color} className="quant-point" />
              <text x={x(d.v) + 12} y={cy + 4} className="quant-point-label" style={{ fill: color }}>{d.v.toFixed(2)}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function JevLagChart() { return <LagChart />; }
export function JevRightScoreChart() { return <StripChart which="right" />; }
export function JevWrongScoreChart() { return <StripChart which="wrong" />; }
export function JevAurocChart() { return <AurocChart />; }
export function JevDirectLatencyChart() { return <DirectLatencyChart />; }
export function JevCostChart() { return <CostChart />; }
