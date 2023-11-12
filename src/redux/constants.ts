export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FETCH_AVAILABLE_PLATFORMS = 'FETCH_AVAILABLE_PLATFORMS';
export const FETCH_AVAILABLE_PLATFORMS_SUCCESS = 'FETCH_AVAILABLE_PLATFORMS_SUCCESS';
export const FETCH_AVAILABLE_PLATFORMS_ERROR = 'FETCH_AVAILABLE_PLATFORMS_ERROR';

// Define the action types for authentication
export type LoginStartAction = { type: typeof LOGIN_START };
export type LoginSuccessAction = { type: typeof LOGIN_SUCCESS, payload: string }; // assuming payload is a string (token)
export type LoginFailureAction = { type: typeof LOGIN_FAILURE, payload: string };

export type LogoutStartAction = { type: typeof LOGOUT_START };
export type LogoutSuccessAction = { type: typeof LOGOUT_SUCCESS };
export type LogoutFailureAction = { type: typeof LOGOUT_FAILURE, payload: string };

// Define the action types for authentication
export type FetchAvailablePlatformsAction = { type: typeof FETCH_AVAILABLE_PLATFORMS };
export type FetchAvailablePlatformsSuccessAction = { type: typeof FETCH_AVAILABLE_PLATFORMS_SUCCESS, payload: string[] };
export type FetchAvailablePlatformsErrorAction = { type: typeof FETCH_AVAILABLE_PLATFORMS_ERROR, payload: string };

// Union type for all authentication action types
export type AuthActionTypes =
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutStartAction
  | LogoutSuccessAction
  | LogoutFailureAction;

export type PlatfromsActionsTypes = 
  | FetchAvailablePlatformsAction
  | FetchAvailablePlatformsSuccessAction
  | FetchAvailablePlatformsErrorAction;