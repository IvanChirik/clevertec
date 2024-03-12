import { TrainingData } from "@src/types/training.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type InitialTrainingState = {
    trainigList: TrainingData[];
}

const initialTrainingState: InitialTrainingState = {
    trainigList: [],
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState: initialTrainingState,
    reducers: {
        setTraining: (state, action: PayloadAction<TrainingData[]>) => {
            state.trainigList = action.payload;
        },
    },
});

export const trainingActions = trainingSlice.actions;
export default trainingSlice.reducer;