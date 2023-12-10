export const SET_ENCRYPTION_KEY = 'SET_ENCRYPTION_KEY';
export const SET_ENCRYPTION_KEY_SUCCESS = 'SET_ENCRYPTION_KEY_SUCCESS';

export type SetEncryptionKeyAction = { type: typeof SET_ENCRYPTION_KEY };
export type SetEncryptionKeySuccessAction = { type: typeof SET_ENCRYPTION_KEY_SUCCESS, payload: string };

export type EncryptionActionTypes = 
    | SetEncryptionKeyAction
    | SetEncryptionKeySuccessAction;