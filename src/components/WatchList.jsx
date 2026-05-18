import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
    const [search, setSearch] = useState("");

    const filtered = watchlist.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const chartData = {
        labels: watchlist.map(s => s.name),
        datasets: [{
            label: "Price",
            data: watchlist.map(s => s.price),
            backgroundColor: ["#1d6b3e", "#2e9e5b", "#6effa0", "#c9a84c", "#e8c97a", "#8aab8e"],
            borderColor: "#ffffff",
            borderWidth: 2,
        }],
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

                .wl-wrap {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --ink: #111c14; --mist: #f4faf6; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.13);
                    --red: #b91c1c; --red-p: #fdecea;
                    --blue: #1a56db;
                    font-family: 'Outfit', sans-serif;
                    background: white;
                    border-right: 1px solid var(--bd);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    /* FIX 1: Removed overflow:hidden — it was clipping MUI Tooltip portals
                       that render outside the container bounds */
                }

                /* FIX 2: Boost MUI Tooltip z-index above all stacking contexts
                   (sidebars, modals, sticky headers, etc.) */
                .MuiTooltip-popper {
                    z-index: 9999 !important;
                }

                /* search */
                .wl-search-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 14px;
                    border-bottom: 1px solid var(--bd);
                    flex-shrink: 0;
                }

                .wl-search {
                    flex: 1;
                    border: none; outline: none;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; color: var(--ink);
                    background: transparent;
                    min-width: 0;
                }

                .wl-search::placeholder { color: var(--muted); }

                .wl-count {
                    font-size: 11px; font-weight: 500;
                    color: var(--muted); white-space: nowrap;
                    background: var(--gp); padding: 2px 8px;
                    border-radius: 100px; border: 1px solid var(--bd);
                    flex-shrink: 0;
                }

                /* list */
                .wl-list {
                    list-style: none; margin: 0; padding: 0;
                    flex: 1; overflow-y: auto;
                }

                .wl-list::-webkit-scrollbar { width: 3px; }
                .wl-list::-webkit-scrollbar-thumb {
                    background: rgba(29,107,62,0.2);
                    border-radius: 2px;
                }

                /* each row */
                .wl-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 14px;
                    border-bottom: 1px solid var(--bd);
                    min-height: 44px;
                    box-sizing: border-box;
                    transition: background 0.15s;
                    cursor: default;
                }

                .wl-item:hover { background: var(--mist); }

                .wl-name {
                    font-size: 13px; font-weight: 500;
                    color: var(--ink);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    flex: 1;
                    min-width: 0;
                    margin-right: 8px;
                }

                /* info shown when NOT hovering */
                .wl-info {
                    display: flex; align-items: center; gap: 6px;
                    flex-shrink: 0;
                }

                .wl-pct {
                    font-size: 11px; font-weight: 500;
                    padding: 2px 6px; border-radius: 100px;
                    font-variant-numeric: tabular-nums;
                    white-space: nowrap;
                }

                .wl-pct-up   { background: #e8f5ee; color: #1d6b3e; }
                .wl-pct-down { background: var(--red-p); color: var(--red); }

                .wl-price {
                    font-size: 13px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                    white-space: nowrap;
                }

                /* actions shown when hovering */
                .wl-actions {
                    display: flex; align-items: center;
                    gap: 4px; flex-shrink: 0;
                }

                .wl-btn-buy {
                    padding: 4px 10px;
                    background: var(--blue); color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 11px; font-weight: 500;
                    border: none; border-radius: 5px;
                    cursor: pointer; white-space: nowrap;
                    transition: opacity 0.15s;
                }

                .wl-btn-buy:hover { opacity: 0.85; }

                .wl-btn-sell {
                    padding: 4px 10px;
                    background: var(--red-p); color: var(--red);
                    font-family: 'Outfit', sans-serif;
                    font-size: 11px; font-weight: 500;
                    border: 1px solid rgba(185,28,28,0.2);
                    border-radius: 5px; cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.15s;
                }

                .wl-btn-sell:hover { background: #fbd5d5; }

                .wl-btn-icon {
                    width: 26px; height: 26px; padding: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: var(--mist); color: var(--muted);
                    border: 1px solid var(--bd); border-radius: 5px;
                    cursor: pointer; flex-shrink: 0;
                    transition: background 0.15s, color 0.15s;
                }

                .wl-btn-icon:hover { background: var(--gp); color: var(--g); }
                .wl-btn-icon svg { font-size: 16px !important; }

                /* empty */
                .wl-empty {
                    padding: 32px 16px;
                    text-align: center;
                    font-size: 13px; color: var(--muted);
                }

                /* chart */
                .wl-chart-section {
                    border-top: 1px solid var(--bd);
                    padding: 16px;
                    flex-shrink: 0;
                }

                .wl-chart-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 2px; text-transform: uppercase;
                    color: var(--muted); margin: 0 0 12px;
                    display: flex; align-items: center; gap: 8px;
                }

                .wl-chart-label::after {
                    content: ''; flex: 1;
                    height: 1px; background: var(--bd);
                }
            `}</style>

            <div className="wl-wrap">

                <div className="wl-search-row">
                    <span style={{ fontSize: 14, color: "var(--muted)", flexShrink: 0 }}>🔍</span>
                    <input
                        className="wl-search"
                        type="text"
                        placeholder="Search eg: INFY, NIFTY, GOLD MCX"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <span className="wl-count">{watchlist.length} / 50</span>
                </div>

                <ul className="wl-list">
                    {filtered.length === 0
                        ? <div className="wl-empty">No results for "{search}"</div>
                        : filtered.map((stock, i) => <WatchListItem stock={stock} key={i} />)
                    }
                </ul>

                <div className="wl-chart-section">
                    <p className="wl-chart-label">Distribution</p>
                    <DoughnutChart data={chartData} />
                </div>

            </div>
        </>
    );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <li
            className="wl-item"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span className="wl-name">{stock.name}</span>

            {hovered
                ? <WatchListActions uid={stock.name} />
                : (
                    <div className="wl-info">
                        <span className={`wl-pct ${stock.isDown ? "wl-pct-down" : "wl-pct-up"}`}>
                            {stock.isDown ? "▼" : "▲"} {stock.percent}
                        </span>
                        <span className="wl-price">{stock.price}</span>
                    </div>
                )
            }
        </li>
    );
};

const WatchListActions = ({ uid }) => {
    const generalContext = useContext(GeneralContext);

    return (
        <div className="wl-actions">
            <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
                <button
                    className="wl-btn-buy"
                    onClick={(e) => {
                        e.stopPropagation();
                        generalContext.openBuyWindow(uid);
                    }}
                >
                    Buy
                </button>
            </Tooltip>

            <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
                <button
                    className="wl-btn-sell"
                    onClick={(e) => {
                        e.stopPropagation();
                        generalContext.openSellWindow(uid); // ← wire this up
                    }}
                >
                    Sell
                </button>
            </Tooltip>

            <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
                <button className="wl-btn-icon" onClick={e => e.stopPropagation()}>
                    <BarChartOutlined />
                </button>
            </Tooltip>

            <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                <button className="wl-btn-icon" onClick={e => e.stopPropagation()}>
                    <MoreHoriz />
                </button>
            </Tooltip>
        </div>
    );
};