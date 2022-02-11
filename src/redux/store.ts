import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/api';
import watchListReducer from './reducers/watchList';

const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    watchListReducer: watchListReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(cryptoApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
