import { useEffect, useMemo } from 'react';

import { ICoinRaw, ICoinsNormalized, ICoinsResponse } from '../types/ICoin';

type IUseDataCoins = (
    refetch: () => void,
    data: ICoinsResponse,
) => ICoinsNormalized;

const fetchInterval = 10000;

const useDataCoins: IUseDataCoins = (refetch, data = []) => {
    useEffect(() => {
        const timer = setInterval(() => {
            refetch();
        }, fetchInterval);
        return () => clearInterval(timer);
    }, []);

    const dataCoins: ICoinsNormalized = useMemo(
        () =>
            data?.map((coin: ICoinRaw) => ({
                id: coin.id,
                rank: coin.market_cap_rank,
                dailychange: coin.price_change_percentage_24h,
                key: coin.id,
                name: coin.name,
                price: coin.current_price,
                image: coin.image,
                marketcap: coin.market_cap,
                symbol: coin.symbol,
            })),
        [data],
    );

    return dataCoins;
};

export default useDataCoins;
