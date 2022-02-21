import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetNews } from "../types/ICoin";

const apikey = 'pub_4739a11fceda7dd511ab2fba16dc1814ec92'
const baseUrl = `https://newsdata.io/api/1`;

const createRequest = (url: string) => ({
    url
});

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getNews: builder.query<IGetNews, string>({
            query: () => createRequest(`/news?apikey=${apikey}&q=crypto&category=business&language=en`),
        }),
    })
});



export const { useGetNewsQuery } = newsApi;
