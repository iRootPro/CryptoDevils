import { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useGetCoinsByIdQuery } from "../../services/api";
import { ICoin } from "../../types/ICoin";
import WatchList from "./WatchList";

const fetchInterval = 5000;

const WatchListContainer: FC = () => {
    const watchList: string[] = useAppSelector(
        (state) => state.watchListReducer,
    ).data;

    const watchListString = watchList.join(',')

    console.log(watchListString);
    
    const { data, refetch } = useGetCoinsByIdQuery({currency: 'usd', ids: watchListString});

    useEffect(() => {
        const timer = setInterval(() => {
            refetch()
        }, fetchInterval)
        return () => clearInterval(timer);
    }, [])

    const dataCoins = data?.map((coin: ICoin) => ({
        coin,
        rank: coin.market_cap_rank,
        dailychange: coin.price_change_percentage_24h,
        key: coin.id,
        name: coin.name,
        price: coin.current_price,
        image: coin.image,
        marketcap: coin.market_cap,
    }));
    
    
    return (
        watchList.length === 0 ? <WatchList dataCoins={undefined}/> : <WatchList dataCoins={dataCoins}/>
    )
}

export default WatchListContainer