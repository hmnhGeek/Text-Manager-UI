import { Dispatch } from "redux";
import { setEncryptionKeyStart, setEncryptionKeySuccess } from "../actionCreators/encryptionActionCreators";

export const setEncryptionKey = (key: string | null) => {
    return (dispatch: Dispatch) => {
        dispatch(setEncryptionKeyStart());
        dispatch(setEncryptionKeySuccess(key));
    }
}