import {NavLink} from "react-router-dom";
import {Link} from "@mui/material";
import React from "react";
import '../styles.scss';


export const Header = () => {
    const getActiveLink = ({ isActive }: { isActive: boolean }): string => isActive ? 'is-active' : '';

    return (
        <header className="header">
            <NavLink to="/pontem-native" className={getActiveLink}>
                <Link variant='button' href="/Users/dmitrijkuksenko/pontem-wallet-demo/public" underline='none'>Pontem Native</Link>
            </NavLink>
            <NavLink to="/hippo-adapter" className={getActiveLink}>
                <Link variant='button' href="/Users/dmitrijkuksenko/pontem-wallet-demo/public" underline='hover'>Wallet Adapter</Link>
            </NavLink>
        </header>
    )
};
