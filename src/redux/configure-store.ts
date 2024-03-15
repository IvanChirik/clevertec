import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import appSlice from './app.slice';
import { authApi } from '@services/auth-service';
import authSlice from './auth.slice';
import { feedbackApi } from '@services/feedback-service';
import feedbackSlice from './feedback.slice.';
import trainingSlice from './training.slice';
import { trainingApi } from '@services/training-service';
import { catalogApi } from '@services/catalog-service';
import catalogsSlice from './catalogs.slice.';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({
    history: createBrowserHistory(),
});


export const store = configureStore({
    reducer: combineReducers({
        app: appSlice,
        router: routerReducer,
        auth: authSlice,
        feedback: feedbackSlice,
        training: trainingSlice,
        catalogs: catalogsSlice,
        [authApi.reducerPath]: authApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
        [catalogApi.reducerPath]: catalogApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(routerMiddleware,
            authApi.middleware,
            feedbackApi.middleware,
            trainingApi.middleware,
            catalogApi.middleware),
});



export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
