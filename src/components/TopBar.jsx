import Menu from "./Menu";

function TopBar() {
    const indices = [
        { label: "NIFTY 50", points: 24198.85, change: +143.60, pct: +0.60 },
        { label: "SENSEX", points: 79802.12, change: +462.30, pct: +0.58 },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

                .tb-bar {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --ink: #111c14; --mist: #f4faf6; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.13);
                    font-family: 'Outfit', sans-serif;
                    position: fixed; top: 0; left: 0; right: 0;
                    z-index: 1000;
                    background: rgba(244,250,246,0.92);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-bottom: 1px solid var(--bd);
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                    height: 68px;
                }

                .tb-left {
                    display: flex; align-items: center; gap: 4px;
                }

                .tb-live-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: var(--gm); margin-right: 8px; flex-shrink: 0;
                    animation: tb-pulse 2.4s ease-in-out infinite;
                }

                @keyframes tb-pulse {
                    0%,100% { opacity:1; transform:scale(1); }
                    50%      { opacity:0.3; transform:scale(0.5); }
                }

                .tb-index {
                    display: flex; align-items: center; gap: 8px;
                    padding: 5px 12px; border-radius: 8px;
                    cursor: default;
                    transition: background 0.18s ease;
                }

                .tb-index:hover { background: var(--gp); }

                .tb-sep {
                    width: 1px; height: 18px;
                    background: var(--bd); margin: 0 4px;
                }

                .tb-index-label {
                    font-size: 11px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted);
                }

                .tb-index-points {
                    font-size: 14px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                }

                .tb-pill {
                    font-size: 11px; font-weight: 500;
                    padding: 3px 8px; border-radius: 100px;
                    font-variant-numeric: tabular-nums;
                }

                .tb-up   { background: #e8f5ee; color: #1d6b3e; }
                .tb-down { background: #fdecea; color: #b91c1c; }

                @media (max-width: 768px) {
                    .tb-bar { padding: 0 16px; }
                    .tb-index-label { display: none; }
                }
            `}</style>

            <header className="tb-bar">
                <div className="tb-left">
                    <span className="tb-live-dot" />
                    {indices.map(({ label, points, pct }, i) => (
                        <>
                            {i > 0 && <span className="tb-sep" key={`sep-${i}`} />}
                            <div className="tb-index" key={label}>
                                <span className="tb-index-label">{label}</span>
                                <span className="tb-index-points">
                                    {points.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </span>
                                <span className={`tb-pill ${pct >= 0 ? "tb-up" : "tb-down"}`}>
                                    {pct >= 0 ? "▲" : "▼"} {Math.abs(pct).toFixed(2)}%
                                </span>
                            </div>
                        </>
                    ))}
                </div>

                <Menu />
            </header>
        </>
    );
}

export default TopBar;