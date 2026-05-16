import Menu from "./Menu";

function TopBar() {
    const indices = [
        { label: "NIFTY 50", points: 24198.85, change: +143.6,  pct: +0.60 },
        { label: "SENSEX",   points: 79802.12, change: +462.3,  pct: +0.58 },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

                .tb-bar {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --ink: #111c14; --mist: #f4faf6;
                    --bd: rgba(29,107,62,0.13);
                    font-family: 'Outfit', sans-serif;
                    position: fixed; top: 0; left: 0; right: 0;
                    z-index: 1000;
                    background: rgba(244,250,246,0.88);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border-bottom: 1px solid var(--bd);
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 48px;
                    height: 56px;
                    gap: 24px;
                }

                .tb-left {
                    display: flex; align-items: center; gap: 6px;
                }

                .tb-index {
                    display: flex; align-items: center; gap: 10px;
                    padding: 6px 14px;
                    border-radius: 8px;
                    transition: background 0.18s ease;
                    cursor: default;
                }

                .tb-index:hover { background: var(--gp); }

                .tb-divider {
                    width: 1px; height: 20px;
                    background: var(--bd);
                    flex-shrink: 0;
                }

                .tb-index-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: #8aab8e;
                }

                .tb-index-points {
                    font-size: 13px; font-weight: 500;
                    color: #111c14;
                    font-variant-numeric: tabular-nums;
                }

                .tb-index-change {
                    font-size: 11px; font-weight: 500;
                    padding: 2px 8px; border-radius: 100px;
                    font-variant-numeric: tabular-nums;
                }

                .tb-up {
                    background: #e8f5ee; color: #1d6b3e;
                }

                .tb-down {
                    background: #fdecea; color: #b91c1c;
                }

                .tb-live-dot {
                    width: 5px; height: 5px; border-radius: 50%;
                    background: #2e9e5b; flex-shrink: 0;
                    animation: tb-pulse 2.4s ease-in-out infinite;
                }

                @keyframes tb-pulse {
                    0%,100% { opacity:1; transform:scale(1); }
                    50%      { opacity:0.35; transform:scale(0.55); }
                }

                .tb-right {
                    display: flex; align-items: center;
                }

                @media (max-width: 768px) {
                    .tb-bar { padding: 0 20px; }
                    .tb-index-label { display: none; }
                }
            `}</style>

            <header className="tb-bar">

                <div className="tb-left">
                    <span className="tb-live-dot" title="Live" />

                    {indices.map(({ label, points, change, pct }, i) => (
                        <>
                            {i > 0 && <span className="tb-divider" key={`div-${i}`} />}
                            <div className="tb-index" key={label}>
                                <span className="tb-index-label">{label}</span>
                                <span className="tb-index-points">
                                    {points.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className={`tb-index-change ${pct >= 0 ? "tb-up" : "tb-down"}`}>
                                    {pct >= 0 ? "▲" : "▼"} {Math.abs(pct).toFixed(2)}%
                                </span>
                            </div>
                        </>
                    ))}
                </div>

                <div className="tb-right">
                    <Menu />
                </div>

            </header>
        </>
    );
}

export default TopBar;