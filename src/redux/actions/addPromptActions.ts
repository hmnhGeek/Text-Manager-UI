import { Dispatch } from "redux"
import { addPromptError, addPromptStart, addPromptSuccess } from "../actionCreators/addPromptActionCreators"
import api from "@/app/api/api"

export const addPrompt = (token: string, promptData: {platformUrl: string, title: string, prompt: string}) => {
    return async (dispatch: Dispatch) => {
        try {
            addPromptStart();

            const headers = {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }

            const response = await api.post(`/prompt_manager/add_prompt_to_object`, promptData, {headers});
            dispatch(addPromptSuccess(response.data));
        }
        catch  (error: any) {
            dispatch(addPromptError(error));
        }
    }
}