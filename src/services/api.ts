import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoin } from '../types/ICoin';

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
        getCoins: builder.query<ICoin[], string>({
            query: (currency) =>
                createRequest(
                    `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250`,
                ),
        }),
    }),
});

export const { useGetCoinsQuery } = cryptoApi;
