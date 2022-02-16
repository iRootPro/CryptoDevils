import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';
import { ICoinRaw } from '../types/ICoin';
import { ICoinList, ICoinListItem } from '../types/ICoinList';

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
            { currency: string; ids: string }
        >({
            query: ({ currency, ids }) =>
                createRequest(
                    `/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&per_page=250`,
                ),
        }),
        getCoinsList: builder.query<ICoinListItem[], string>({
            query: () => createRequest(`/coins/list`),
        }),
    }),
});

export const { useGetCoinsQuery, useGetCoinsByIdsQuery, useGetCoinsListQuery } =
    cryptoApi;
