import { useState } from 'react';
import Exchanges from '../../components/Exchanges/Exchanges';
import Loader from '../../components/Loader/Loader';
import { useGetExchangesListQuery } from '../../services/api';
import { IExchanges } from '../../types/IExchangesList';

const ExchangesContainer = () => {
    let fullData: IExchanges[] = [];
    const responseOne = useGetExchangesListQuery({ per_page: 250, page: 1 });
    if (responseOne.data) fullData = [...responseOne.data];
    const responseTwo = useGetExchangesListQuery({ per_page: 250, page: 2 });
    if (responseTwo.data) fullData = [...fullData, ...responseTwo.data];

    if (responseTwo.isFetching || responseOne.isFetching) return <Loader />
    if (!fullData) return null;

    return <Exchanges data={fullData}/>
}

export default ExchangesContainer;
