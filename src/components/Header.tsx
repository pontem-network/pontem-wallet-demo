import { NavLink } from 'react-router-dom';
import React from 'react';
import '../styles.scss';

export const Header = () => {
  const getActiveLink = ({ isActive }: { isActive: boolean }): string => (isActive ? 'is-active' : '');

  return (
        <header className="header">
            <NavLink to="/pontem-native" className={getActiveLink}>
                Pontem Native
            </NavLink>
            <NavLink to="/wallet-adapter" className={getActiveLink}>
               Wallet Adapter
            </NavLink>
        </header>
  );
};
