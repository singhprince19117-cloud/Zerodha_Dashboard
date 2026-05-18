import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {

    const equityData = {
        highlights: [
            { label: "Available margin", value: "4,043.10", colored: true  },
            { label: "Used margin",      value: "3,757.30", colored: false },
            { label: "Available cash",   value: "4,043.10", colored: true  },
        ],
        breakdown: [
            { label: "Opening balance",   value: "4,043.10" },
            { label: "Live balance",      value: "3,736.40" },
            { label: "Payin",             value: "4,064.00" },
            { label: "SPAN",              value: "0.00"     },
            { label: "Delivery margin",   value: "0.00"     },
            { label: "Exposure",          value: "0.00"     },
            { label: "Options premium",   value: "0.00"     },
        ],
        collateral: [
            { label: "Collateral (Liquid funds)", value: "0.00" },
            { label: "Collateral (Equity)",       value: "0.00" },
            { label: "Total collateral",          value: "0.00" },
        ],
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

                .fn-wrap {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --gold: #c9a84c; --ink: #111c14; --mist: #f4faf6;
                    --body: #4a5c4e; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.13);
                    --blue: #1a56db; --blue-p: #ebf0ff;
                    --red: #b91c1c; --red-p: #fdecea;
                    font-family: 'Outfit', sans-serif;
                    display: flex; flex-direction: column; gap: 24px;
                }

                /* ── top bar ── */
                .fn-topbar {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 16px;
                    padding: 18px 24px;
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 16px;
                    flex-wrap: wrap;
                }

                .fn-topbar-left {
                    display: flex; flex-direction: column; gap: 3px;
                }

                .fn-topbar-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 22px; font-weight: 300;
                    color: var(--ink); letter-spacing: -0.5px; margin: 0;
                }

                .fn-topbar-title em {
                    font-style: italic; font-weight: 600; color: var(--g);
                }

                .fn-topbar-sub {
                    font-size: 12px; color: var(--muted);
                }

                .fn-topbar-actions {
                    display: flex; gap: 8px;
                }

                .fn-btn-green {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 9px 20px;
                    background: var(--g); color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border: none; border-radius: 8px; cursor: pointer;
                    text-decoration: none;
                    transition: opacity 0.15s, transform 0.15s;
                    box-shadow: 0 4px 14px rgba(29,107,62,0.2);
                }

                .fn-btn-green:hover { opacity: 0.88; transform: translateY(-1px); color: white; }

                .fn-btn-blue {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 9px 20px;
                    background: var(--blue-p); color: var(--blue);
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border: 1px solid rgba(26,86,219,0.2);
                    border-radius: 8px; cursor: pointer;
                    text-decoration: none;
                    transition: background 0.15s;
                }

                .fn-btn-blue:hover { background: #dde8ff; color: var(--blue); }

                /* ── grid ── */
                .fn-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    align-items: start;
                }

                /* ── card ── */
                .fn-card {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .fn-card-header {
                    background: var(--gp);
                    border-bottom: 1px solid var(--bd);
                    padding: 14px 20px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                }

                .fn-card-title {
                    font-size: 12px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--g); margin: 0;
                }

                .fn-card-badge {
                    font-size: 10px; font-weight: 500;
                    color: var(--muted); letter-spacing: 0.5px;
                    background: white; border: 1px solid var(--bd);
                    padding: 2px 8px; border-radius: 100px;
                }

                /* highlights */
                .fn-highlights {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    border-bottom: 1px solid var(--bd);
                }

                .fn-highlight {
                    padding: 16px;
                    border-right: 1px solid var(--bd);
                    display: flex; flex-direction: column; gap: 4px;
                }

                .fn-highlight:last-child { border-right: none; }

                .fn-highlight-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1px; text-transform: uppercase;
                    color: var(--muted);
                }

                .fn-highlight-value {
                    font-size: 18px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                    letter-spacing: -0.5px;
                }

                .fn-highlight-value.colored { color: var(--g); }

                /* breakdown rows */
                .fn-section {
                    padding: 4px 0;
                    border-bottom: 1px solid var(--bd);
                }

                .fn-section:last-child { border-bottom: none; }

                .fn-row {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 9px 20px;
                    transition: background 0.14s;
                }

                .fn-row:hover { background: var(--mist); }

                .fn-row-label {
                    font-size: 13px; color: var(--body);
                }

                .fn-row-value {
                    font-size: 13px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                }

                /* commodity empty state */
                .fn-commodity {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    padding: 48px 24px; gap: 16px; text-align: center;
                }

                .fn-commodity-icon {
                    width: 52px; height: 52px; border-radius: 14px;
                    background: var(--gp);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 24px;
                }

                .fn-commodity-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 20px; font-weight: 300;
                    color: var(--ink); margin: 0; letter-spacing: -0.3px;
                }

                .fn-commodity-sub {
                    font-size: 13px; color: var(--muted);
                    line-height: 1.6; max-width: 220px; margin: 0;
                }
            `}</style>

            <div className="fn-wrap">

                {/* top bar */}
                <div className="fn-topbar">
                    <div className="fn-topbar-left">
                        <h2 className="fn-topbar-title">Your <em>Funds</em></h2>
                        <span className="fn-topbar-sub">Instant, zero-cost transfers with UPI</span>
                    </div>
                    <div className="fn-topbar-actions">
                        <Link className="fn-btn-green">+ Add funds</Link>
                        <Link className="fn-btn-blue">Withdraw</Link>
                    </div>
                </div>

                {/* two column grid */}
                <div className="fn-grid">

                    {/* equity card */}
                    <div className="fn-card">
                        <div className="fn-card-header">
                            <p className="fn-card-title">Equity</p>
                            <span className="fn-card-badge">NSE · BSE</span>
                        </div>

                        {/* highlights */}
                        <div className="fn-highlights">
                            {equityData.highlights.map(({ label, value, colored }) => (
                                <div className="fn-highlight" key={label}>
                                    <span className="fn-highlight-label">{label}</span>
                                    <span className={`fn-highlight-value${colored ? " colored" : ""}`}>
                                        ₹{value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* breakdown */}
                        <div className="fn-section">
                            {equityData.breakdown.map(({ label, value }) => (
                                <div className="fn-row" key={label}>
                                    <span className="fn-row-label">{label}</span>
                                    <span className="fn-row-value">₹{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* collateral */}
                        <div className="fn-section">
                            {equityData.collateral.map(({ label, value }) => (
                                <div className="fn-row" key={label}>
                                    <span className="fn-row-label">{label}</span>
                                    <span className="fn-row-value">₹{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* commodity card */}
                    <div className="fn-card">
                        <div className="fn-card-header">
                            <p className="fn-card-title">Commodity</p>
                            <span className="fn-card-badge">MCX · NCDEX</span>
                        </div>
                        <div className="fn-commodity">
                            <div className="fn-commodity-icon">📦</div>
                            <p className="fn-commodity-title">No commodity account</p>
                            <p className="fn-commodity-sub">
                                Open a commodity account to trade on MCX and NCDEX exchanges.
                            </p>
                            <Link className="fn-btn-blue">Open account →</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Funds;