export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface PlatformsState {
    loading: boolean;
    error: string | null;
    platforms: string[]
}
  
export const authInitialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const platformsInitialState: PlatformsState = {
    loading: false,
    error: null,
    platforms: []
}