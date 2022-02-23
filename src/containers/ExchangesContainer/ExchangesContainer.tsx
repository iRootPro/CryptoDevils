import Exchanges from '../../components/Exchanges/Exchanges';
import Loader from '../../components/Loader/Loader';
import { useGetExchangesListQuery } from '../../services/api';
import { IExchanges } from '../../types/IExchangesList';
import krakenExchangeURL from '../../utils/krakenExchangeURL';

const ExchangesContainer = () => {
    let fullData: IExchanges[] = [];
    const responseOne = useGetExchangesListQuery({ perPage: 250, page: 1 });
    if (responseOne.data) fullData = [...responseOne.data];
    const responseTwo = useGetExchangesListQuery({ perPage: 250, page: 2 });
    if (responseTwo.data) fullData = [...fullData, ...responseTwo.data];

    if (responseTwo.isFetching || responseOne.isFetching) return <Loader />
    if (!fullData) return null;

    const data = fullData.map((exch) => exch.id === 'kraken' 
        ? {...exch, url: krakenExchangeURL}
        : exch
    );

    return <Exchanges data={data}/>;
}

export default ExchangesContainer;
