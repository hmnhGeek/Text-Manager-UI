import { EncryptionActionTypes, SET_ENCRYPTION_KEY, SET_ENCRYPTION_KEY_SUCCESS } from "../constants/encryptionConstants";
import { EncryptionState, encryptionInitialState } from "../initialStates/encryptionInitialState";

const encryptionReducer = (state: EncryptionState = encryptionInitialState, action: EncryptionActionTypes): EncryptionState => {
    switch(action.type) {
        case SET_ENCRYPTION_KEY:
            return { ...state, key: null };
        case SET_ENCRYPTION_KEY_SUCCESS:
            return { ...state, key: action.payload };
        default:
            return state;
    }
}

export default encryptionReducer;