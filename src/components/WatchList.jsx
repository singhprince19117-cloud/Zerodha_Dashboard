import { Tooltip, Grow } from "@mui/material";
import { useState } from "react";
import { watchlist } from "../data/data";
import { KeyboardArrowUp, KeyboardArrowDown, BarChartOutlined, MoreHoriz } from "@mui/icons-material";

const WatchListItem = ({ stock }) => {
    const [showWatchlistActions, setshowWatchlistActions] = useState(false);

    const handleMouseEnter = (e) => {
        setshowWatchlistActions(true);
    }

    const handleMouseExit = (e) => {
        setshowWatchlistActions(false);
    }

    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
                <div className="itemInfo">
                    <span className="percent">{stock.percent}</span>
                    {stock.isDown ? (
                        <KeyboardArrowDown className="down" />
                    ) : (
                        <KeyboardArrowUp className="up" />
                    )}
                    <span classname="price">{stock.price}</span>
                </div>
            </div>

            {showWatchlistActions && <WatchListActions uid={stock.name} />}
        </li>
    )
}

const WatchListActions = ({ uid }) => {
    return (
        <span>
            <Tooltip
                title="Buy (B)"
                placement="top"
                arrow
                TransitionComponent={Grow}
            >
                <button className="buy">Buy</button>
            </Tooltip>

            <Tooltip
                title="Sell (S)"
                placement="top"
                arrow
                TransitionComponent={Grow}
            >
                <button className="sell">Sell</button>
            </Tooltip>

            <Tooltip
                title="Analytics (A)"
                placement="top"
                arrow
                TransitionComponent={Grow}
            >
                <button className="sell">Analytics</button>
            </Tooltip>

            <button className="action">
                <BarChartOutlined className="icon" />
            </button>

            <Tooltip
                title="More (A)"
                placement="top"
                arrow
                TransitionComponent={Grow}
            >
                <button className="action">
                    <MoreHoriz className="icon" />
                </button>
            </Tooltip>
        </span>
    )
}

function WatchList() {
    return (
        <div className="watchlist-container">
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg: infy, bse, niftym fut weekly, gold mcx"
                    className="search"
                />
                <span className="counts">{watchlist.length} / 50</span>
            </div>

            <ul className="list">
                {watchlist.map((stock, index) => (
                    <WatchListItem stock={stock} key={index} />
                ))}
            </ul>
        </div>
    );
}

export default WatchList;