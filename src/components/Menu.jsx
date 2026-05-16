import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Menu() {
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", path: "/" },
        { label: "Orders", path: "/orders" },
        { label: "Holdings", path: "/holdings" },
        { label: "Positions", path: "/positions" },
        { label: "Funds", path: "/funds" },
        { label: "Apps", path: "/apps" },
    ];

    return (
        <>
            <style>{`
                .mn-wrap {
                    display: flex; align-items: center; gap: 2px;
                }

                .mn-link {
                    font-size: 14px; font-weight: 400;
                    color: #4a5c4e;
                    text-decoration: none;
                    padding: 8px 14px; border-radius: 7px;
                    transition: background 0.15s ease, color 0.15s ease;
                    white-space: nowrap;
                }

                .mn-link:hover {
                    background: #e8f5ee; color: #1d6b3e;
                }

                .mn-link.active {
                    background: #e8f5ee; color: #1d6b3e; font-weight: 500;
                }

                .mn-sep {
                    width: 1px; height: 20px;
                    background: rgba(29,107,62,0.13);
                    margin: 0 8px;
                }

                .mn-profile {
                    display: flex; align-items: center; gap: 8px;
                    padding: 5px 6px 5px 14px;
                    border: 1px solid rgba(29,107,62,0.15);
                    border-radius: 100px;
                    cursor: pointer;
                    transition: background 0.15s ease;
                    position: relative;
                    background: white;
                }

                .mn-profile:hover { background: #e8f5ee; }

                .mn-avatar {
                    width: 24px; height: 34px; border-radius: 50%;
                    background: #1d6b3e; color: white;
                    font-size: 11px; font-weight: 500;
                    display: flex; align-items: center; justify-content: center;
                    letter-spacing: 0.5px; flex-shrink: 0;
                }

                .mn-username {
                    font-size: 13px; font-weight: 500;
                    color: #111c14; letter-spacing: 0.3px;
                }

                .mn-chevron {
                    font-size: 10px; color: #8aab8e;
                    transition: transform 0.2s ease;
                    margin-right: 4px;
                }

                .mn-chevron.open { transform: rotate(180deg); }

                .mn-dropdown {
                    position: absolute; top: calc(100% + 10px); right: 0;
                    background: white;
                    border: 1px solid rgba(29,107,62,0.13);
                    border-radius: 14px;
                    padding: 8px;
                    min-width: 180px;
                    box-shadow: 0 8px 28px rgba(29,107,62,0.10);
                    z-index: 100;
                }

                .mn-dd-header {
                    padding: 10px 12px 8px;
                    border-bottom: 1px solid rgba(29,107,62,0.10);
                    margin-bottom: 6px;
                }

                .mn-dd-uid {
                    font-size: 11px; font-weight: 500;
                    color: #1d6b3e; letter-spacing: 1px;
                    text-transform: uppercase;
                }

                .mn-dd-label {
                    font-size: 11px; color: #8aab8e; margin-top: 1px;
                }

                .mn-dd-item {
                    display: block; padding: 9px 12px;
                    font-size: 13px; color: #4a5c4e;
                    text-decoration: none; border-radius: 8px;
                    transition: background 0.14s ease, color 0.14s ease;
                }

                .mn-dd-item:hover { background: #e8f5ee; color: #1d6b3e; }

                .mn-dd-item.danger { color: #b91c1c; }
                .mn-dd-item.danger:hover { background: #fdecea; color: #b91c1c; }
            `}</style>

            <nav className="mn-wrap">
                {navItems.map(({ label, path }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`mn-link${location.pathname === path ? " active" : ""}`}
                    >
                        {label}
                    </Link>
                ))}

                <span className="mn-sep" />

                <div className="mn-profile" onClick={() => setIsProfileOpen(o => !o)}>
                    <span className="mn-username">USERID</span>
                    <div className="mn-avatar">ZU</div>
                    <span className={`mn-chevron${isProfileOpen ? " open" : ""}`}>▼</span>

                    {isProfileOpen && (
                        <div className="mn-dropdown" onClick={e => e.stopPropagation()}>
                            <div className="mn-dd-header">
                                <p className="mn-dd-uid">USERID</p>
                                <p className="mn-dd-label">Zerodha account</p>
                            </div>
                            <a href="/profile" className="mn-dd-item">Profile &amp; settings</a>
                            <a href="/funds" className="mn-dd-item">Add funds</a>
                            <a href="/support" className="mn-dd-item">Support</a>
                            <a href="/logout" className="mn-dd-item danger">Logout</a>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Menu;