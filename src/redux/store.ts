import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/api';
import watchListReducer from './reducers/watchListSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ethereumApi } from '../services/ethereumApi';
import { newsApi } from '../services/newsApi';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cryptoApi', 'ethereumApi', 'newsApi'],
};

const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [ethereumApi.reducerPath]: ethereumApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    watchListReducer: watchListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(cryptoApi.middleware, ethereumApi.middleware, newsApi.middleware),
    });
};

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
