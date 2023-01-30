import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider, PontemWalletAdapter, MartianWalletAdapter } from '@manahippo/aptos-wallet-adapter';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

import './styles.scss';
import { PontemWallet as PontemWalletComponent } from './PontemWallet';
import { HippoPontemWallet } from './HippoPontemWallet';
import { Header, Widget } from './components';
import { localStorageKey } from './consts';
import { AptosPontemWallet } from './AptosWalletComponent';

const wallets = [
  new PontemWalletAdapter(),
  new MartianWalletAdapter(),
];

const plugins = [
  new PontemWallet(),
  new PetraWallet(),
];

const autoConnect = true;

export const App = () => (
    <HashRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/pontem-native" element={<PontemWalletComponent />} />
          <Route
            path="/hippo-adapter"
            element={<WalletProvider
                wallets={wallets}
                localStorageKey={localStorageKey}
                autoConnect={autoConnect}>
                <HippoPontemWallet autoConnect={autoConnect} />
              </WalletProvider>
            }
          />
          <Route path="/aptos-adapter" element={
            <AptosWalletAdapterProvider plugins={plugins} autoConnect={true}>
              <AptosPontemWallet />
            </AptosWalletAdapterProvider>
          }>
          </Route>
           <Route path="/widget" element={<Widget/>}/>
        </Routes>
      </div>
    </HashRouter>
);
