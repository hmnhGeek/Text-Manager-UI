import { PlatformsState, platformsInitialState } from "../initialStates/platformsInitialState";
import { PlatfromsActionsTypes, FETCH_AVAILABLE_PLATFORMS, FETCH_AVAILABLE_PLATFORMS_SUCCESS, FETCH_AVAILABLE_PLATFORMS_ERROR } from "../constants/platformsConstants";

const platformsReducer = (state: PlatformsState = platformsInitialState, action: PlatfromsActionsTypes) => {
    switch(action.type) {
        case FETCH_AVAILABLE_PLATFORMS:
            return { ...state, loading: true, platforms: [], error: null };
        case FETCH_AVAILABLE_PLATFORMS_SUCCESS:
            return { ...state, loading: false, platforms: action.payload, error: null };
        case FETCH_AVAILABLE_PLATFORMS_ERROR:
            return { ...state, loading: false, platforms: [], error: action.payload };
        
        default:
            return state;
    }
}

export default platformsReducer;