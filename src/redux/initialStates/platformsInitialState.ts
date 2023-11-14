export interface PlatformsState {
    loading: boolean;
    error: string | null;
    platforms: string[]
}

export const platformsInitialState: PlatformsState = {
    loading: false,
    error: null,
    platforms: []
}