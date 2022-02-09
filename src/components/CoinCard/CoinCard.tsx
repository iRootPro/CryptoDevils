import React, { FC } from 'react'
import ICoin from '../../types/ICoin'

interface CoinCardProps {
  coin: ICoin
}

const CoinCard: FC<CoinCardProps> = ({ coin }) => {
  return (
    <div>
      <img src={coin.image.small} />
      <h1>{coin.id}</h1>
      <p>{coin.market_data.current_price.rub} / {coin.market_data.current_price.usd}</p>
    </div>
  )
}

export default CoinCard