import { Route, Routes } from "react-router-dom";
import WatchList from "./WatchList";
import Summary from "./Summary";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";
import Orders from "./Orders";

function Dashboard() {
    return (
        <>
            <style>{`
                .dashboard-container {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    height: 100vh;
                    padding-top: 68px;
                    overflow: hidden;
                    background: #f4faf6;
                    font-family: 'Outfit', sans-serif;
                }

                .dashboard-content {
                    overflow-y: auto;
                    background: #f4faf6;
                    padding: 32px 40px;
                }

                .dashboard-content::-webkit-scrollbar {
                    width: 4px;
                }

                .dashboard-content::-webkit-scrollbar-track {
                    background: transparent;
                }

                .dashboard-content::-webkit-scrollbar-thumb {
                    background: rgba(29,107,62,0.2);
                    border-radius: 2px;
                }

                .dashboard-content::-webkit-scrollbar-thumb:hover {
                    background: rgba(29,107,62,0.4);
                }
            `}</style>

            <div className="dashboard-container">
                <WatchList />
                <div className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<Summary />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/holdings" element={<Holdings />} />
                        <Route path="/positions" element={<Positions />} />
                        <Route path="/funds" element={<Funds />} />
                        <Route path="/apps" element={<Apps />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Dashboard;