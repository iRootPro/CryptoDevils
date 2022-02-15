import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/api";
import portfoliosReducer from "./reducers/portfolioSlice";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    portfolios: portfoliosReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(cryptoApi.middleware)
});
