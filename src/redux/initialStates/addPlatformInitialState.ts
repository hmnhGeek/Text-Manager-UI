export type PlatformObjectType = {
    platformUrl: string,
    title: string,
    prompts: string[]
};

export interface AddPlatfromState {
    loading: boolean,
    error: string | null,
    response: PlatformObjectType | null
}

export const addPlatformInitialState: AddPlatfromState = {
    loading: false,
    error: null,
    response: null
}