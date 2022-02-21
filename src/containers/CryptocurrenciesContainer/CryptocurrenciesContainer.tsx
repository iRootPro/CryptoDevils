import {FC} from 'react';
import {useGetCoinsQuery} from '../../services/api';
import {Cryptocurrencies} from '../../components/components';
import {useDataCoins} from '../../hooks/useDataCoins';

const CryptocurrenciesContainer: FC = () => {
    const {data, refetch} = useGetCoinsQuery({
        currency: 'usd',
        perPage: 250,
    });

    const dataCoins = useDataCoins(data, refetch);

    return <Cryptocurrencies dataCoins={dataCoins}/>;
};

export default CryptocurrenciesContainer;
