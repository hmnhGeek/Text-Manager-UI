import { ADD_PROMPT, ADD_PROMPT_ERROR, ADD_PROMPT_SUCCESS } from "../constants/addPromptConstants";
import { PromptObjectResponseType } from "../initialStates/addPromptInitialState";

export const addPromptStart = () => ({ type: ADD_PROMPT });
export const addPromptSuccess = (response: PromptObjectResponseType) => ({ type: ADD_PROMPT_SUCCESS, payload: response });
export const addPromptError = (error: PromptObjectResponseType) => ({ type: ADD_PROMPT_ERROR, payload: error });