import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import appSlice from './app.slice';
import { authApi } from '@services/auth-service';
import authSlice from './auth.slice';

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
        [authApi.reducerPath]: authApi.reducer,
        router: routerReducer,
        auth: authSlice
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, authApi.middleware),
});



export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
