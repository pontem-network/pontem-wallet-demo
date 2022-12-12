import React, {
  useEffect, useState, SyntheticEvent, useCallback,
} from 'react';
import { useWallet, WalletName } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { TAptosCreateTx } from './types';
import { camelCaseKeysToUnderscore } from './utils';
import {
  SendTransaction, Address, BasicModal, Hint,
} from './components';
import { localStorageKey } from './consts';
import { Loader } from './components/Loader';

export const HippoPontemWallet = ({ autoConnect }: { autoConnect: boolean }) => {
  const {
    account,
    connected,
    wallets,
    wallet,
    disconnect,
    select,
    signAndSubmitTransaction,
  } = useWallet();

  const [currentAdapterName, setAdapterName] = useState<string | undefined>(wallet?.adapter.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(account?.address);
  const [loading, setLoading] = useState(true);
  const onModalClose = () => setIsModalOpen(false);
  const onModalOpen = () => setIsModalOpen(true);

  const adapters = wallets.map((item) => ({
    name: item?.adapter.name,
    icon: item?.adapter.icon,
  }));

  const handleSendTransaction = async (tx: TAptosCreateTx) => {
    const payload = camelCaseKeysToUnderscore(tx.payload);
    const options = {
      max_gas_amount: tx?.maxGasAmount,
      gas_unit_price: tx?.gasUnitPrice,
      expiration_timestamp_secs: tx?.expiration,
    };
    try {
      const { hash } = await signAndSubmitTransaction(payload, options);
      return hash;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
    } catch (error) {
      console.log(error);
    } finally {
      setAdapterName(undefined);
    }
  }, [disconnect]);

  const handleAdapterClick = useCallback(async (event: SyntheticEvent<HTMLButtonElement>) => {
    const walletName = (event.currentTarget as HTMLButtonElement).getAttribute('data-value');
    try {
      if (walletName) {
        select(walletName as WalletName);
        setAdapterName(walletName);
        onModalClose();
      }
    } catch (error) {
      console.log(error);
    }
  }, [disconnect, select]);

  useEffect(() => {
    setCurrentAddress(account?.address);
  }, [account]);

  useEffect(() => {
    let alreadyConnectedWallet = localStorage.getItem(localStorageKey);
    if (alreadyConnectedWallet) {
      if (alreadyConnectedWallet.startsWith('"')) {
        alreadyConnectedWallet = JSON.parse(alreadyConnectedWallet) as string;
      }
      setAdapterName(alreadyConnectedWallet);
      if (autoConnect && currentAddress) setLoading(false);
    } else {
      setLoading(false);
    }
  }, [currentAddress]);

  if (loading) return <Loader />;

  return (
    <div className="wallet">
      {!connected && <button className='w-button' onClick={onModalOpen}>Connect wallet</button>}
      {connected && <button className='w-button' onClick={handleDisconnect}>Disconnect wallet</button>}

      <Address walletName={currentAdapterName} address={currentAddress} />

      {connected && (
        <SendTransaction sender={currentAddress} onSendTransaction={handleSendTransaction} />
      )}

      {!connected && <Hint hint={'connect wallet'}/>}

      <BasicModal
        adapters={adapters}
        isOpen={isModalOpen}
        handleClose={onModalClose}
        handleAdapterClick={handleAdapterClick}
      />
    </div>
  );
};
