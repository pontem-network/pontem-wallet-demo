import React, { SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { camel2title } from "../utils";

import '../styles.scss';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#b3a0fc',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface IBasicModal {
    isOpen: boolean;
    handleClose: () => void;
    adapters: { name: string, icon: string }[];
    handleAdapterClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

export const BasicModal = ({ isOpen, handleClose, adapters = [], handleAdapterClick }: IBasicModal) => {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal__header'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Select Wallet
                        </Typography>
                        <button className={'modal__close'} onClick={handleClose}>X</button>
                    </div>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {adapters.map(({ name, icon }, index) => (
                            <Button variant='text' className='modal__button' onClick={handleAdapterClick} key={name} type='button' data-value={name}>
                                <span className='modal__button__text'>{camel2title(name)}</span>
                            </Button>
                        ))}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
