import { Col, Row } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import ICoin from '../../types/ICoin'

interface CoinCardProps {
  coin: ICoin
}

const CoinCard: FC<CoinCardProps> = ({ coin }) => {
  return (
    <>
    <Row>
      <Col>
      <Link to={`coin/${coin.id}`}>
      </Link>
      </Col>
    </Row>
    <div>
      <img src={coin.image.small} />
      <h1>{coin.id}</h1>
      <p>{coin.market_data.current_price.rub} / {coin.market_data.current_price.usd}</p>
    </div>
    </>
  )
}

export default CoinCard