import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialAuthState {
    registrationData?: {
        email: string,
        password: string
    };
    confirmEmail: string;
    accessToken?: string
}


const initialAuthState: IInitialAuthState = {
    confirmEmail: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setConfirmEmail: (state, action: PayloadAction<string>) => {
            state.confirmEmail = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRegistrationData: (state, action: PayloadAction<{ email: string, password: string }>) => {
            state.registrationData = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;