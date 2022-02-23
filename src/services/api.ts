import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TCoinByIdOHLC, TQueryOHLC } from '../types/ICoinByIdOHLC';
import { ICoinIdData, ICoinRaw, IGlobalStats } from '../types/ICoin';
import { ICoinMarketChartById } from '../types/ICoinMarketChartById';
import { IExchanges, IExchangesListRequest } from '../types/IExchangesList';
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
            { currency: string; ids: string; perPage?: number }
        >({
            query: ({ currency, ids, perPage }) =>
                createRequest(
                    `/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&per_page=${perPage}`,
                ),
        }),
        getCoinsList: builder.query<ICoinListItem[], string>({
            query: () => createRequest('/coins/list'),
        }),
        getCoinByIdOHLC: builder.query<TCoinByIdOHLC[], TQueryOHLC>({
            query: ({ id, days }) =>
                createRequest(`/coins/${id}/ohlc?vs_currency=usd&days=${days}`),
        }),
        getCoinById: builder.query<ICoinIdData, string>({
            query: (coinId) => createRequest(`/coins/${coinId}?tickers=false&community_data=false&developer_data=false`),
        }),
        getCoinMarketChartById: builder.query<ICoinMarketChartById, string>({
            query: (coinId) =>
                createRequest(
                    `/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`,
                ),
        }),
        getGlobalStats: builder.query<IGlobalStats, string>({
            query: () => createRequest(`/global`),
        }),
        getExchangesList: builder.query<IExchanges[], IExchangesListRequest>({
            query: ({ perPage, page }) => createRequest(`exchanges?per_page=${perPage}&page=${page}`),
        }),
    }),
});

export const {
    useGetCoinsQuery,
    useGetCoinsListQuery,
    useGetCoinByIdOHLCQuery,
    useGetCoinsByIdsQuery,
    useGetCoinByIdQuery,
    useGetCoinMarketChartByIdQuery,
    useGetGlobalStatsQuery,
    useGetExchangesListQuery,
} = cryptoApi;
