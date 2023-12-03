export type PlatformObjectType = {
    platformUrl: string,
    title: string,
    prompts: string[]
};

export interface AddPlatfromState {
    loading: boolean,
    error: string | null,
    response: PlatformObjectType | null,
    reloadPlatformsPageToggleFlag: boolean,
    reloadTitlesPageToggleFlag: boolean,
}

export const addPlatformInitialState: AddPlatfromState = {
    loading: false,
    error: null,
    response: null,
    reloadPlatformsPageToggleFlag: false,
    reloadTitlesPageToggleFlag: false,
}