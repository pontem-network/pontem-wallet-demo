import React from "react";

export const Address = ({ address }: {address: string | undefined }) => {
    if (!address) return null;
    return (
        <div className='address'>
            <h6 className='address__title'>Address</h6>
            <div className='address__value'>{address}</div>
        </div>
    )
}