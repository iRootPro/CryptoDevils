import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ICoin from "../types/ICoin";

const cryptoApiHeaders = {
  accept: "application/json",
};

const cryptoApiParams = {
  null: null,
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
      query: () => createRequest(`/coins`),
    }),
  }),
});
export const { useGetCoinsQuery } = cryptoApi;
