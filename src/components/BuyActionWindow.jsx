import React, { useState } from "react";
import axios from "axios";
import { useGeneral } from "./GeneralContext";

const BuyActionWindow = ({ uid }) => {
    const { closeBuyWindow } = useGeneral();

    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice]       = useState(0.0);
    const [orderType, setOrderType]         = useState("market");
    const [isLoading, setIsLoading]         = useState(false);

    const estimatedValue = (stockQuantity * stockPrice).toLocaleString("en-IN", {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    });

    const handleBuyClick = async () => {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:8080/newOrder", {
                name: uid,
                qty: stockQuantity,
                price: stockPrice,
                mode: "BUY",
            });
        } finally {
            setIsLoading(false);
            closeBuyWindow();
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

                .baw-overlay {
                    position: fixed; inset: 0;
                    background: rgba(17,28,20,0.35);
                    z-index: 2000;
                    display: flex; align-items: center; justify-content: center;
                    backdrop-filter: blur(2px);
                    -webkit-backdrop-filter: blur(2px);
                }

                .baw-window {
                    --g: #1d6b3e; --gm: #2e9e5b; --gp: #e8f5ee;
                    --gold: #c9a84c; --ink: #111c14; --mist: #f4faf6;
                    --body: #4a5c4e; --muted: #8aab8e;
                    --bd: rgba(29,107,62,0.15);
                    --blue: #1a56db; --blue-p: #ebf0ff;
                    font-family: 'Outfit', sans-serif;
                    background: white;
                    border-radius: 20px;
                    border: 1px solid var(--bd);
                    box-shadow: 0 24px 64px rgba(17,28,20,0.18);
                    width: 360px;
                    overflow: hidden;
                }

                .baw-header {
                    background: var(--blue-p);
                    border-bottom: 1px solid rgba(26,86,219,0.15);
                    padding: 16px 20px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                }

                .baw-header-left {
                    display: flex; flex-direction: column; gap: 2px;
                }

                .baw-stock-name {
                    font-size: 15px; font-weight: 500;
                    color: var(--blue); letter-spacing: -0.2px;
                }

                .baw-stock-meta {
                    font-size: 11px; color: rgba(26,86,219,0.6);
                    letter-spacing: 0.5px; text-transform: uppercase;
                }

                .baw-buy-badge {
                    background: var(--blue); color: white;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1px; text-transform: uppercase;
                    padding: 4px 10px; border-radius: 100px;
                }

                .baw-body {
                    padding: 20px;
                    display: flex; flex-direction: column; gap: 16px;
                }

                .baw-type-row {
                    display: flex; gap: 6px;
                }

                .baw-type-btn {
                    flex: 1; padding: 7px 0;
                    font-family: 'Outfit', sans-serif;
                    font-size: 12px; font-weight: 500;
                    border-radius: 8px; cursor: pointer;
                    border: 1px solid rgba(29,107,62,0.15);
                    background: var(--mist); color: var(--muted);
                    transition: all 0.15s ease;
                }

                .baw-type-btn.active {
                    background: var(--blue-p);
                    border-color: rgba(26,86,219,0.25);
                    color: var(--blue);
                }

                .baw-fields {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .baw-field {
                    display: flex; flex-direction: column; gap: 6px;
                }

                .baw-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted);
                }

                .baw-input {
                    width: 100%; box-sizing: border-box;
                    padding: 10px 12px;
                    border: 1px solid rgba(29,107,62,0.15);
                    border-radius: 9px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 500;
                    color: var(--ink);
                    background: var(--mist);
                    outline: none;
                    transition: border-color 0.18s ease, background 0.18s ease;
                    font-variant-numeric: tabular-nums;
                }

                .baw-input:focus {
                    border-color: rgba(26,86,219,0.4);
                    background: white;
                }

                .baw-input:disabled {
                    opacity: 0.45; cursor: not-allowed;
                }

                .baw-estimate {
                    background: var(--mist);
                    border: 1px solid var(--bd);
                    border-radius: 10px;
                    padding: 12px 14px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                }

                .baw-estimate-label {
                    font-size: 12px; color: var(--muted);
                }

                .baw-estimate-value {
                    font-size: 13px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                }

                .baw-footer {
                    padding: 16px 20px;
                    border-top: 1px solid var(--bd);
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 10px;
                    background: var(--mist);
                }

                .baw-margin {
                    display: flex; flex-direction: column; gap: 2px;
                }

                .baw-margin-label {
                    font-size: 10px; letter-spacing: 1px;
                    text-transform: uppercase; color: var(--muted);
                }

                .baw-margin-value {
                    font-size: 14px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                }

                .baw-actions {
                    display: flex; gap: 8px;
                }

                .baw-btn-buy {
                    display: inline-flex; align-items: center;
                    gap: 6px; padding: 10px 20px;
                    background: var(--blue); color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border: none; border-radius: 9px;
                    cursor: pointer;
                    transition: opacity 0.18s ease, transform 0.18s ease;
                }

                .baw-btn-buy:hover:not(:disabled) {
                    opacity: 0.88; transform: translateY(-1px);
                }

                .baw-btn-buy:disabled {
                    opacity: 0.6; cursor: not-allowed;
                }

                .baw-btn-cancel {
                    padding: 10px 16px;
                    background: white; color: var(--muted);
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border: 1px solid var(--bd); border-radius: 9px;
                    cursor: pointer;
                    transition: background 0.15s ease, color 0.15s ease;
                }

                .baw-btn-cancel:hover {
                    background: #fdecea; color: #b91c1c;
                    border-color: rgba(185,28,28,0.2);
                }
            `}</style>

            <div className="baw-overlay" onClick={closeBuyWindow}>
                <div className="baw-window" draggable="true" onClick={e => e.stopPropagation()}>

                    {/* header */}
                    <div className="baw-header">
                        <div className="baw-header-left">
                            <span className="baw-stock-name">{uid || "INFY"}</span>
                            <span className="baw-stock-meta">NSE · Equity</span>
                        </div>
                        <span className="baw-buy-badge">Buy</span>
                    </div>

                    {/* body */}
                    <div className="baw-body">

                        <div className="baw-type-row">
                            {["market", "limit", "SL"].map(type => (
                                <button
                                    key={type}
                                    className={`baw-type-btn${orderType === type ? " active" : ""}`}
                                    onClick={() => setOrderType(type)}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="baw-fields">
                            <div className="baw-field">
                                <label className="baw-label">Quantity</label>
                                <input
                                    className="baw-input"
                                    type="number"
                                    min="1"
                                    value={stockQuantity}
                                    onChange={e => setStockQuantity(e.target.value)}
                                />
                            </div>
                            <div className="baw-field">
                                <label className="baw-label">Price (₹)</label>
                                <input
                                    className="baw-input"
                                    type="number"
                                    step="0.05"
                                    value={stockPrice}
                                    onChange={e => setStockPrice(e.target.value)}
                                    disabled={orderType === "market"}
                                    placeholder={orderType === "market" ? "Market price" : "0.00"}
                                />
                            </div>
                        </div>

                        <div className="baw-estimate">
                            <span className="baw-estimate-label">Estimated value</span>
                            <span className="baw-estimate-value">
                                {orderType === "market" ? "At market price" : `₹${estimatedValue}`}
                            </span>
                        </div>

                    </div>

                    {/* footer */}
                    <div className="baw-footer">
                        <div className="baw-margin">
                            <span className="baw-margin-label">Margin required</span>
                            <span className="baw-margin-value">₹140.65</span>
                        </div>
                        <div className="baw-actions">
                            <button className="baw-btn-cancel" onClick={closeBuyWindow}>
                                Cancel
                            </button>
                            <button
                                className="baw-btn-buy"
                                onClick={handleBuyClick}
                                disabled={isLoading}
                            >
                                {isLoading ? "Placing…" : "Buy"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BuyActionWindow;