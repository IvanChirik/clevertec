import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TrainingList } from "@src/types/catalog.types";


type InitialCatalogsState = {
    catalogTrainigList: TrainingList[];
}

const initialCatalogState: InitialCatalogsState = {
    catalogTrainigList: [],
};

export const catalogsSlice = createSlice({
    name: 'catalogs',
    initialState: initialCatalogState,
    reducers: {
        setTrainingList: (state, action: PayloadAction<TrainingList[]>) => {
            state.catalogTrainigList = action.payload;
        },
    },
});

export const catalogsActions = catalogsSlice.actions;
export default catalogsSlice.reducer;