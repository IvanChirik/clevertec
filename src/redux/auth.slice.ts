import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialAuthState {
    confirmEmail: string;
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
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;