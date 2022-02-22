import { useState } from 'react';
import useListDataCoins from './useListDataCoins';
import {
    useGetCoinsByIdsQuery,
    useGetCoinsListQuery,
    useGetCoinsQuery,
} from '../services/api';
import { ICoinList, ICoinListWL } from '../types/ICoinList';

const useModalCoinList = () => {
    const coinList = useGetCoinsListQuery('').data;
    const [searchedCoinsIds, setSearchedCoinsIds] = useState<
        string[] | undefined
    >([]);
    let dataCoins: ICoinListWL;

    if (searchedCoinsIds?.length) {
        const ids = searchedCoinsIds.join(',');
        const { data } = useGetCoinsByIdsQuery({
            currency: 'usd',
            ids,
        });
        dataCoins = useListDataCoins(data);
    } else {
        const { data } = useGetCoinsQuery({ currency: 'usd', perPage: 50 });
        dataCoins = useListDataCoins(data);
    }

    const parseCoinList = (searchTerm: string) =>
        coinList?.filter(
            (coin) =>
                coin.name.toLowerCase().replace(/\s/g, '').indexOf(searchTerm) >
                -1,
        );

    const getCoinsIds = (coinListProps: ICoinList) =>
        coinListProps?.map((item) => item.id);

    return {
        getCoinsIds,
        parseCoinList,
        dataCoins,
        setSearchedCoinsIds,
        searchedCoinsIds,
    };
};

export default useModalCoinList;
