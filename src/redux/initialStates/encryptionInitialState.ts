export interface EncryptionState {
    key: string | null;
}

export const encryptionInitialState: EncryptionState = {
    key: null,
}