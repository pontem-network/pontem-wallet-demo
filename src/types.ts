export interface IPontemWalletProvider {
    version: string;
    connect(): Promise<string | undefined>;
    account(): Promise<string | undefined>;
    onChangeAccount(listener: (address: string | undefined) => void): () => void;
    signAndSubmit(payload: any, options?: any): Promise<any>;
}

export interface IWindow {
    pontem?: IPontemWalletProvider;
}

export type TAptosCreateTx = {
    sender: string;
    maxGasAmount: string;
    gasUnitPrice: string;
    expiration: string;
    payload: TAptosTxPayload;
};

type TxPayloadCallFunction = {
    type: 'entry_function_payload';
    function: string;
    typeArguments: string[];
    arguments: string[];
};

type TxPayloadInstallModule = {
    type: 'module_bundle_payload';
    modules: { bytecode: string }[];
};

export type TAptosTxPayload = TxPayloadCallFunction | TxPayloadInstallModule;