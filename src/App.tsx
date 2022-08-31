import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider, PontemWalletAdapter, MartianWalletAdapter } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { PontemWallet } from "./PontemWallet";
import { HippoPontemWallet } from "./HippoPontemWallet";
import { Header } from './components';
import { localStorageKey }  from "./consts";

const wallets = [
    new PontemWalletAdapter(),
    new MartianWalletAdapter(),
];

function App() {
    return (
        <HashRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route path='/pontem-native' element={<PontemWallet />}/>
                    <Route path='/hippo-adapter' element={
                        <WalletProvider wallets={wallets} localStorageKey={localStorageKey}>
                            <HippoPontemWallet />
                        </WalletProvider>
                    }/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
