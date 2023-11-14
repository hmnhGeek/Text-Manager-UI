import { TitleActionsTypes, START_PLATFORM_SETTING_PROCESS_SUCCESS, START_PLATFORM_SETTING_PROCESS, FETCH_TITLES_FROM_PLATFORM, FETCH_TITLES_FROM_PLATFORM_SUCCESS, FETCH_TITLES_FROM_PLATFORM_ERROR } from "../constants/titlesConstants";
import { TitlesState, titlesInitialState } from "../initialStates/titlesInitialState";

const titlesReducer = (state: TitlesState = titlesInitialState, action: TitleActionsTypes): TitlesState => {
    switch(action.type) {
        case START_PLATFORM_SETTING_PROCESS:
            return { ...state, loading: true };
        case START_PLATFORM_SETTING_PROCESS_SUCCESS:
            return { ...state, platform: action.payload, loading: false };
        case FETCH_TITLES_FROM_PLATFORM:
            return { ...state, loading: true};
        case FETCH_TITLES_FROM_PLATFORM_SUCCESS:
            return { ...state, loading: false, titles: action.payload, error: null };
        case FETCH_TITLES_FROM_PLATFORM_ERROR:
            return { ...state, loading: false, error: action.payload, titles: [] };
        default:
            return state;
    }
}

export default titlesReducer;