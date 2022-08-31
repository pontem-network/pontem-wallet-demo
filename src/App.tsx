import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider, PontemWalletAdapter, MartianWalletAdapter } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { PontemWallet } from './PontemWallet';
import { HippoPontemWallet } from './HippoPontemWallet';
import { Header } from './components';
import { localStorageKey } from './consts';

const wallets = [
  new PontemWalletAdapter(),
  new MartianWalletAdapter(),
];

export function App() {
  return (
        <HashRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route index element={<PontemWallet />}/>
                    <Route path='/pontem-native' element={<PontemWallet />}/>
                    <Route path='/wallet-adapter' element={
                        <WalletProvider wallets={wallets} localStorageKey={localStorageKey}>
                            <HippoPontemWallet />
                        </WalletProvider>
                    }/>
                </Routes>
            </div>
        </HashRouter>
  );
}
