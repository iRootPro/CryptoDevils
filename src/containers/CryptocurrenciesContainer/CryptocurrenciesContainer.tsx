import { FC } from "react";
import { useGetCoinsQuery } from "../../services/api";
import { Cryptocurrencies } from "../../components/components";
import { useDataCoins } from "../../hooks/useDataCoins";

const CryptocurrenciesContainer: FC = () => {
    const { data, refetch } = useGetCoinsQuery('usd')
    
    const dataCoins = useDataCoins(data, refetch)

    // console.log('update container component');
    
    return <Cryptocurrencies dataCoins={dataCoins}/>
}

export default CryptocurrenciesContainer
