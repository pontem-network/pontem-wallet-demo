import React, { useLayoutEffect, useState } from 'react';
import { loadWidget } from '@pontem/liquidswap-widget';

export const Widget = () => {
  const [dataNetwork, setDataNetwork] = useState({ name: 'mainnet', chainId: '1' });
  const [dataAccount, setDataAccount] = useState('0x019b68599dd727829dfc5036dec02464abeacdf76e5d17ce43352533b1b212b8');

  useLayoutEffect(() => {
    loadWidget('liquidswap-widget');
  }, []);

  const toggleNetwork = () => {
    if (dataNetwork.chainId === '1') {
      setDataNetwork({ name: 'testnet', chainId: '2' });
    } else {
      setDataNetwork({ name: 'mainnet', chainId: '1' });
    }
  };

  const toggleAccount = () => {
    if (dataAccount === '0x019b68599dd727829dfc5036dec02464abeacdf76e5d17ce43352533b1b212b8') {
      setDataAccount('0x15fd61229f6e12b51adbff45b7b74310c7eaf9c24ef8c13b653c8f2a07bc1d14');
    } else {
      setDataAccount('0x019b68599dd727829dfc5036dec02464abeacdf76e5d17ce43352533b1b212b8');
    }
  };

  return (
    <div className="widgetWrapper">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <button onClick={toggleNetwork}>toggle network</button>
      <button onClick={toggleAccount}>toggle account</button>

      <br />
      <liquidswap-widget data-network={JSON.stringify(dataNetwork)} data-account={dataAccount}/>
    </div>
  );
};
