import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoinRaw } from '../types/ICoin';
import ICoinList from '../types/ICoinList';

const cryptoApiHeaders = {
    accept: 'application/json',
};

const baseUrl = 'https://api.coingecko.com/api/v3';

const createRequest = (url: string) => ({
    url,
    headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCoins: builder.query<ICoinRaw[], string>({
            query: (currency) =>
                createRequest(
                    `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250`,
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
        getCoinsList: builder.query<ICoinList[], string>({
            query: () => createRequest(`/coins/list`),
        }),
    }),
});

export const { useGetCoinsQuery, useGetCoinsByIdsQuery, useGetCoinsListQuery } =
    cryptoApi;
