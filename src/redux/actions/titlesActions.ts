import { Dispatch } from "redux";
import { fetchTitlesFromPlatformError, fetchTitlesFromPlatformStart, fetchTitlesFromPlatformSuccess, setPlatformForPromptsLoadingStart } from "../actionCreators/titlesActionCreator"
import api from "@/app/api/api";

export const setPlatformForPromptsLoading = (platform: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setPlatformForPromptsLoadingStart(platform));
    }
}

export const fetchTitlesFromPlatform = (token: string, platform: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchTitlesFromPlatformStart());

            const response = await api.get(`/prompt_manager/get_prompts_from_platform_url?platform_url=${platform}`, {
                headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            });
            
            let fetchedTitles = response.data.map((r: any) => ({title: r.title, prompts: r.prompts}));
            dispatch(fetchTitlesFromPlatformSuccess(fetchedTitles));
        }
        catch (error: any) {
            dispatch(fetchTitlesFromPlatformError(error.response.data.detail));
        }
    }
}