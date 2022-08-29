import React, {useEffect, useCallback, useState, SyntheticEvent} from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { IWindow, TAptosCreateTx } from './types';
import { camelCaseKeysToUnderscore } from './utils';
import { Hint } from './Hint';
import { SendTransaction } from './SendTransaction';
import { Address } from './Address';
import { BasicModal } from './Modal';


export const HippoPontemWallet = () => {
    const {
        account,
        connected,
        wallets,
        wallet,
        connect,
        disconnect,
        signAndSubmitTransaction,
    } = useWallet();
    const [currentAdapterName, setAdapterName] = useState<string | undefined>(wallet?.adapter.name);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onModalClose = () => setIsModalOpen(false);
    const onModalOpen = () => setIsModalOpen(true);

    const adapters = wallets.map(wallet => wallet?.adapter.name);

    const handleSendTransaction = useCallback(async (tx: TAptosCreateTx) => {
        const payload = camelCaseKeysToUnderscore(tx.payload);

        try {
            const { hash } = await signAndSubmitTransaction(payload);
            return hash;
        } catch (e) {
            console.log(e)
        }
    }, [signAndSubmitTransaction]);

    const handleAdapterClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        const walletName = (event.target as HTMLButtonElement).value;
        // need to set currentAdapterName
        if (walletName) {
            setAdapterName(walletName);
            console.log('walletName', walletName);
            handleConnect(walletName);
            onModalClose();
        }
    };

    const handleConnect = useCallback(async (adapterName: string) => {
        if (adapterName) {
            console.log('currentAdapterName', adapterName);
            try {
                await connect(adapterName);
                localStorage.setItem(adapterName, 'connected');
            } catch (e) {
                console.log(e);
            }
        }
    }, [connect]);

    const handleDisconnect = async () => {
        try {
            await disconnect();
            if (currentAdapterName) {
                localStorage.setItem(currentAdapterName, 'disconnected');
            }
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
        if (currentAdapterName) {
            const status = localStorage.getItem(currentAdapterName);
            if (status === 'disconnected') {
                return;
            } else if (status === 'connected') {
                handleConnect(currentAdapterName);
            }
        }
    }, []);


    return (
        <div className="wallet">
            <BasicModal adapters={adapters} isOpen={isModalOpen} handleClose={onModalClose} handleAdapterClick={handleAdapterClick} />
            {connected
                ? <button className='w-button' onClick={handleDisconnect}>Disconnect wallet</button>
                : <button className='w-button' onClick={onModalOpen}>Connect wallet</button>
            }
            <Address address={account?.address} />
            {connected && <SendTransaction sender={account?.address} onSendTransaction={handleSendTransaction} />}
            {getHint()}
        </div>
    );
}
