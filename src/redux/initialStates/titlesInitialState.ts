export type TitlesType = {
    title: string,
    prompts: string[]
}

export interface TitlesState {
    platform: string | null;
    loading: boolean;
    titles: TitlesType[];
    error: string | null;
}

export const titlesInitialState: TitlesState = {
    platform: null,
    loading: false,
    titles: [],
    error: null
}