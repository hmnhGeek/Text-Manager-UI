export interface TitlesState {
    platform: string | null;
    loading: boolean;
    titles: string[];
    error: string | null;
}

export const titlesInitialState: TitlesState = {
    platform: null,
    loading: false,
    titles: [],
    error: null
}