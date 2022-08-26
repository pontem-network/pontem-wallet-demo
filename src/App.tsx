import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider, PontemWalletAdapter } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { PontemWallet } from "./PontemWallet";
import { HippoPontemWallet } from "./HippoPontemWallet";

const wallets = [
    new PontemWalletAdapter(),
];

function App() {
    return (
        <HashRouter>
            <div className="app">
                <Routes>
                    <Route path='/' element={<PontemWallet />}/>
                    <Route path='/hippo-adapter' element={
                        <WalletProvider wallets={wallets}>
                            <HippoPontemWallet />
                        </WalletProvider>
                    }/>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
