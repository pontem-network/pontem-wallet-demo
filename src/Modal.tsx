import React, {MouseEventHandler, SyntheticEvent, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IBasicModal {
    isOpen: boolean;
    handleClose: () => void;
    adapters: string[];
    handleAdapterClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

export const BasicModal = ({ isOpen, handleClose, adapters, handleAdapterClick }: IBasicModal) => {

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Wallet
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {adapters.map((adapter, index) => <button onClick={handleAdapterClick} key={index} type='button' className='wallet-item' value={adapter}>{adapter}</button>)}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
