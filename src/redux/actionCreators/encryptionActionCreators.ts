import { SET_ENCRYPTION_KEY, SET_ENCRYPTION_KEY_SUCCESS } from "../constants/encryptionConstants";

export const setEncryptionKeyStart = () => ({ type: SET_ENCRYPTION_KEY });
export const setEncryptionKeySuccess = (key: string | null) => ({ type: SET_ENCRYPTION_KEY_SUCCESS, payload: key });