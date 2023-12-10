import { Dispatch } from "redux"
import { addPromptError, addPromptStart, addPromptSuccess } from "../actionCreators/addPromptActionCreators"
import api from "@/app/api/api"
import SecureEncryptor from "@/app/encryptor/encryptor"

export const addPrompt = (token: string, promptData: {platformUrl: string, title: string, prompt: string}, lockKey: string) => {
    return async (dispatch: Dispatch) => {
        try {
            addPromptStart();

            let encryptor = new SecureEncryptor(lockKey);
            promptData.title = encryptor.encrypt(promptData.title);
            promptData.prompt = encryptor.encrypt(promptData.prompt);

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