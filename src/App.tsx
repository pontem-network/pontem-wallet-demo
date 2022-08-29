import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider, PontemWalletAdapter, MartianWalletAdapter, MultiMaskWalletAdapter } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { PontemWallet } from "./PontemWallet";
import { HippoPontemWallet } from "./HippoPontemWallet";
import { Header } from './Headers';

const wallets = [
    new PontemWalletAdapter(),
    new MartianWalletAdapter(),
    new MultiMaskWalletAdapter(),
];

function App() {
    return (
        <HashRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route path='/pontem-native' element={<PontemWallet />}/>
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
