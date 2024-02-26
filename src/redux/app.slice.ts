import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IInitialAppState {
    collapsed: boolean;
    isLoading: boolean;
}

const initialAppState: IInitialAppState = {
    collapsed: false,
    isLoading: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;