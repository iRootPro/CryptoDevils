import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCoinByIdOHLC, TQueryOHLC } from "../types/ICoinByIdOHLC";
import { ICoinIdData, ICoinRaw } from '../types/ICoin';
import { ICoinListItem } from '../types/ICoinList';

const cryptoApiHeaders = {
    accept: 'application/json',
    'Access-Control-Allow-Origin': 'no-cors',
};

const baseUrl = 'https://api.coingecko.com/api/v3';

const createRequest = (url: string) => ({
    url,
    headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', 'no-cors');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCoins: builder.query<
            ICoinRaw[],
            { currency: string; perPage: number }
        >({
            query: ({ currency, perPage }) =>
                createRequest(
                    `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}`,
                ),
        }),
        getCoinsByIds: builder.query<
            ICoinRaw[],
            { currency: string; ids: string; perPage: number }
        >({
            query: ({ currency, ids, perPage }) => {
                return createRequest(
                    `/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&per_page=${perPage}`,
                );
            },
        }),
        getCoinsList: builder.query<ICoinListItem[], string>({
            query: () => createRequest(`/coins/list`),
        }),
        getCoinByIdOHLC: builder.query<TCoinByIdOHLC[], TQueryOHLC>({
            query: ({ id, days }) =>
                createRequest(`/coins/${id}/ohlc?vs_currency=usd&days=${days}`),
        }),
        getCoinById: builder.query<ICoinIdData, string>({
            query: (coinId) => createRequest(`/coins/${coinId}`),
          }),
    }),
});


export const { useGetCoinsQuery, useGetCoinsListQuery, useGetCoinByIdOHLCQuery, useGetCoinsByIdsQuery, useGetCoinByIdQuery } = cryptoApi;
