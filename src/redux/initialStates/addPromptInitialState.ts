export type PromptObjectResponseType = {
    message: string,
    statusCode: number
};

export interface AddPromptState {
    loading: boolean,
    error: PromptObjectResponseType | null,
    response: PromptObjectResponseType | null,
    reloadTitlesPageToggleFlag: boolean,
};

export const addPromptInitialState: AddPromptState = {
    loading: false,
    error: null,
    response: null,
    reloadTitlesPageToggleFlag: false
};