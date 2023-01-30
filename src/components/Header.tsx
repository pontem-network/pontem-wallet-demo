import { NavLink } from 'react-router-dom';
import { Link } from '@mui/material';
import React from 'react';
import '../styles.scss';

export function Header() {
  const getActiveLink = ({ isActive }: { isActive: boolean }): string => (isActive ? 'is-active' : '');

  return (
    <header className="header">
      <NavLink to="/pontem-native" className={getActiveLink}>
        <Link variant="button" href="/Users/dmitrijkuksenko/wallet-example/public" underline="none">Pontem Native</Link>
      </NavLink>
      <NavLink to="/hippo-adapter" className={getActiveLink}>
        <Link variant="button" href="/Users/dmitrijkuksenko/wallet-example/public" underline="hover">Hippo Wallet Adapter</Link>
      </NavLink>

      <NavLink to="/aptos-adapter" className={getActiveLink}>
        <Link variant="button" href="/Users/dmitrijkuksenko/wallet-example/public" underline="hover">Aptos Wallet Adapter</Link>
      </NavLink>
      <NavLink to="/widget" className={getActiveLink}>
      <Link variant="button" href="/Users/dmitrijkuksenko/wallet-example/public"
        underline="hover">Widget</Link>
       </NavLink>
    </header>
  );
}
