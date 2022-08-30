import React, { useEffect, useState, SyntheticEvent } from 'react';
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
        const walletName = (event.target as HTMLButtonElement).textContent;
        console.log(walletName);

        if (walletName) {
            setAdapterName(walletName);
            handleConnect(walletName);
            onModalClose();
        }
    };

    const handleConnect = async (adapterName: string) => {
        if (adapterName) {
            try {
                await connect(adapterName);
            } catch (e) {
                console.log(e);
            }
        }
    };

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
        setCurrentAddress(account?.address);
    }, [account]);

    return (
        <div className="wallet">
            <BasicModal adapters={adapters} isOpen={isModalOpen} handleClose={onModalClose} handleAdapterClick={handleAdapterClick} />
            {!connected && <button className='w-button' onClick={onModalOpen}>Connect wallet</button>}
            <Address walletName={currentAdapterName} address={currentAddress} />
            {connected && <SendTransaction sender={currentAddress} onSendTransaction={handleSendTransaction} />}
            {getHint()}
        </div>
    );
}
