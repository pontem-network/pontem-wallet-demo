import React, { SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { camel2title } from "../utils";

import "../styles.scss";
import {
  Wallet,
  WalletReadyState,
  isRedirectable,
} from "@aptos-labs/wallet-adapter-react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#b3a0fc",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface IBasicModal {
  isOpen: boolean;
  handleClose: () => void;
  adapters: Wallet[];
  handleAdapterClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

export const BasicModal = ({
  isOpen,
  handleClose,
  adapters = [],
  handleAdapterClick,
}: IBasicModal) => (
  <div>
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="modal__header">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Wallet
          </Typography>
          <button className={"modal__close"} onClick={handleClose}>
            X
          </button>
        </div>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {adapters.map((wallet) => {
            const isWalletReady =
              wallet.readyState === WalletReadyState.Installed ||
              wallet.readyState === WalletReadyState.Loadable;
            return !isWalletReady &&
              isRedirectable() &&
              !wallet.deeplinkProvider ? (
              <Button
                variant="text"
                className="modal__button"
                key={wallet.name}
                type="button"
                disabled={true}
                data-value={wallet.name}
              >
                <span className="modal__button__text">
                  {camel2title(wallet.name)} - Desktop Only
                </span>
              </Button>
            ) : (
              <Button
                variant="text"
                className="modal__button"
                onClick={handleAdapterClick}
                key={wallet.name}
                type="button"
                disabled={!isWalletReady}
                data-value={wallet.name}
              >
                <span className="modal__button__text">
                  {camel2title(wallet.name)}
                </span>
              </Button>
            );
          })}
        </Typography>
      </Box>
    </Modal>
  </div>
);
