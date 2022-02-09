import React, { FC } from 'react'
import { useGetCoinsQuery } from '../../services/api'
import Loader from '../Loader/Loader'
import CoinCard from '../CoinCard/CoinCard'

const Cryptocurrencies: FC = () => {
    const { data, isFetching } = useGetCoinsQuery('')
    if (isFetching) return <Loader />
    console.log(data?.[0])
    return (
        <div>
            {data?.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
            ))}
        </div>
    )
}

export default Cryptocurrencies