import { FETCH_AVAILABLE_PLATFORMS, FETCH_AVAILABLE_PLATFORMS_ERROR, FETCH_AVAILABLE_PLATFORMS_SUCCESS } from "../constants"

export const fetchAvailablePlatformsStart = () => ({ type: FETCH_AVAILABLE_PLATFORMS });
export const fetchAvailablePlatformsSuccess = (platforms: string[]) => ({ type: FETCH_AVAILABLE_PLATFORMS_SUCCESS, payload: platforms });
export const fetchAvailablePlatformsError = (error: string) => ({ type: FETCH_AVAILABLE_PLATFORMS_ERROR, payload: error });