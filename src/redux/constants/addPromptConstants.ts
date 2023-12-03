import { PromptObjectResponseType } from "../initialStates/addPromptInitialState";

export const ADD_PROMPT = 'ADD_PROMPT';
export const ADD_PROMPT_SUCCESS = 'ADD_PROMPT_SUCCESS';
export const ADD_PROMPT_ERROR = 'ADD_PROMPT_ERROR';

export type AddPromptAction = { type: typeof ADD_PROMPT };
export type AddPromptSuccessAction = { type: typeof ADD_PROMPT_SUCCESS, payload: PromptObjectResponseType };
export type AddPromptErrorAction = { type: typeof ADD_PROMPT_ERROR, payload: PromptObjectResponseType };

export type AddPromptActionTypes = 
    | AddPromptAction
    | AddPromptSuccessAction
    | AddPromptErrorAction;