// Data from speculative-decoding/results/results.json.
// Qwen2.5-7B-Instruct target, Qwen2.5-0.5B-Instruct draft, M4 Pro.
const K_SWEEP = [
  { k: 1, speedup: 1.197, acceptance: 0.912, discarded: 3 },
  { k: 2, speedup: 1.439, acceptance: 0.820, discarded: 9 },
  { k: 3, speedup: 1.629, acceptance: 0.783, discarded: 13 },
  { k: 4, speedup: 1.645, acceptance: 0.694, discarded: 22 },
  { k: 5, speedup: 1.829, acceptance: 0.720, discarded: 21 },
  { k: 6, speedup: 1.786, acceptance: 0.667, discarded: 28 },
  { k: 8, speedup: 1.749, acceptance: 0.583, discarded: 40 },
  { k: 10, speedup: 1.467, acceptance: 0.573, discarded: 47 },
  { k: 12, speedup: 1.362, acceptance: 0.485, discarded: 68 },
  { k: 16, speedup: 1.133, acceptance: 0.324, discarded: 119 },
];

const WORKLOADS = [
  { label: "code", speedup: 2.397, acceptance: 0.982, color: "#2f7375" },
  { label: "repetitive", speedup: 2.391, acceptance: 1.0, color: "#597d48" },
  { label: "open prose", speedup: 1.817, acceptance: 0.720, color: "#4f6d8f" },
  { label: "factual list", speedup: 1.601, acceptance: 0.600, color: "#8a7444" },
  { label: "structured", speedup: 1.363, acceptance: 0.470, color: "#b65c45" },
];

const SPEEDUP = "#4f6d8f";
const ACCEPT = "#b65c45";

// Two panels rather than one dual-axis chart. Same x axis, same margins, so the
// reader compares them vertically instead of matching lines to competing scales.
const KX = { w: 680, left: 56, right: 26, bottom: 40, top: 22, h: 196 };
const kx = (k: number) => KX.left + ((k - 1) / 15) * (KX.w - KX.left - KX.right);

function KAxis() {
  return (
    <>
      {K_SWEEP.map((d) => (
        <text key={d.k} x={kx(d.k)} y={KX.h - KX.bottom + 17} textAnchor="middle" className="quant-axis-label">{d.k}</text>
      ))}
      <text x={(KX.left + KX.w - KX.right) / 2} y={KX.h - 6} textAnchor="middle" className="quant-axis-title">k, draft tokens per round</text>
    </>
  );
}

function SpeedupPanel() {
  const y = (v: number) => KX.h - KX.bottom - ((v - 1) / 1) * (KX.h - KX.top - KX.bottom);
  const pts = K_SWEEP.map((d) => `${kx(d.k).toFixed(1)},${y(d.speedup).toFixed(1)}`).join(" ");
  const peak = K_SWEEP.reduce((a, b) => (b.speedup > a.speedup ? b : a));
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>Speedup peaks at k=5</span>
        <small>Drafting further ahead stops paying, then starts costing</small>
      </figcaption>
      <svg viewBox={`0 0 ${KX.w} ${KX.h}`} role="img" aria-label="Speedup against k">
        {[1.0, 1.25, 1.5, 1.75, 2.0].map((t) => (
          <g key={t}>
            <line x1={KX.left} x2={KX.w - KX.right} y1={y(t)} y2={y(t)} className="quant-grid-line" />
            <text x={KX.left - 9} y={y(t) + 4} textAnchor="end" className="quant-axis-label">{t.toFixed(2)}×</text>
          </g>
        ))}
        <KAxis />
        <line x1={kx(peak.k)} x2={kx(peak.k)} y1={KX.top - 4} y2={KX.h - KX.bottom} stroke={SPEEDUP} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
        <text x={kx(peak.k)} y={KX.top - 9} textAnchor="middle" className="quant-point-label" style={{ fill: SPEEDUP }}>1.83×</text>
        <polyline points={pts} fill="none" stroke={SPEEDUP} strokeWidth={2.5} />
        {K_SWEEP.map((d) => <circle key={d.k} cx={kx(d.k)} cy={y(d.speedup)} r={3.5} fill={SPEEDUP} />)}
      </svg>
    </figure>
  );
}

function AcceptancePanel() {
  const y = (v: number) => KX.h - KX.bottom - v * (KX.h - KX.top - KX.bottom);
  const pts = K_SWEEP.map((d) => `${kx(d.k).toFixed(1)},${y(d.acceptance).toFixed(1)}`).join(" ");
  return (
    <figure className="quant-chart">
      <figcaption>
        <span>Acceptance only ever falls</span>
        <small>The share of drafted tokens the target keeps, at each k</small>
      </figcaption>
      <svg viewBox={`0 0 ${KX.w} ${KX.h}`} role="img" aria-label="Acceptance rate against k">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={KX.left} x2={KX.w - KX.right} y1={y(t)} y2={y(t)} className="quant-grid-line" />
            <text x={KX.left - 9} y={y(t) + 4} textAnchor="end" className="quant-axis-label">{Math.round(t * 100)}%</text>
          </g>
        ))}
        <KAxis />
        <polyline points={pts} fill="none" stroke={ACCEPT} strokeWidth={2.5} />
        {K_SWEEP.map((d) => <circle key={d.k} cx={kx(d.k)} cy={y(d.acceptance)} r={3.5} fill={ACCEPT} />)}
      </svg>
      <p className="quant-chart-note">
        Read the two together. Speedup rises to k=5 then turns over; acceptance falls the whole way. Once enough drafted tokens are thrown away, the extra lookahead costs more than it saves. Discarded tokens run from 3 at k=1 to 119 at k=16.
      </p>
    </figure>
  );
}

function WorkloadChart() {
  const w = 680, h = 250;
  const m = { top: 18, right: 96, bottom: 44, left: 104 };
  const xMax = 2.6;
  const x = (v: number) => m.left + ((v - 1) / (xMax - 1)) * (w - m.left - m.right);
  const rowH = (h - m.top - m.bottom) / WORKLOADS.length;

  return (
    <figure className="quant-chart">
      <figcaption>
        <span>The text decides the speedup</span>
        <small>Same models, same hardware, same k=5 · bars start at 1.0×, no speedup</small>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Speedup by workload type">
        {[1.0, 1.4, 1.8, 2.2, 2.6].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={m.top} y2={h - m.bottom} className="quant-grid-line" />
            <text x={x(t)} y={h - m.bottom + 18} textAnchor="middle" className="quant-axis-label">{t.toFixed(1)}×</text>
          </g>
        ))}
        {WORKLOADS.map((d, i) => {
          const y = m.top + i * rowH;
          return (
            <g key={d.label}>
              <text x={m.left - 12} y={y + rowH / 2 + 4} textAnchor="end" className="quant-axis-label" style={{ fontWeight: 600 }}>{d.label}</text>
              <rect x={m.left} y={y + rowH / 2 - 10} width={Math.max(x(d.speedup) - m.left, 2)} height={20} rx={3} fill={d.color} />
              <text x={x(d.speedup) + 8} y={y + rowH / 2 + 4} className="quant-point-label">{d.speedup.toFixed(2)}×</text>
              <text x={w - 8} y={y + rowH / 2 + 4} textAnchor="end" className="quant-axis-label" style={{ opacity: 0.7 }}>{Math.round(d.acceptance * 100)}% accepted</text>
            </g>
          );
        })}
        <text x={(m.left + w - m.right) / 2} y={h - 8} textAnchor="middle" className="quant-axis-title">Speedup against no speculation</text>
      </svg>
      <p className="quant-chart-note">
        Acceptance tracks speedup across every row. Code and repetitive text are predictable enough for a 0.5B draft to keep up with a 7B target; structured output is not.
      </p>
    </figure>
  );
}

export function SpecKSweepChart() {
  return (
    <>
      <SpeedupPanel />
      <AcceptancePanel />
    </>
  );
}
export function SpecWorkloadChart() { return <WorkloadChart />; }
