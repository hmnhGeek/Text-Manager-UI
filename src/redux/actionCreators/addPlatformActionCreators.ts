import { ADD_PLATFORM, ADD_PLATFORM_ERROR, ADD_PLATFORM_SUCCESS } from "../constants/addPlatformConstants";
import { PlatformObjectType } from "../initialStates/addPlatformInitialState";

export const addPlatformStart = () => ({ type: ADD_PLATFORM });
export const addPlatfromSuccess = (response: PlatformObjectType) => ({ type: ADD_PLATFORM_SUCCESS, payload: response });
export const addPlatformError = (error: string) => ({ type: ADD_PLATFORM_ERROR, payload: error });