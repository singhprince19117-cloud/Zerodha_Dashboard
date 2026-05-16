import { useState } from "react";
import { Link } from "react-router-dom"

function Menu() {
    return ( 
        <div className="container">
            <div className="menus">
                <ul>
                    <li>
                        <p>Dashboard</p>
                    </li>
                    <li>
                        <p>Orders</p>
                    </li>
                    <li>
                        <p>Holdings</p>
                    </li>
                    <li>
                        <p>Positions</p>
                    </li>
                    <li>
                        <p>Funds</p>
                    </li>
                    <li>
                        <p>Apps</p>
                    </li>
                </ul>
                <hr />
                <div className="profile">
                    <div className="avatar">ZU</div>
                    <div className="username">USERID</div>
                </div>
            </div>
        </div>
    );
}

export default Menu;