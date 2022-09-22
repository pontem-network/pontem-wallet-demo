import React, { useEffect, useState, useCallback } from 'react';

import './styles.scss';
import { IPontemWalletProvider, IWindow, TAptosCreateTx } from './types';
import { camelCaseKeysToUnderscore, detectPontemProvider } from './utils';
import { Hint, SendTransaction, Address } from './components';

export const PontemWallet = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | undefined>('');
  const [walletProvider, setWalletProvider] = useState<IPontemWalletProvider | undefined>();

  const handleAddressChange = useCallback((currentAddress: string | undefined) => {
    if (typeof address === 'string' && currentAddress) {
      if (currentAddress !== address) {
        setAddress(currentAddress);
      }
    }
  }, [address]);

  const handleSendTransaction = useCallback(async (tx: TAptosCreateTx) => {
    const payload = camelCaseKeysToUnderscore(tx.payload);
    const options = {
      max_gas_amount: tx?.maxGasAmount,
      gas_unit_price: tx?.gasUnitPrice,
      expiration_timestamp_secs: tx?.expiration,
    };

    try {
      const response = await walletProvider?.signAndSubmit(payload, options);
      if (response?.result.hash) {
        return response.result.hash;
      }
    } catch (error) {
      console.log(error);
    }
  }, [walletProvider]);

  const handleConnect = async () => {
    const getPontemProvider = async () => {
      try {
        const provider = await detectPontemProvider({ timeout: 100 });
        if (!provider) {
          setWalletProvider(undefined);
          setConnected(false);
          return;
        }
        setWalletProvider(provider);
        return provider;
      } catch (e) {
        console.log(e);
      }
    };

    try {
      const provider = await getPontemProvider();
      const response = await provider?.connect();
      if (response?.address) {
        setAddress(response.address);
        setConnected(true);
        provider?.onChangeAccount(handleAddressChange);
        localStorage.setItem('pontemWallet', 'connected');
      }
    } catch (e) {
      setAddress('');
      setConnected(false);
      console.log(e);
    }
  };

  const handleDisconnect = async () => {
    setAddress(undefined);
    setConnected(false);
    await walletProvider?.disconnect();
    setWalletProvider(undefined);
    localStorage.setItem('pontemWallet', 'disconnected');
  };

  const getHint = () => {
    if (!connected && (window as IWindow).pontem === undefined) {
      return <Hint hint={'download extension'}/>;
    }
    if (!connected && (window as IWindow).pontem !== undefined) {
      return <Hint hint={'connect wallet'}/>;
    }

    return null;
  };

  useEffect(() => {
    const status = localStorage.getItem('pontemWallet');
    if (status === 'connected') handleConnect();
  }, []);
  return (
    <div className="wallet">
      {connected
        ? <button className='w-button' onClick={handleDisconnect}>Disconnect wallet</button>
        : <button className='w-button' onClick={handleConnect}>Connect wallet</button>
      }

      <Address address={address} walletName='Pontem Wallet' />

      {connected && (
        <SendTransaction sender={address} onSendTransaction={handleSendTransaction} />
      )}

      {getHint()}
    </div>
  );
};
