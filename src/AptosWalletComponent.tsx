import React, {
  useEffect, useState, SyntheticEvent, useCallback,
} from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletName } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { TAptosCreateTx } from './types';
import { camelCaseKeysToUnderscore } from './utils';
import {
  SendTransaction, Address, Hint, BasicModal,
} from './components';
import { localStorageKey } from './consts';

export function AptosPontemWallet() {
  const {
    account,
    connected,
    wallets,
    wallet,
    network,
    connect,
    disconnect,
    signAndSubmitTransaction,
  } = useWallet();

  const [currentAdapterName, setAdapterName] = useState<string | undefined>(wallet?.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(account?.address);

  const onModalClose = () => setIsModalOpen(false);
  const onModalOpen = () => setIsModalOpen(true);

  const adapters = wallets.map((item) => ({
    name: item?.name,
    icon: item?.icon,
  }));

  // eslint-disable-next-line consistent-return
  const handleSendTransaction = async (tx: TAptosCreateTx) => {
    const payload = camelCaseKeysToUnderscore(tx.payload);
    try {
      const response = await signAndSubmitTransaction(payload);
      return response.hash;
    } catch (e) {
      console.log(e);
    }
  };

  const handleConnect = useCallback(async (adapterName: string) => {
    if (adapterName) {
      try {
        await connect(adapterName as WalletName);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }, [connect]);

  const handleAdapterClick = useCallback(async (event: SyntheticEvent<HTMLButtonElement>) => {
    const walletName = (event.currentTarget as HTMLButtonElement).getAttribute('data-value');

    try {
      if (walletName && currentAdapterName !== walletName) {
        setAdapterName(walletName);
        await handleConnect(walletName);
        onModalClose();
      }
    } catch (e) {
      console.log(e);
    }
  }, [ currentAdapterName, handleConnect]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      // eslint-disable-next-line no-empty
    } catch (_e) {}

    setAdapterName(undefined);
  }, [disconnect]);

  useEffect(() => {
    setCurrentAddress(account?.address);
  }, [account]);

  // check if localStorage has info about already connected wallet on first render
  useEffect(() => {
    let alreadyConnectedWallet = localStorage.getItem(localStorageKey);
    if (alreadyConnectedWallet) {
      if (alreadyConnectedWallet.startsWith('"')) {
        alreadyConnectedWallet = JSON.parse(alreadyConnectedWallet) as string;
      }
      setAdapterName(alreadyConnectedWallet);
      handleConnect(alreadyConnectedWallet);
    }
  }, []);

  return (
    <div className="wallet">
      {!connected && <button className="w-button" onClick={onModalOpen} type="button">Connect wallet</button>}
      {connected && <button className="w-button" onClick={handleDisconnect} type="button">Disconnect wallet</button>}

      <Address walletName={currentAdapterName} address={currentAddress} />
      { account?.publicKey && (<div> publicKey: {account?.publicKey}</div>) }
      { network?.name && (<div>network: {network?.name}</div>) }


      {connected && (
        <SendTransaction
          sender={currentAddress}
          onSendTransaction={handleSendTransaction}
        />
      )}

      {!connected && <Hint hint="connect wallet" />}

      <BasicModal
        adapters={adapters}
        isOpen={isModalOpen}
        handleClose={onModalClose}
        handleAdapterClick={handleAdapterClick}
      />
    </div>
  );
}
