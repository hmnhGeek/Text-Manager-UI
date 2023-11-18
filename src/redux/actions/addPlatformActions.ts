import { Dispatch } from "redux";
import { addPlatformError, addPlatformStart, addPlatfromSuccess } from "../actionCreators/addPlatformActionCreators";
import api from "@/app/api/api";

export const addPlatform = (token: string, platformData: {platformName: string, title: string}) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(addPlatformStart());

            const payload = {
                platformUrl: platformData.platformName,
                title: platformData.title,
                prompts: []
            };

            const headers = {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
            const response = await api.post(`/prompt_manager/add_new_prompt_object`, payload, {headers})
            dispatch(addPlatfromSuccess(response.data));
        }
        catch (error: any) {
            dispatch(addPlatformError(error.response.data.detail));
        }
    }
}