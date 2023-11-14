export const START_PLATFORM_SETTING_PROCESS = 'START_PLATFORM_SETTING_PROCESS';
export const START_PLATFORM_SETTING_PROCESS_SUCCESS = 'START_PLATFORM_SETTING_PROCESS_SUCCESS';

export const FETCH_TITLES_FROM_PLATFORM = 'FETCH_TITLES_FROM_PLATFORM';
export const FETCH_TITLES_FROM_PLATFORM_SUCCESS = 'FETCH_TITLES_FROM_PLATFORM_SUCCESS';
export const FETCH_TITLES_FROM_PLATFORM_ERROR = 'FETCH_TITLES_FROM_PLATFORM_ERROR'

export type StartPlatformSettingProcessAction = { type: typeof START_PLATFORM_SETTING_PROCESS };
export type StartPlatformSettingProcessActionSuccessAction = { type: typeof START_PLATFORM_SETTING_PROCESS_SUCCESS, payload: string };

export type FetchTitlesFromPlatformAction = { type: typeof FETCH_TITLES_FROM_PLATFORM };
export type FetchTitlesFromPlatformSuccessAction = { type: typeof FETCH_TITLES_FROM_PLATFORM_SUCCESS, payload: string[] };
export type FetchTitlesFromPlatformErrorAction = { type: typeof FETCH_TITLES_FROM_PLATFORM_ERROR, payload: string };

export type TitleActionsTypes = 
    | StartPlatformSettingProcessAction
    | StartPlatformSettingProcessActionSuccessAction
    | FetchTitlesFromPlatformAction
    | FetchTitlesFromPlatformSuccessAction
    | FetchTitlesFromPlatformErrorAction;