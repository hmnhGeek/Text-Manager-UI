import { Dispatch } from "redux";
import { fetchTitlesFromPlatformError, fetchTitlesFromPlatformStart, fetchTitlesFromPlatformSuccess, setPlatformForPromptsLoadingStart } from "../actionCreators/titlesActionCreator"
import api from "@/app/api/api";
import SecureEncryptor from "@/app/encryptor/encryptor";
import { TitlesType } from "../initialStates/titlesInitialState";

export const setPlatformForPromptsLoading = (platform: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setPlatformForPromptsLoadingStart(platform));
    }
}

export const fetchTitlesFromPlatform = (token: string, platform: string, unlockKey: string) => {
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

            // define a secure encryptor instance to decrypt.
            let encryptor = new SecureEncryptor(unlockKey.toString());
            let decryptedData = fetchedTitles.map((o: TitlesType) => {
                return {
                    title: encryptor.decrypt(o.title),
                    prompts: o.prompts.map((p: string) => encryptor.decrypt(p))
                };
            });

            dispatch(fetchTitlesFromPlatformSuccess(decryptedData));
        }
        catch (error: any) {
            dispatch(fetchTitlesFromPlatformError(error.response.data.detail));
        }
    }
}