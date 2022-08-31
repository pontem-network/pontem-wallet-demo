import React from 'react';
import { MaybeHexString } from 'aptos';
import { camel2title } from '../utils';

interface IAddressProps {
  address: string | MaybeHexString | undefined | null;
  walletName?: string;
}

export const Address = ({ address, walletName }: IAddressProps) => {
  if (!address) return null;
  const stringAddress = address.toString();
  const normalizedWalletName = walletName ? camel2title(walletName) : '';

  return (
        <div className='address'>
            <h6 className='address__title'>{`${normalizedWalletName} Address`}</h6>
            <div className='address__value'>{stringAddress}</div>
        </div>
  );
};
