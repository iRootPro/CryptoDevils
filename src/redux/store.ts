import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/api';
import watchListReducer from './reducers/watchList';
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

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cryptoApi'],
};

const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
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
            }).concat(cryptoApi.middleware),
    });
};

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
