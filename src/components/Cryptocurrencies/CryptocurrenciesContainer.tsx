import { FC, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useGetCoinsQuery } from "../../services/api";
import {ICoin} from "../../types/ICoin";
import Cryptocurrencies from "./Cryptocurrencies";

const fetchInterval = 5000;

const CryptocurrenciesContainer: FC = () => {
    const { data, refetch } = useGetCoinsQuery('usd')
    
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
        marketcap: coin.market_cap
    }))

    console.log(dataCoins);

    return (
        <Cryptocurrencies dataCoins={dataCoins}/>
    )
}

export default CryptocurrenciesContainer