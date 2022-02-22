import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {cryptoApi} from '../services/api';
import watchListReducer from './reducers/watchListSlice';
import modalSelectedCoinsReducer from './reducers/modalSelectedCoinsSlice';
import watchListViewReducer from './reducers/watchListViewSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cryptoApi', 'modalSelectedCoinsReducer'],
};

const rootReducer = combineReducers({
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    watchListReducer,
    modalSelectedCoinsReducer,
    watchListViewReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
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

export const store = setupStore();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
