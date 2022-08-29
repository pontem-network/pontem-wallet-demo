import React, { useEffect, useCallback } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { IWindow, TAptosCreateTx } from './types';
import { camelCaseKeysToUnderscore } from './utils';
import { Hint } from './Hint';
import { SendTransaction } from './SendTransaction';
import { Address } from './Address';


const WALLET_NAME = 'PontemWallet';

export const HippoPontemWallet = () => {
    const {
        account,
        connected,
        connect,
        disconnect,
        signAndSubmitTransaction,
    } = useWallet();

    const handleSendTransaction = useCallback(async (tx: TAptosCreateTx) => {
        const payload = camelCaseKeysToUnderscore(tx.payload);

        try {
            const { hash } = await signAndSubmitTransaction(payload);
            return hash;
        } catch (e) {
            console.log(e)
        }
    }, [signAndSubmitTransaction]);

    const handleConnect = useCallback(async () => {
        try {
            await connect(WALLET_NAME);
            localStorage.setItem('hippoPontemWallet', 'connected');
        } catch (e) {
            console.log(e);
        }

    }, [connect]);

    const handleDisconnect = async () => {
        try {
            await disconnect();
            localStorage.setItem('hippoPontemWallet', 'disconnected');
        } catch (e) {
            console.log(e)
        }
    }

    const getHint = () => {
        if (!connected && (window as IWindow).pontem === undefined) {
            return <Hint hint={'download extension'}/>
        }
        if (!connected && (window as IWindow).pontem !== undefined) {
            return <Hint hint={'connect wallet'}/>
        }

        return null;
    };

    useEffect(() => {
        const status = localStorage.getItem('hippoPontemWallet');
        if (status === 'disconnected') {
            return;
        } else if (status === 'connected') {
            handleConnect();
        }
    }, []);


    return (
        <div className="wallet">
            {connected
                ? <button className='w-button' onClick={handleDisconnect}>Disconnect wallet</button>
                : <button className='w-button' onClick={handleConnect}>Connect wallet</button>
            }
            <Address address={account?.address} />
            {connected && <SendTransaction sender={account?.address} onSendTransaction={handleSendTransaction} />}
            {getHint()}
        </div>
    );
}