import React, { useEffect, useState, useCallback } from 'react';

import './styles.scss';
import { PontemWalletProvider, Window, AptosCreateTx } from './types';
import { camelCaseKeysToUnderscore, detectPontemProvider } from './utils';
import { Hint } from './Hint';
import { SendTransaction } from './SendTransaction';
import { Address } from './Address';


function App() {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState<string | undefined>('');
    const [walletProvider, setWalletProvider] = useState<PontemWalletProvider | undefined>(undefined);

    const handleAddressChange = (currentAddress: string | any) => {
        if (typeof address === 'string' && currentAddress){
            if (currentAddress !== address) {
                setAddress(currentAddress);
            }
            setConnected(true);
        } else {
            setAddress(undefined);
            setConnected(false);
        }
    }

    const handleSendTransaction = useCallback(async (tx: AptosCreateTx) => {
        const payload = camelCaseKeysToUnderscore(tx.payload);
        const options = {
            max_gas_amount: tx?.maxGasAmount,
            gas_unit_price: tx?.gasUnitPrice,
            expiration_timestamp_secs: tx?.expiration,
        };

        return walletProvider?.signAndSubmit(payload, options)
            .then((response: any) => {
                return response.result.hash;
            });
    }, [walletProvider]);

    const handleConnect = useCallback(() => {
        detectPontemProvider({timeout: 100}).then(async (walletProvider) => {
            if (!walletProvider) {
                setWalletProvider(undefined);
                setConnected(false);
                return;
            }

            setWalletProvider(walletProvider);

            walletProvider.connect().then(address => {
                if (address) {
                    setAddress(address);
                    setConnected(true);
                }
            });

            walletProvider.onChangeAccount(handleAddressChange);

            localStorage.setItem('pontemWallet', 'connected');
        })
    }, []);

    const handleDisconnect = () => {
        setAddress(undefined);
        setConnected(false);
        setWalletProvider(undefined);
        localStorage.setItem('pontemWallet', 'disconnected');
    }

    const getHint = () => {
        if (!connected && (window as Window).pontem === undefined) {
            return <Hint hint={'download extension'}/>
        }
        if (!connected && (window as Window).pontem !== undefined) {
            return <Hint hint={'connect wallet'}/>
        }

        return null;
    };

    useEffect(() => {
        const status = localStorage.getItem('pontemWallet');
        if (status === 'disconnected') {
            return;
        } else if (status === 'connected') {
            handleConnect();
        }
    }, [handleConnect]);


    return (
    <div className="app">
        <div className="wallet">
            {connected
                ? <button className='w-button' onClick={handleDisconnect}>Disconnect wallet</button>
                : <button className='w-button' onClick={handleConnect}>Connect wallet</button>
            }
            <Address address={address} />
            {connected && <SendTransaction sender={address} onSendTransaction={handleSendTransaction} />}
            {getHint()}
        </div>
    </div>
    );
}

export default App;
