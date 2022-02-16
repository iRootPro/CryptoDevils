import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ICoin from "../types/ICoin";
import ICoinList from "../types/ICoinList";
import { TCoinByIdOHLC, TQueryOHLC } from "../types/ICoinByIdOHLC";

const cryptoApiHeaders = {
  accept: "application/json",
};

const baseUrl = "https://api.coingecko.com/api/v3";

const createRequest = (url: string) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query<ICoin[], string>({
      query: (currency) => createRequest(`/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250`),
    }),
    getCoinsList: builder.query<ICoinList[], string>({
      query: () => createRequest(`/coins/list`),
    }),
    getCoinByIdOHLC: builder.query<TCoinByIdOHLC[], TQueryOHLC>({
      query: ({ id, days }) => createRequest(`/coins/${id}/ohlc?vs_currency=usd&days=${days}`),
    }),
  }),
});
export const { useGetCoinsQuery, useGetCoinsListQuery, useGetCoinByIdOHLCQuery } = cryptoApi;
