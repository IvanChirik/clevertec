import { TrainingData, TrainingName } from "@src/types/training.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Moment } from "moment";
import { BlockContent } from "@components/Input/CalendarInputBlock/CalendarInputBlock.props";


type SelectedDateData = {
    date?: Moment;
    trainingType?: TrainingName;
    exercises: BlockContent[];
}

type InitialTrainingState = {
    trainigList: TrainingData[];
    selectedDate: SelectedDateData;
    errorModalVisible: boolean;
}

const initialTrainingState: InitialTrainingState = {
    trainigList: [],
    selectedDate: {
        exercises: []
    },
    errorModalVisible: false
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
        setSelectedTraining: (state, action: PayloadAction<TrainingName | undefined>) => {
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
        setErrorModalVisible: (state, action: PayloadAction<boolean>) => {
            state.errorModalVisible = action.payload;
        },
    },
});

export const trainingActions = trainingSlice.actions;
export default trainingSlice.reducer;