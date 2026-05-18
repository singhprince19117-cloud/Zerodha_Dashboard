import React, { useState } from "react";
import axios from "axios";
import { useGeneral } from "./GeneralContext";

const SellActionWindow = ({ uid }) => {
    const { closeSellWindow } = useGeneral();

    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const [orderType, setOrderType] = useState("market");
    const [isLoading, setIsLoading] = useState(false);

    const estimatedValue = (stockQuantity * stockPrice).toLocaleString("en-IN", {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
    });

    const handleSellClick = async () => {
        setIsLoading(true);
        try {
            await axios.post("http://localhost:8080/sellOrder", {
                name: uid,
                qty: stockQuantity,
                price: stockPrice,
                mode: "SELL",
            });
        } finally {
            setIsLoading(false);
            closeSellWindow();
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap');

                .saw-overlay {
                    position: fixed; inset: 0;
                    background: rgba(28,10,10,0.35);
                    z-index: 2000;
                    display: flex; align-items: center; justify-content: center;
                    backdrop-filter: blur(2px);
                    -webkit-backdrop-filter: blur(2px);
                }

                .saw-window {
                    --red:    #b91c1c;
                    --red-m:  #dc2626;
                    --red-p:  #fef2f2;
                    --red-d:  #7f1d1d;
                    --ink:    #1c0a0a;
                    --mist:   #fff8f8;
                    --body:   #5c3a3a;
                    --muted:  #b07a7a;
                    --bd:     rgba(185,28,28,0.15);
                    font-family: 'Outfit', sans-serif;
                    background: white;
                    border-radius: 20px;
                    border: 1px solid var(--bd);
                    box-shadow: 0 24px 64px rgba(28,10,10,0.18);
                    width: 360px;
                    overflow: hidden;
                }

                .saw-header {
                    background: var(--red-p);
                    border-bottom: 1px solid rgba(185,28,28,0.15);
                    padding: 16px 20px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                }

                .saw-header-left {
                    display: flex; flex-direction: column; gap: 2px;
                }

                .saw-stock-name {
                    font-size: 15px; font-weight: 500;
                    color: var(--red); letter-spacing: -0.2px;
                }

                .saw-stock-meta {
                    font-size: 11px; color: rgba(185,28,28,0.55);
                    letter-spacing: 0.5px; text-transform: uppercase;
                }

                .saw-sell-badge {
                    background: var(--red); color: white;
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1px; text-transform: uppercase;
                    padding: 4px 10px; border-radius: 100px;
                }

                .saw-body {
                    padding: 20px;
                    display: flex; flex-direction: column; gap: 16px;
                }

                .saw-type-row {
                    display: flex; gap: 6px;
                }

                .saw-type-btn {
                    flex: 1; padding: 7px 0;
                    font-family: 'Outfit', sans-serif;
                    font-size: 12px; font-weight: 500;
                    border-radius: 8px; cursor: pointer;
                    border: 1px solid rgba(185,28,28,0.15);
                    background: var(--mist); color: var(--muted);
                    transition: all 0.15s ease;
                }

                .saw-type-btn.active {
                    background: var(--red-p);
                    border-color: rgba(185,28,28,0.3);
                    color: var(--red);
                }

                .saw-fields {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .saw-field {
                    display: flex; flex-direction: column; gap: 6px;
                }

                .saw-label {
                    font-size: 10px; font-weight: 500;
                    letter-spacing: 1.5px; text-transform: uppercase;
                    color: var(--muted);
                }

                .saw-input {
                    width: 100%; box-sizing: border-box;
                    padding: 10px 12px;
                    border: 1px solid rgba(185,28,28,0.15);
                    border-radius: 9px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px; font-weight: 500;
                    color: var(--ink);
                    background: var(--mist);
                    outline: none;
                    transition: border-color 0.18s ease, background 0.18s ease;
                    font-variant-numeric: tabular-nums;
                }

                .saw-input:focus {
                    border-color: rgba(185,28,28,0.4);
                    background: white;
                }

                .saw-input:disabled {
                    opacity: 0.45; cursor: not-allowed;
                }

                .saw-estimate {
                    background: var(--mist);
                    border: 1px solid var(--bd);
                    border-radius: 10px;
                    padding: 12px 14px;
                    display: flex; align-items: center;
                    justify-content: space-between;
                }

                .saw-estimate-label {
                    font-size: 12px; color: var(--muted);
                }

                .saw-estimate-value {
                    font-size: 13px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                }

                .saw-footer {
                    padding: 16px 20px;
                    border-top: 1px solid var(--bd);
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 10px;
                    background: var(--mist);
                }

                .saw-margin {
                    display: flex; flex-direction: column; gap: 2px;
                }

                .saw-margin-label {
                    font-size: 10px; letter-spacing: 1px;
                    text-transform: uppercase; color: var(--muted);
                }

                .saw-margin-value {
                    font-size: 14px; font-weight: 500;
                    color: var(--ink);
                    font-variant-numeric: tabular-nums;
                }

                .saw-actions {
                    display: flex; gap: 8px;
                }

                .saw-btn-sell {
                    display: inline-flex; align-items: center;
                    gap: 6px; padding: 10px 20px;
                    background: var(--red); color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border: none; border-radius: 9px;
                    cursor: pointer;
                    transition: opacity 0.18s ease, transform 0.18s ease;
                }

                .saw-btn-sell:hover:not(:disabled) {
                    opacity: 0.88; transform: translateY(-1px);
                }

                .saw-btn-sell:disabled {
                    opacity: 0.6; cursor: not-allowed;
                }

                .saw-btn-cancel {
                    padding: 10px 16px;
                    background: white; color: var(--muted);
                    font-family: 'Outfit', sans-serif;
                    font-size: 13px; font-weight: 500;
                    border: 1px solid var(--bd); border-radius: 9px;
                    cursor: pointer;
                    transition: background 0.15s ease, color 0.15s ease;
                }

                .saw-btn-cancel:hover {
                    background: #e8f5ee; color: #1d6b3e;
                    border-color: rgba(29,107,62,0.2);
                }
            `}</style>

            <div className="saw-overlay" onClick={closeSellWindow}>
                <div className="saw-window" onClick={e => e.stopPropagation()}>

                    {/* header */}
                    <div className="saw-header">
                        <div className="saw-header-left">
                            <span className="saw-stock-name">{uid || "INFY"}</span>
                            <span className="saw-stock-meta">NSE · Equity</span>
                        </div>
                        <span className="saw-sell-badge">Sell</span>
                    </div>

                    {/* body */}
                    <div className="saw-body">

                        <div className="saw-type-row">
                            {["market", "limit", "SL"].map(type => (
                                <button
                                    key={type}
                                    className={`saw-type-btn${orderType === type ? " active" : ""}`}
                                    onClick={() => setOrderType(type)}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="saw-fields">
                            <div className="saw-field">
                                <label className="saw-label">Quantity</label>
                                <input
                                    className="saw-input"
                                    type="number"
                                    min="1"
                                    value={stockQuantity}
                                    onChange={e => setStockQuantity(e.target.value)}
                                />
                            </div>
                            <div className="saw-field">
                                <label className="saw-label">Price (₹)</label>
                                <input
                                    className="saw-input"
                                    type="number"
                                    step="0.05"
                                    value={stockPrice}
                                    onChange={e => setStockPrice(e.target.value)}
                                    disabled={orderType === "market"}
                                    placeholder={orderType === "market" ? "Market price" : "0.00"}
                                />
                            </div>
                        </div>

                        <div className="saw-estimate">
                            <span className="saw-estimate-label">Estimated value</span>
                            <span className="saw-estimate-value">
                                {orderType === "market" ? "At market price" : `₹${estimatedValue}`}
                            </span>
                        </div>

                    </div>

                    {/* footer */}
                    <div className="saw-footer">
                        <div className="saw-margin">
                            <span className="saw-margin-label">Margin required</span>
                            <span className="saw-margin-value">₹140.65</span>
                        </div>
                        <div className="saw-actions">
                            <button className="saw-btn-cancel" onClick={closeSellWindow}>
                                Cancel
                            </button>
                            <button
                                className="saw-btn-sell"
                                onClick={handleSellClick}
                                disabled={isLoading}
                            >
                                {isLoading ? "Placing…" : "Sell"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SellActionWindow;