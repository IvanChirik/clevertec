import { IFeedbackResponseData } from "../types/feedback.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type IInitialFeedbackState = {
    feedbacks: IFeedbackResponseData[];
}

const initialFeedbackState: IInitialFeedbackState = {
    feedbacks: [],
};

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: initialFeedbackState,
    reducers: {
        setFeedbacks: (state, action: PayloadAction<IFeedbackResponseData[]>) => {
            state.feedbacks = action.payload;
        },
    },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;