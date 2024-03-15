import { TrainingData } from "@src/types/training.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Moment } from "moment";
import { BlockContent } from "@components/Input/CalendarInputBlock/CalendarInputBlock.props";


type SelectedDateData = {
    date?: Moment;
    trainingType?: string;
    exercises: BlockContent[]
}

type InitialTrainingState = {
    trainigList: TrainingData[];
    selectedDate: SelectedDateData
}

const initialTrainingState: InitialTrainingState = {
    trainigList: [],
    selectedDate: {
        exercises: []
    }
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState: initialTrainingState,
    reducers: {
        setTraining: (state, action: PayloadAction<TrainingData[]>) => {
            state.trainigList = action.payload;
        },
        setSelectedDate: (state, action: PayloadAction<Moment>) => {
            state.selectedDate.date = action.payload;
        },
        setSelectedTraining: (state, action: PayloadAction<string>) => {
            state.selectedDate.trainingType = action.payload;
        },
        setSelectedExercises: (state, action: PayloadAction<BlockContent[]>) => {
            state.selectedDate.exercises = action.payload;
        },
        clearSelectedDate: (state) => {
            state.selectedDate = {
                exercises: []
            }
        },
    },
});

export const trainingActions = trainingSlice.actions;
export default trainingSlice.reducer;