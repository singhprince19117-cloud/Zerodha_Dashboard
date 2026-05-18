import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PALETTE = [
    { bg: "#0d3320", text: "#6effa0" },
    { bg: "#1d6b3e", text: "#a8f0c0" },
    { bg: "#2e9e5b", text: "#d4f5e2" },
    { bg: "#52c27a", text: "#0d3320" },
    { bg: "#8adba8", text: "#0d3320" },
    { bg: "#c2f0d4", text: "#1d6b3e" },
];

export function DoughnutChart({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const total = data?.datasets?.[0]?.data?.reduce((a, b) => a + b, 0) ?? 0;

    const styledData = {
        ...data,
        datasets: data?.datasets?.map(ds => ({
            ...ds,
            backgroundColor: PALETTE.map(p => p.bg),
            hoverBackgroundColor: PALETTE.map(p => p.bg + "cc"),
            borderWidth: 2,
            borderColor: "#f0faf4",
            hoverBorderColor: "#f0faf4",
            hoverBorderWidth: 0,
            hoverOffset: 10,
        })),
    };

    const options = {
        cutout: "74%",
        radius: "92%",
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "#0a2416",
                titleColor: "#52c27a",
                bodyColor: "#d4f5e2",
                padding: 14,
                cornerRadius: 12,
                borderColor: "rgba(82,194,122,0.25)",
                borderWidth: 1,
                titleFont: { family: "'DM Sans', sans-serif", size: 11, weight: "600" },
                bodyFont: { family: "'DM Sans', sans-serif", size: 14, weight: "500" },
                callbacks: {
                    title: (items) => items[0].label.toUpperCase(),
                    label: (ctx) => {
                        const pct = ((ctx.parsed / total) * 100).toFixed(1);
                        return `  ₹${ctx.parsed.toLocaleString("en-IN")}  ·  ${pct}%`;
                    },
                },
            },
        },
        onHover: (_, elements) => {
            setActiveIndex(elements.length > 0 ? elements[0].index : null);
        },
        animation: {
            animateRotate: true,
            duration: 900,
            easing: "easeInOutQuart",
        },
    };

    const maxVal = Math.max(...(data?.datasets?.[0]?.data ?? [1]));

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

                .dc-wrap {
                    --g0: #0d3320;
                    --g1: #1d6b3e;
                    --g2: #2e9e5b;
                    --g3: #52c27a;
                    --mint: #c2f0d4;
                    --ink: #0a1f10;
                    --mist: #f0faf4;
                    --body: #3d5c47;
                    --muted: #7aaa8a;
                    --bd: rgba(29,107,62,0.12);
                    font-family: 'DM Sans', sans-serif;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .dc-chart-area {
                    position: relative;
                    width: 100%;
                    max-width: 220px;
                    margin: 0 auto;
                    filter: drop-shadow(0 6px 20px rgba(29,107,62,0.16));
                }

                .dc-center {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    pointer-events: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2px;
                }

                .dc-center-label {
                    font-size: 9px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: var(--muted);
                }

                .dc-center-value {
                    font-family: 'DM Serif Display', serif;
                    font-size: 22px;
                    color: var(--ink);
                    line-height: 1;
                    letter-spacing: -0.5px;
                }

                .dc-center-sub {
                    font-size: 9px;
                    color: var(--muted);
                    font-weight: 400;
                }

                /* legend */
                .dc-legend {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .dc-row {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 8px 10px;
                    border-radius: 9px;
                    border: 1px solid transparent;
                    cursor: default;
                    transition: background 0.15s, border-color 0.15s, transform 0.15s;
                    position: relative;
                    overflow: hidden;
                }

                .dc-row::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 3px;
                    background: var(--row-color, var(--g2));
                    border-radius: 9px 0 0 9px;
                    opacity: 0;
                    transition: opacity 0.15s;
                }

                .dc-row:hover,
                .dc-row.active {
                    background: var(--mist);
                    border-color: var(--bd);
                    transform: translateX(3px);
                }

                .dc-row:hover::before,
                .dc-row.active::before { opacity: 1; }

                .dc-swatch {
                    width: 26px; height: 26px;
                    border-radius: 7px;
                    flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 9px; font-weight: 700;
                    letter-spacing: 0.3px;
                }

                .dc-meta { flex: 1; min-width: 0; }

                .dc-name {
                    font-size: 11px;
                    font-weight: 500;
                    color: var(--ink);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .dc-bar-track {
                    margin-top: 4px;
                    height: 3px;
                    background: rgba(29,107,62,0.1);
                    border-radius: 99px;
                    overflow: hidden;
                }

                .dc-bar-fill {
                    height: 100%;
                    border-radius: 99px;
                    transition: width 0.7s cubic-bezier(0.34,1.56,0.64,1);
                }

                .dc-nums { text-align: right; flex-shrink: 0; }

                .dc-val {
                    font-size: 11px; font-weight: 600;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                    display: block;
                }

                .dc-pct {
                    font-size: 9px; color: var(--muted);
                    font-variant-numeric: tabular-nums;
                    display: block;
                }

                /* footer */
                .dc-footer {
                    display: flex;
                    gap: 5px;
                }

                .dc-stat {
                    flex: 1;
                    background: var(--mist);
                    border: 1px solid var(--bd);
                    border-radius: 9px;
                    padding: 9px 8px;
                    text-align: center;
                }

                .dc-stat-label {
                    font-size: 8px; font-weight: 600;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted); display: block; margin-bottom: 3px;
                }

                .dc-stat-val {
                    font-size: 11px; font-weight: 600;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>

            <div className="dc-wrap">

                {/* Ring chart */}
                <div className="dc-chart-area">
                    <Doughnut data={styledData} options={options} />
                    <div className="dc-center">
                        <span className="dc-center-label">Portfolio</span>
                        <span className="dc-center-value">
                            ₹{(total / 1000).toFixed(1)}k
                        </span>
                        <span className="dc-center-sub">{data?.labels?.length} holdings</span>
                    </div>
                </div>

                {/* Legend with mini bar */}
                <div className="dc-legend">
                    {data?.labels?.map((label, i) => {
                        const val = data.datasets[0].data[i];
                        const pct = total > 0 ? ((val / total) * 100).toFixed(1) : "0.0";
                        const barW = maxVal > 0 ? ((val / maxVal) * 100).toFixed(1) : 0;
                        const pal = PALETTE[i % PALETTE.length];

                        return (
                            <div
                                key={label}
                                className={`dc-row${activeIndex === i ? " active" : ""}`}
                                style={{ "--row-color": pal.bg }}
                                onMouseEnter={() => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="dc-swatch" style={{ background: pal.bg, color: pal.text }}>
                                    {label.slice(0, 2).toUpperCase()}
                                </div>

                                <div className="dc-meta">
                                    <div className="dc-name">{label}</div>
                                    <div className="dc-bar-track">
                                        <div className="dc-bar-fill" style={{ width: `${barW}%`, background: pal.bg }} />
                                    </div>
                                </div>

                                <div className="dc-nums">
                                    <span className="dc-val">₹{val.toLocaleString("en-IN")}</span>
                                    <span className="dc-pct">{pct}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary stats */}
                <div className="dc-footer">
                    <div className="dc-stat">
                        <span className="dc-stat-label">Avg</span>
                        <span className="dc-stat-val">
                            ₹{Math.round(total / (data?.labels?.length || 1)).toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div className="dc-stat">
                        <span className="dc-stat-label">Top</span>
                        <span className="dc-stat-val">
                            {data?.labels?.[
                                data.datasets[0].data.indexOf(Math.max(...data.datasets[0].data))
                            ] ?? "—"}
                        </span>
                    </div>
                    <div className="dc-stat">
                        <span className="dc-stat-label">Count</span>
                        <span className="dc-stat-val">{data?.labels?.length ?? 0}</span>
                    </div>
                </div>

            </div>
        </>
    );
}