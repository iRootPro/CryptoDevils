import { FC } from 'react';
import { useGetCoinsQuery } from '../../services/api';
import { Cryptocurrencies } from '../../components/components';
import useDataCoins from '../../hooks/useDataCoins';
import CryptoNews from '../../components/CryptoNews/CryptoNews';

const CryptocurrenciesContainer: FC = () => {
    const { data, refetch } = useGetCoinsQuery({
        currency: 'usd',
        perPage: 250,
    });

    const dataCoins = useDataCoins(refetch, data);

    return (
        <>
            <CryptoNews />
            <Cryptocurrencies dataCoins={dataCoins} />
        </>
    );
};

export default CryptocurrenciesContainer;
