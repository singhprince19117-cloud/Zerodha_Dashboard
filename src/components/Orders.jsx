import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/orders")
            .then(r => setOrders(r.data))
            .finally(() => setIsLoading(false));
    }, []);

    const totalBuy = orders.filter(o => o.mode === "BUY").length;
    const totalSell = orders.filter(o => o.mode === "SELL").length;
    const totalVal = orders.reduce((sum, o) => sum + (o.qty * o.price), 0);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

                .ord-wrap {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --gold: #c9a84c; --ink: #111c14; --mist: #f4faf6;
                    --body: #4a5c4e; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.13);
                    --red: #b91c1c; --red-p: #fef2f2;
                    --blue: #1a56db; --blue-p: #ebf0ff;
                    font-family: 'Outfit', sans-serif;
                    display: flex; flex-direction: column; gap: 24px;
                }

                /* ── header ── */
                .ord-header {
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 12px;
                    flex-wrap: wrap;
                }

                .ord-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 32px; font-weight: 300;
                    color: var(--ink); letter-spacing: -0.8px; margin: 0;
                }

                .ord-title em {
                    font-style: italic; font-weight: 600; color: var(--g);
                }

                .ord-count {
                    font-size: 11px; font-weight: 500;
                    color: var(--muted); background: var(--gp);
                    border: 1px solid var(--bd);
                    padding: 3px 10px; border-radius: 100px;
                }

                /* ── summary strip ── */
                .ord-summary {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }

                .ord-stat {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 14px;
                    padding: 14px 16px;
                    display: flex; flex-direction: column; gap: 4px;
                }

                .ord-stat-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted);
                }

                .ord-stat-val {
                    font-size: 20px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                    letter-spacing: -0.3px;
                }

                .ord-stat-val.green { color: var(--g); }
                .ord-stat-val.red   { color: var(--red); }

                /* ── table card ── */
                .ord-card {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 20px;
                    overflow: hidden;
                }

                .ord-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .ord-table thead tr {
                    background: var(--mist);
                    border-bottom: 1px solid var(--bd);
                }

                .ord-table th {
                    padding: 11px 16px;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted); text-align: left;
                    white-space: nowrap;
                }

                .ord-table th:last-child { text-align: right; }

                .ord-table tbody tr {
                    border-bottom: 1px solid var(--bd);
                    transition: background 0.14s;
                }

                .ord-table tbody tr:last-child { border-bottom: none; }
                .ord-table tbody tr:hover { background: var(--mist); }

                .ord-table td {
                    padding: 13px 16px;
                    font-size: 13px; color: var(--ink);
                    vertical-align: middle;
                }

                .ord-table td:last-child { text-align: right; }

                /* name cell */
                .ord-name {
                    font-weight: 500; letter-spacing: -0.2px;
                }

                .ord-time {
                    font-size: 10px; color: var(--muted);
                    margin-top: 2px;
                }

                /* mode badge */
                .ord-mode {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 3px 9px; border-radius: 100px;
                    font-size: 10px; font-weight: 600;
                    letter-spacing: 1px; text-transform: uppercase;
                }

                .ord-mode.buy {
                    background: var(--blue-p); color: var(--blue);
                    border: 1px solid rgba(26,86,219,0.18);
                }

                .ord-mode.sell {
                    background: var(--red-p); color: var(--red);
                    border: 1px solid rgba(185,28,28,0.18);
                }

                .ord-mode-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: currentColor;
                }

                /* number cells */
                .ord-qty {
                    font-variant-numeric: tabular-nums;
                    color: var(--body);
                }

                .ord-price {
                    font-variant-numeric: tabular-nums;
                    color: var(--body);
                }

                .ord-total {
                    font-weight: 500;
                    font-variant-numeric: tabular-nums;
                }

                /* ── empty state ── */
                .ord-empty-card {
                    background: white;
                    border: 1px solid var(--bd);
                    border-radius: 20px;
                    padding: 72px 40px;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    gap: 16px; text-align: center;
                }

                .ord-empty-icon {
                    width: 64px; height: 64px;
                    background: var(--gp);
                    border-radius: 18px;
                    display: flex; align-items: center;
                    justify-content: center; font-size: 28px;
                    border: 1px solid var(--bd);
                }

                .ord-empty-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 26px; font-weight: 300;
                    color: var(--ink); margin: 0; letter-spacing: -0.5px;
                }

                .ord-empty-title em {
                    font-style: italic; font-weight: 600; color: var(--g);
                }

                .ord-rule {
                    width: 32px; height: 2px;
                    background: linear-gradient(90deg, var(--gold), transparent);
                    border: none; border-radius: 2px; margin: 0;
                }

                .ord-empty-sub {
                    font-size: 14px; color: var(--muted);
                    line-height: 1.7; max-width: 300px; margin: 0;
                }

                .ord-btn {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 11px 28px;
                    background: var(--g); color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border-radius: 9px; text-decoration: none;
                    transition: opacity 0.15s, transform 0.15s;
                    box-shadow: 0 4px 14px rgba(29,107,62,0.22);
                    margin-top: 4px;
                }

                .ord-btn:hover { opacity: 0.88; transform: translateY(-1px); color: white; }

                .ord-btn-arr {
                    width: 18px; height: 18px; border-radius: 50%;
                    background: rgba(255,255,255,0.22);
                    display: flex; align-items: center;
                    justify-content: center; font-size: 10px;
                }

                /* ── hints ── */
                .ord-hints {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .ord-hint-card {
                    background: white; border: 1px solid var(--bd);
                    border-radius: 14px; padding: 18px 20px;
                    display: flex; flex-direction: column; gap: 8px;
                    transition: transform 0.18s, box-shadow 0.18s;
                }

                .ord-hint-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 28px rgba(29,107,62,0.08);
                }

                .ord-hint-icon { font-size: 20px; }

                .ord-hint-title {
                    font-size: 13px; font-weight: 500;
                    color: var(--ink); margin: 0;
                }

                .ord-hint-desc {
                    font-size: 12px; color: var(--muted);
                    line-height: 1.6; margin: 0;
                }

                /* skeleton loader */
                .ord-skeleton {
                    background: linear-gradient(90deg, var(--mist) 25%, #e8f5ee 50%, var(--mist) 75%);
                    background-size: 200% 100%;
                    animation: ord-shimmer 1.4s infinite;
                    border-radius: 6px; height: 14px;
                }

                @keyframes ord-shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

            <div className="ord-wrap">

                {/* header */}
                <div className="ord-header">
                    <h2 className="ord-title"><em>Orders</em></h2>
                    {orders.length > 0 &&
                        <span className="ord-count">{orders.length} order{orders.length !== 1 ? "s" : ""} today</span>
                    }
                </div>

                {/* loading */}
                {isLoading && (
                    <div className="ord-card" style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <div className="ord-skeleton" style={{ width: 90 }} />
                                <div className="ord-skeleton" style={{ width: 46 }} />
                                <div className="ord-skeleton" style={{ width: 40 }} />
                                <div className="ord-skeleton" style={{ flex: 1 }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* orders exist */}
                {!isLoading && orders.length > 0 && (
                    <>
                        {/* summary strip */}
                        <div className="ord-summary">
                            <div className="ord-stat">
                                <span className="ord-stat-label">Buy orders</span>
                                <span className="ord-stat-val green">{totalBuy}</span>
                            </div>
                            <div className="ord-stat">
                                <span className="ord-stat-label">Sell orders</span>
                                <span className="ord-stat-val red">{totalSell}</span>
                            </div>
                            <div className="ord-stat">
                                <span className="ord-stat-label">Total value</span>
                                <span className="ord-stat-val">
                                    ₹{totalVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        {/* table */}
                        <div className="ord-card">
                            <table className="ord-table">
                                <thead>
                                    <tr>
                                        <th>Stock</th>
                                        <th>Mode</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, i) => {
                                        const isBuy = order.mode === "BUY";
                                        const total = (order.qty * order.price).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2, maximumFractionDigits: 2,
                                        });
                                        const time = order.createdAt
                                            ? new Date(order.createdAt).toLocaleTimeString("en-IN", {
                                                hour: "2-digit", minute: "2-digit",
                                            })
                                            : null;

                                        return (
                                            <tr key={order._id ?? i}>
                                                <td>
                                                    <div className="ord-name">{order.name}</div>
                                                    {time && <div className="ord-time">{time}</div>}
                                                </td>
                                                <td>
                                                    <span className={`ord-mode ${isBuy ? "buy" : "sell"}`}>
                                                        <span className="ord-mode-dot" />
                                                        {order.mode}
                                                    </span>
                                                </td>
                                                <td className="ord-qty">{order.qty}</td>
                                                <td className="ord-price">
                                                    {order.price > 0
                                                        ? `₹${Number(order.price).toLocaleString("en-IN")}`
                                                        : <span style={{ color: "var(--muted)", fontSize: 11 }}>Market</span>
                                                    }
                                                </td>
                                                <td className="ord-total">
                                                    {order.price > 0 ? `₹${total}` : "—"}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* empty state */}
                {!isLoading && orders.length === 0 && (
                    <>
                        <div className="ord-empty-card">
                            <div className="ord-empty-icon">📋</div>
                            <h3 className="ord-empty-title">No orders <em>yet</em></h3>
                            <hr className="ord-rule" />
                            <p className="ord-empty-sub">
                                You haven't placed any orders today. Head to your watchlist to start trading.
                            </p>
                            <Link to="/" className="ord-btn">
                                Go to watchlist
                                <span className="ord-btn-arr">→</span>
                            </Link>
                        </div>

                        <div className="ord-hints">
                            {[
                                { icon: "⚡", title: "Instant execution", desc: "Market orders execute immediately at the best available price." },
                                { icon: "🎯", title: "Limit orders", desc: "Set your price and we'll execute when the market reaches it." },
                                { icon: "🛡️", title: "Stop-loss orders", desc: "Protect your positions with automatic stop-loss triggers." },
                            ].map(({ icon, title, desc }) => (
                                <div className="ord-hint-card" key={title}>
                                    <span className="ord-hint-icon">{icon}</span>
                                    <p className="ord-hint-title">{title}</p>
                                    <p className="ord-hint-desc">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </>
    );
};

export default Orders;