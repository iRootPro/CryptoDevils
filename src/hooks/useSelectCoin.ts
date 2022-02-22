import { useMemo, useState } from 'react';
import { selectWatchList } from '../redux/selectors/watchListSelectors';
import { ICoin, ICoinCard, ICoinWL } from '../types/ICoin';
import { useAppSelector } from './redux';

type IuseSelectCoin = {
    selectedCoinsIds: string[];
    selectedCoins: ICoinCard[];
    addCoin: (coin: ICoinCard) => void;
    removeCoin: (coin: ICoinCard) => void;
    prepareCoin: (coin: ICoin | ICoinCard) => {
        name: string;
        id: string;
        image: string;
        symbol: string;
    };
};

const useSelectCoin = (): IuseSelectCoin => {
    const watchList: ICoinWL[] = useAppSelector(selectWatchList);

    const watchListTagCard: ICoinCard[] = useMemo(
        () =>
            watchList.map((item) => ({
                name: item.name,
                id: item.id,
                image: item.image,
                symbol: item.symbol,
                type: 'watchlist-modal-tag',
            })),
        [watchList],
    );

    const [selectedCoins, setSelectedCoins] =
        useState<ICoinCard[]>(watchListTagCard);
    const [selectedCoinsIds, setSelectedCoinsIds] = useState<string[]>(
        selectedCoins.map((item) => item.id),
    );

    const addCoin = (coin: ICoinCard) => {
        setSelectedCoins([...selectedCoins, coin]);
        setSelectedCoinsIds([...selectedCoinsIds, coin.id]);
    };

    const removeCoin = (coin: ICoinCard) => {
        const arrayWithoutCoin = selectedCoins.filter(
            (item) => item.id !== coin.id,
        );
        setSelectedCoins(arrayWithoutCoin);
        const arrayWithoutCoinIds = arrayWithoutCoin.map((coin) => coin.id);
        setSelectedCoinsIds(arrayWithoutCoinIds);
    };

    const prepareCoin = (coin: ICoin | ICoinCard) => ({
        name: coin.name,
        id: coin.id,
        image: coin.image,
        symbol: coin.symbol,
    });

    return {
        selectedCoinsIds,
        selectedCoins,
        addCoin,
        removeCoin,
        prepareCoin,
    };
};

export default useSelectCoin;
