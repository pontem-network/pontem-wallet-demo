import React from "react";
import { MaybeHexString } from "aptos";

interface IAddressProps {
    address: string | MaybeHexString | undefined | null;
}

export const Address = ({ address }: IAddressProps) => {
    if (!address) return null;
    const stringAddress = address.toString();

    return (
        <div className='address'>
            <h6 className='address__title'>Address</h6>
            <div className='address__value'>{stringAddress}</div>
        </div>
    )
}