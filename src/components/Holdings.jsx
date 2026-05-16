import { holdings } from "../data/data";

function Holdings() {
    const totalInvested = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
    const totalCurrent = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
    const totalPnL = totalCurrent - totalInvested;
    const totalPnLPct = ((totalPnL / totalInvested) * 100).toFixed(2);
    const isOverallProfit = totalPnL >= 0;

    const summary = [
        {
            label: "Total investment",
            value: totalInvested.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
            neutral: true,
        },
        {
            label: "Current value",
            value: totalCurrent.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
            neutral: true,
        },
        {
            label: "P&L",
            value: `${isOverallProfit ? "+" : ""}${totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2 })} (${isOverallProfit ? "+" : ""}${totalPnLPct}%)`,
            profit: isOverallProfit,
        },
    ];

    const columns = ["Instrument", "Qty", "Avg cost", "LTP", "Cur. val", "P&L", "Net chg.", "Day chg."];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

                .hl-wrap {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --gold: #c9a84c; --ink: #111c14; --mist: #f4faf6;
                    --body: #4a5c4e; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.13);
                    font-family: 'Outfit', sans-serif;
                    display: flex; flex-direction: column; gap: 24px;
                }

                .hl-header {
                    display: flex; align-items: baseline; gap: 10px;
                }

                .hl-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 32px; font-weight: 300;
                    color: var(--ink); letter-spacing: -0.8px; margin: 0;
                }

                .hl-title em {
                    font-style: italic; font-weight: 600; color: var(--g);
                }

                .hl-count {
                    font-size: 13px; color: var(--muted); font-weight: 400;
                }

                .hl-table-wrap {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .hl-table {
                    width: 100%; border-collapse: collapse;
                    font-size: 13px;
                }

                .hl-table thead tr {
                    background: var(--gp);
                    border-bottom: 1px solid var(--bd);
                }

                .hl-table thead th {
                    padding: 12px 16px;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted); text-align: right;
                    white-space: nowrap;
                }

                .hl-table thead th:first-child { text-align: left; }

                .hl-table tbody tr {
                    border-bottom: 1px solid var(--bd);
                    transition: background 0.15s ease;
                }

                .hl-table tbody tr:last-child { border-bottom: none; }
                .hl-table tbody tr:hover { background: var(--mist); }

                .hl-table tbody td {
                    padding: 14px 16px;
                    color: var(--body); text-align: right;
                    font-variant-numeric: tabular-nums;
                    white-space: nowrap;
                }

                .hl-table tbody td:first-child {
                    text-align: left;
                    font-weight: 500; color: var(--ink);
                    font-size: 13.5px;
                }

                .hl-profit { color: #1d6b3e !important; font-weight: 500; }
                .hl-loss   { color: #b91c1c !important; font-weight: 500; }

                .hl-pill {
                    display: inline-block;
                    padding: 2px 8px; border-radius: 100px;
                    font-size: 11px; font-weight: 500;
                }

                .hl-pill-profit { background: #e8f5ee; color: #1d6b3e; }
                .hl-pill-loss   { background: #fdecea; color: #b91c1c; }

                .hl-summary {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .hl-summary-card {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 14px;
                    padding: 18px 20px;
                    display: flex; flex-direction: column; gap: 6px;
                }

                .hl-summary-label {
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 1.2px; text-transform: uppercase;
                    color: var(--muted);
                }

                .hl-summary-value {
                    font-size: 20px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                    letter-spacing: -0.5px;
                }

                .hl-summary-value.profit { color: #1d6b3e; }
                .hl-summary-value.loss   { color: #b91c1c; }

                .hl-rule {
                    width: 32px; height: 2px;
                    background: linear-gradient(90deg, var(--gold), transparent);
                    border: none; border-radius: 2px; margin: 0;
                }
            `}</style>

            <div className="hl-wrap">

                <div className="hl-header">
                    <h3 className="hl-title">
                        <em>Holdings</em>
                    </h3>
                    <span className="hl-count">{holdings.length} stocks</span>
                </div>

                <div className="hl-table-wrap">
                    <table className="hl-table">
                        <thead>
                            <tr>
                                {columns.map(col => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {holdings.map((stock, index) => {
                                const curVal = stock.price * stock.qty;
                                const pnl = curVal - stock.avg * stock.qty;
                                const isProfit = pnl >= 0;
                                const isDayGain = !stock.isLoss;

                                return (
                                    <tr key={index}>
                                        <td>{stock.name}</td>
                                        <td>{stock.qty}</td>
                                        <td>{stock.avg.toFixed(2)}</td>
                                        <td>{stock.price.toFixed(2)}</td>
                                        <td>{curVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                                        <td className={isProfit ? "hl-profit" : "hl-loss"}>
                                            {isProfit ? "+" : ""}{pnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                        </td>
                                        <td>
                                            <span className={`hl-pill ${isProfit ? "hl-pill-profit" : "hl-pill-loss"}`}>
                                                {stock.net}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`hl-pill ${isDayGain ? "hl-pill-profit" : "hl-pill-loss"}`}>
                                                {stock.day}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="hl-summary">
                    {summary.map(({ label, value, neutral, profit }) => (
                        <div className="hl-summary-card" key={label}>
                            <span className="hl-summary-label">{label}</span>
                            <hr className="hl-rule" />
                            <span className={`hl-summary-value ${neutral ? "" : profit ? "profit" : "loss"}`}>
                                ₹{value}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Holdings;