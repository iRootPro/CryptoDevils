import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetEthereumData } from "../types/ICoin";

const baseUrl = 'https://www.etherchain.org/api';

const createRequest = (url: string) => ({
    url
});

export const ethereumApi = createApi({
    reducerPath: 'ethereumApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getEthereum: builder.query<IGetEthereumData, string>({
            query: () => createRequest(`/gasPriceOracle`),
        }),
    })
});



export const { useGetEthereumQuery } = ethereumApi;
