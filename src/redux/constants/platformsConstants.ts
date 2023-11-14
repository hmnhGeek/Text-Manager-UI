export const FETCH_AVAILABLE_PLATFORMS = 'FETCH_AVAILABLE_PLATFORMS';
export const FETCH_AVAILABLE_PLATFORMS_SUCCESS = 'FETCH_AVAILABLE_PLATFORMS_SUCCESS';
export const FETCH_AVAILABLE_PLATFORMS_ERROR = 'FETCH_AVAILABLE_PLATFORMS_ERROR';

export type FetchAvailablePlatformsAction = { type: typeof FETCH_AVAILABLE_PLATFORMS };
export type FetchAvailablePlatformsSuccessAction = { type: typeof FETCH_AVAILABLE_PLATFORMS_SUCCESS, payload: string[] };
export type FetchAvailablePlatformsErrorAction = { type: typeof FETCH_AVAILABLE_PLATFORMS_ERROR, payload: string };

export type PlatfromsActionsTypes = 
  | FetchAvailablePlatformsAction
  | FetchAvailablePlatformsSuccessAction
  | FetchAvailablePlatformsErrorAction;