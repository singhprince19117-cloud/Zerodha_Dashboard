import { positions } from "../data/data";

function Positions() {
    const totalPnL = positions.reduce((sum, s) => sum + (s.price * s.qty - s.avg * s.qty), 0);
    const isOverallPnL = totalPnL >= 0;

    const columns = ["Product", "Instrument", "Qty.", "Avg. cost", "LTP", "P&L", "Net chg.", "Day chg."];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

                .pos-wrap {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --gold: #c9a84c; --ink: #111c14; --mist: #f4faf6;
                    --body: #4a5c4e; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.13);
                    font-family: 'Outfit', sans-serif;
                    display: flex; flex-direction: column; gap: 24px;
                }

                .pos-header {
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 12px;
                }

                .pos-header-left {
                    display: flex; align-items: baseline; gap: 10px;
                }

                .pos-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 32px; font-weight: 300;
                    color: var(--ink); letter-spacing: -0.8px; margin: 0;
                }

                .pos-title em {
                    font-style: italic; font-weight: 600; color: var(--g);
                }

                .pos-count {
                    font-size: 13px; color: var(--muted);
                }

                .pos-pnl-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 6px 14px; border-radius: 100px;
                    font-size: 13px; font-weight: 500;
                    font-variant-numeric: tabular-nums;
                }

                .pos-pnl-badge.profit { background: #e8f5ee; color: #1d6b3e; }
                .pos-pnl-badge.loss   { background: #fdecea; color: #b91c1c; }

                .pos-pnl-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: currentColor; opacity: 0.6;
                }

                .pos-table-wrap {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .pos-table {
                    width: 100%; border-collapse: collapse;
                    font-size: 13px;
                }

                .pos-table thead tr {
                    background: var(--gp);
                    border-bottom: 1px solid var(--bd);
                }

                .pos-table thead th {
                    padding: 12px 16px;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted); text-align: right;
                    white-space: nowrap;
                }

                .pos-table thead th:first-child,
                .pos-table thead th:nth-child(2) { text-align: left; }

                .pos-table tbody tr {
                    border-bottom: 1px solid var(--bd);
                    transition: background 0.15s ease;
                }

                .pos-table tbody tr:last-child { border-bottom: none; }
                .pos-table tbody tr:hover { background: var(--mist); }

                .pos-table tbody td {
                    padding: 14px 16px;
                    color: var(--body); text-align: right;
                    font-variant-numeric: tabular-nums;
                    white-space: nowrap;
                }

                .pos-table tbody td:first-child {
                    text-align: left;
                }

                .pos-table tbody td:nth-child(2) {
                    text-align: left;
                    font-weight: 500; color: var(--ink);
                    font-size: 13.5px;
                }

                .pos-product-tag {
                    display: inline-block;
                    padding: 2px 8px; border-radius: 5px;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 0.8px; text-transform: uppercase;
                    background: var(--gp); color: var(--g);
                    border: 1px solid var(--bd);
                }

                .pos-profit { color: #1d6b3e !important; font-weight: 500; }
                .pos-loss   { color: #b91c1c !important; font-weight: 500; }

                .pos-pill {
                    display: inline-block;
                    padding: 2px 8px; border-radius: 100px;
                    font-size: 11px; font-weight: 500;
                }

                .pos-pill-profit { background: #e8f5ee; color: #1d6b3e; }
                .pos-pill-loss   { background: #fdecea; color: #b91c1c; }

                .pos-empty {
                    text-align: center; padding: 48px 24px;
                    color: var(--muted); font-size: 14px;
                }
            `}</style>

            <div className="pos-wrap">

                <div className="pos-header">
                    <div className="pos-header-left">
                        <h3 className="pos-title"><em>Positions</em></h3>
                        <span className="pos-count">{positions.length} open</span>
                    </div>

                    <span className={`pos-pnl-badge ${isOverallPnL ? "profit" : "loss"}`}>
                        <span className="pos-pnl-dot" />
                        P&amp;L {isOverallPnL ? "+" : ""}
                        ₹{totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="pos-table-wrap">
                    {positions.length === 0 ? (
                        <div className="pos-empty">No open positions</div>
                    ) : (
                        <table className="pos-table">
                            <thead>
                                <tr>
                                    {columns.map(col => <th key={col}>{col}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {positions.map((stock, index) => {
                                    const pnl = stock.price * stock.qty - stock.avg * stock.qty;
                                    const isProfit = pnl >= 0;
                                    const isDayGain = !stock.isLoss;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="pos-product-tag">{stock.product}</span>
                                            </td>
                                            <td>{stock.name}</td>
                                            <td>{stock.qty}</td>
                                            <td>{stock.avg.toFixed(2)}</td>
                                            <td>{stock.price.toFixed(2)}</td>
                                            <td className={isProfit ? "pos-profit" : "pos-loss"}>
                                                {isProfit ? "+" : ""}
                                                {pnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                            </td>
                                            <td>
                                                <span className={`pos-pill ${isProfit ? "pos-pill-profit" : "pos-pill-loss"}`}>
                                                    {stock.net}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`pos-pill ${isDayGain ? "pos-pill-profit" : "pos-pill-loss"}`}>
                                                    {stock.day}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </>
    );
}

export default Positions;