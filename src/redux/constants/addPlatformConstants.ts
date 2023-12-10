import { PlatformObjectType } from "../initialStates/addPlatformInitialState";

export const ADD_PLATFORM = 'ADD_PLATFORM';
export const ADD_PLATFORM_SUCCESS = 'ADD_PLATFORM_SUCCESS';
export const ADD_PLATFORM_ERROR = 'ADD_PLATFORM_ERROR';
export const RELOAD_PLATFORMS_PAGE = 'RELOAD_PLATFORMS_PAGE';
export const RELOAD_TITLES_PAGE = 'RELOAD_TITLES_PAGE';

export type AddPlatformAction = { type: typeof ADD_PLATFORM };
export type AddPlatformSuccessAction = { type: typeof ADD_PLATFORM_SUCCESS, payload: PlatformObjectType };
export type AddPlatformErrorAction = { type: typeof ADD_PLATFORM_ERROR, payload: string };
export type ReloadPlatformsPageAction = { type: typeof RELOAD_PLATFORMS_PAGE };
export type ReloadTitlesPageAction = { type: typeof RELOAD_TITLES_PAGE };

export type AddPlatformActionsTypes = 
    | AddPlatformAction
    | AddPlatformSuccessAction
    | AddPlatformErrorAction
    | ReloadPlatformsPageAction
    | ReloadTitlesPageAction;