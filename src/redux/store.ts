import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cryptoApi } from '../services/api';
import watchListReducer from './reducers/watchListSlice';
import portfoliosReducer from "./reducers/portfolioSlice";
import { ethereumApi } from '../services/ethereumApi';
import { newsApi } from '../services/newsApi';
import modalSelectedCoinsReducer from './reducers/modalSelectedCoinsSlice';
import watchListViewReducer from './reducers/watchListViewSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'cryptoApi',
        'ethereumApi',
        'newsApi',
        'modalSelectedCoinsReducer',
    ],
};

const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    watchListReducer,
    modalSelectedCoinsReducer,
    watchListViewReducer,
    [ethereumApi.reducerPath]: ethereumApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    portfolios: portfoliosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () =>
    configureStore({
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
            }).concat(
                cryptoApi.middleware,
                ethereumApi.middleware,
                newsApi.middleware,
            ),
    });

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
