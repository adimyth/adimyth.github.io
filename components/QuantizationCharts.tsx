type Method = {
  label: string;
  color: string;
  size: number;
  perplexityCost: number;
  mmlu: number;
  generation?: number;
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "end";
};

const methods: Method[] = [
  { label: "fp16", color: "#24201d", size: 14.97, perplexityCost: 0, mmlu: 82, generation: 15.5, labelDx: -8, labelDy: -10, labelAnchor: "end" },
  { label: "RTN Q4_0", color: "#b65c45", size: 4.34, perplexityCost: 5.5, mmlu: 76, generation: 48.5, labelDx: 8, labelDy: -8 },
  { label: "Q4_K_M", color: "#2f7375", size: 4.58, perplexityCost: 3.1, mmlu: 78, generation: 44.9, labelDx: 8, labelDy: -8 },
  { label: "Q5_K_M", color: "#597d48", size: 5.34, perplexityCost: 1, mmlu: 80, generation: 31.2, labelDx: 8, labelDy: -8 },
  { label: "Q8_0", color: "#8a7444", size: 7.95, perplexityCost: 0.05, mmlu: 80, generation: 28.1, labelDx: 8, labelDy: -8 },
  { label: "MLX 4-bit", color: "#80649a", size: 4.22, perplexityCost: 7.9, mmlu: 76, generation: 52.8, labelDx: 8, labelDy: 16 },
  { label: "HQQ 4-bit", color: "#9a6a55", size: 5.61, perplexityCost: 6.1, mmlu: 76, labelDx: 8, labelDy: -8 },
  { label: "AWQ 4-bit", color: "#4f6d8f", size: 5.35, perplexityCost: 5.8, mmlu: 78, labelDx: 8, labelDy: 16 },
  { label: "GPTQ 4-bit", color: "#5c5470", size: 5.33, perplexityCost: 8.1, mmlu: 76, labelDx: 8, labelDy: 16 },
];

type Metric = "size" | "perplexityCost" | "mmlu" | "generation";

type BarChartProps = {
  title: string;
  detail: string;
  metric: Metric;
  format: (value: number) => string;
  note?: string;
};

function BarChart({ title, detail, metric, format, note }: BarChartProps) {
  const values = methods.filter((method) => method[metric] !== undefined);
  const maximum = Math.max(...values.map((method) => method[metric] as number));

  return (
    <figure className="quant-chart">
      <figcaption>
        <span>{title}</span>
        <small>{detail}</small>
      </figcaption>
      <div className="quant-bars">
        {values.map((method) => {
          const value = method[metric] as number;
          return (
            <div className="quant-bar-row" key={method.label}>
              <span className="quant-bar-label">{method.label}</span>
              <span className="quant-bar-track" aria-hidden="true">
                <span
                  className="quant-bar-fill"
                  style={{ width: `${Math.max((value / maximum) * 100, 1.25)}%`, backgroundColor: method.color }}
                />
              </span>
              <span className="quant-bar-value">{format(value)}</span>
            </div>
          );
        })}
      </div>
      {note && <p className="quant-chart-note">{note}</p>}
    </figure>
  );
}

function TradeoffChart() {
  const width = 680;
  const height = 330;
  const margin = { top: 24, right: 38, bottom: 52, left: 62 };
  const quantifiedMethods = methods.filter((method) => method.label !== "fp16");
  const xMin = 4;
  const xMax = 8.25;
  const yMin = -0.4;
  const yMax = 8.5;
  const x = (value: number) => margin.left + ((value - xMin) / (xMax - xMin)) * (width - margin.left - margin.right);
  const y = (value: number) => height - margin.bottom - ((value - yMin) / (yMax - yMin)) * (height - margin.top - margin.bottom);
  const xTicks = [4, 5, 6, 7, 8];
  const yTicks = [0, 2, 4, 6, 8];

  return (
    <figure className="quant-chart quant-tradeoff-chart">
      <figcaption>
        <span>Quantized size against quality cost</span>
        <small>Wikitext-2 perplexity increase versus fp16 · lower and left is better</small>
      </figcaption>
      <p className="quant-reference"><strong>Reference</strong><span>fp16 · 14.97 GB · 0% perplexity cost</span></p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Checkpoint size in gigabytes against perplexity increase in percent">
        {yTicks.map((tick) => (
          <g key={`y-${tick}`}>
            <line x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} className="quant-grid-line" />
            <text x={margin.left - 10} y={y(tick) + 4} textAnchor="end" className="quant-axis-label">{tick}%</text>
          </g>
        ))}
        {xTicks.map((tick) => (
          <g key={`x-${tick}`}>
            <line x1={x(tick)} x2={x(tick)} y1={margin.top} y2={height - margin.bottom} className="quant-grid-line" />
            <text x={x(tick)} y={height - margin.bottom + 20} textAnchor="middle" className="quant-axis-label">{tick}</text>
          </g>
        ))}
        <rect x={margin.left} y={margin.top} width={width - margin.left - margin.right} height={height - margin.top - margin.bottom} className="quant-chart-frame" />
        <text x={(margin.left + width - margin.right) / 2} y={height - 10} textAnchor="middle" className="quant-axis-title">Size on disk (GB)</text>
        <text x={16} y={(margin.top + height - margin.bottom) / 2} textAnchor="middle" className="quant-axis-title" transform={`rotate(-90 16 ${(margin.top + height - margin.bottom) / 2})`}>Perplexity increase (%)</text>
        {quantifiedMethods.map((method) => (
          <g key={method.label}>
            <circle cx={x(method.size)} cy={y(method.perplexityCost)} r="6" fill={method.color} className="quant-point" />
            <text x={x(method.size) + (method.labelDx ?? 8)} y={y(method.perplexityCost) + (method.labelDy ?? -8)} textAnchor={method.labelAnchor} className="quant-point-label">{method.label}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

export default function QuantizationCharts() {
  return (
    <section className="quantization-charts" aria-label="Quantization results charts">
      <div className="quant-chart-grid">
        <BarChart title="Checkpoint size" detail="GB on disk" metric="size" format={(value) => `${value.toFixed(2)} GB`} />
        <BarChart title="Perplexity cost" detail="Wikitext-2, versus fp16" metric="perplexityCost" format={(value) => `+${value}%`} />
        <BarChart title="MMLU accuracy" detail="Fixed 50-question subset" metric="mmlu" format={(value) => `${value.toFixed(0)}%`} />
        <BarChart title="Generation throughput" detail="tg128, tokens per second" metric="generation" format={(value) => `${value.toFixed(1)} t/s`} note="HQQ's 0.6 t/s is omitted: its default backend dequantizes every layer on every step. AWQ and GPTQ are omitted because they ran on a rented L40S, and tokens per second cannot be read across two machines." />
      </div>
      <TradeoffChart />
    </section>
  );
}
