import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    value: AuthState
};

type AuthState = {
    isAuthenticated: boolean,
    username: string
};

const initialState = {
    value: {
        isAuthenticated: false,
        username: ""
    } as AuthState
} as InitialState;

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => initialState,
        logInSuccess: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuthenticated: true,
                    username: action.payload
                }
            }
        }
    }
});

export const {logInSuccess, logOut} = auth.actions;
export default auth.reducer;