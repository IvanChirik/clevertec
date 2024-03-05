import { IFeedbackResponseData } from "@interfaces/feedback.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IInitialFeedbackState {
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
            console.log(state.feedbacks)
        },
    },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;