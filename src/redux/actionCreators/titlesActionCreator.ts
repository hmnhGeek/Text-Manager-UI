import { FETCH_TITLES_FROM_PLATFORM, FETCH_TITLES_FROM_PLATFORM_ERROR, FETCH_TITLES_FROM_PLATFORM_SUCCESS, START_PLATFORM_SETTING_PROCESS_SUCCESS } from "../constants/titlesConstants";
import { TitlesType } from "../initialStates/titlesInitialState";

export const setPlatformForPromptsLoadingStart = (platform: string | null) => ({ type: START_PLATFORM_SETTING_PROCESS_SUCCESS, payload: platform });

export const fetchTitlesFromPlatformStart = () => ({ type: FETCH_TITLES_FROM_PLATFORM });
export const fetchTitlesFromPlatformSuccess = (titles: TitlesType[]) => ({ type: FETCH_TITLES_FROM_PLATFORM_SUCCESS, payload: titles });
export const fetchTitlesFromPlatformError = (error: string) => ({ type: FETCH_TITLES_FROM_PLATFORM_ERROR, payload: error });