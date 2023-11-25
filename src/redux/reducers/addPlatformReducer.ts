import { ADD_PLATFORM, ADD_PLATFORM_ERROR, ADD_PLATFORM_SUCCESS, AddPlatformActionsTypes, RELOAD_PLATFORMS_PAGE } from "../constants/addPlatformConstants";
import { AddPlatfromState, addPlatformInitialState } from "../initialStates/addPlatformInitialState";

const addPlatformReducer = (state: AddPlatfromState = addPlatformInitialState, action: AddPlatformActionsTypes) => {
    switch (action.type) {
        case ADD_PLATFORM:
            return { ...state, loading: true, response: null, error: null };
        case ADD_PLATFORM_SUCCESS:
            return { ...state, loading: false, response: action.payload, error: null };
        case ADD_PLATFORM_ERROR:
            return { ...state, loading: false, response: null, error: action.payload };
        case RELOAD_PLATFORMS_PAGE:
            return { ...state, loading: false, response: null, error: null, reloadPlatformsPageToggleFlag: !state.reloadPlatformsPageToggleFlag };
        default:
            return state;
    }
}

export default addPlatformReducer;