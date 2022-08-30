import React, {useEffect, useState, SyntheticEvent, useCallback} from 'react';
import {useWallet, WalletName} from '@manahippo/aptos-wallet-adapter';

import './styles.scss';
import { TAptosCreateTx } from './types';
import { camelCaseKeysToUnderscore } from './utils';
import { SendTransaction } from './SendTransaction';
import { Address } from './Address';
import { BasicModal } from './Modal';
import { localStorageKey } from "./App";


export const HippoPontemWallet = () => {
    const {
        account,
        connected,
        wallets,
        wallet,
        connect,
        select,
        signAndSubmitTransaction,
    } = useWallet();

    const [currentAdapterName, setAdapterName] = useState<string | undefined>(wallet?.adapter.name);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(account?.address);

    const onModalClose = () => setIsModalOpen(false);
    const onModalOpen = () => setIsModalOpen(true);

    const adapters = wallets.map(wallet => ({
        name: wallet?.adapter.name,
        icon: wallet?.adapter.icon,
    }));

    const handleSendTransaction = async (tx: TAptosCreateTx) => {
        const payload = camelCaseKeysToUnderscore(tx.payload);
        try {
            const { hash } = await signAndSubmitTransaction(payload);
            return hash;
        } catch (e) {
            console.log(e)
        }
    };

    const handleAdapterClick = (event: SyntheticEvent<HTMLButtonElement>) => {
        const walletName = (event.currentTarget as HTMLButtonElement).getAttribute('data-value');

        if (walletName) {
            setAdapterName(walletName);
            handleConnect(walletName);
            select(walletName as WalletName);
            onModalClose();
        }
    };

    const handleConnect = useCallback(async (adapterName: string) => {
        if (adapterName) {
            try {
                return await connect(adapterName);
            } catch (e) {
                console.log(e);
            }
        }
    }, [connect]);


    useEffect(() => {
        setCurrentAddress(account?.address);
    }, [account]);

    useEffect(() => {
        let alreadyConnectedWallet = localStorage.getItem(localStorageKey);
        if (alreadyConnectedWallet) {
            if (alreadyConnectedWallet.startsWith('"')) {
                alreadyConnectedWallet = alreadyConnectedWallet.replace(/^"(.*)"$/, '$1');
            }
            handleConnect(alreadyConnectedWallet);
            setAdapterName(alreadyConnectedWallet);
        }
    }, [])

    return (
        <div className="wallet">
            {<button className='w-button' onClick={onModalOpen}>Connect wallet</button>}

            <Address walletName={currentAdapterName} address={currentAddress} />

            {connected && <SendTransaction sender={currentAddress} onSendTransaction={handleSendTransaction} />}

            <BasicModal
                adapters={adapters}
                isOpen={isModalOpen}
                handleClose={onModalClose}
                handleAdapterClick={handleAdapterClick}
            />
        </div>
    );
}
