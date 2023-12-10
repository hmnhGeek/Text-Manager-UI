import { ADD_PROMPT, ADD_PROMPT_ERROR, ADD_PROMPT_SUCCESS, AddPromptActionTypes } from "../constants/addPromptConstants";
import { AddPromptState, addPromptInitialState } from "../initialStates/addPromptInitialState";

const addPromptReducer = (state: AddPromptState = addPromptInitialState, action: AddPromptActionTypes) => {
    switch(action.type) {
        case ADD_PROMPT:
            return { ...state, loading: true, response: null, error: null, reloadTitlesPageToggleFlag: false };
        case ADD_PROMPT_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null, reloadTitlesPageToggleFlag: !state.reloadTitlesPageToggleFlag };
        case ADD_PROMPT_ERROR:
            return { ...state, loading: false, response: null, error: action.payload };
        default:
            return state;
    }
}

export default addPromptReducer;