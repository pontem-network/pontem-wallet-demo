import React, { useState } from 'react';

import './styles.scss';
import { TAptosCreateTx } from "./types";
import { MaybeHexString } from "aptos";

interface ISendTransaction {
    onSendTransaction: (tx: TAptosCreateTx) => Promise<any>;
    sender?: MaybeHexString | null;
}

export const SendTransaction = ({ onSendTransaction, sender }: ISendTransaction) => {
    const [transactionHash, setTransactionHash] = useState(null);
    const senderAddress = sender!.toString()

    const initialValue = {
        sender: senderAddress,
        gasUnitPrice: "1",
        maxGasAmount: "1000",
        expiration: new Date().getTime().toString(),
        payload: {
            arguments: [senderAddress, '1'],
            function: "0x1::coin::transfer",
            type: "entry_function_payload" as "entry_function_payload",
            typeArguments: [
                '0x1::aptos_coin::AptosCoin',
            ],
        }
    };
    const jsonPayload = JSON.stringify(initialValue, null, 2);

    const handleButton = () => {
        if (transactionHash) {
            setTransactionHash(null);
            return;
        }
        onSendTransaction(initialValue).then((hash) => {
            setTransactionHash(hash);
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className="send-transaction">
            <div className="divider"/>
            {!transactionHash
                ? <div className='codeBlock'>
                    <pre className='code'>
                      {jsonPayload}
                    </pre>
                </div>
                : <div className='send-transaction__hash'>
                    <h5 className='send-transaction__title'>Success! Transaction hash:</h5>
                    {transactionHash}
                </div>
            }
            <div className="divider"/>
            <button className="w-button send-transaction__button" onClick={handleButton}>{!transactionHash ? 'Send' : 'Back'}</button>
        </div>
    )
};