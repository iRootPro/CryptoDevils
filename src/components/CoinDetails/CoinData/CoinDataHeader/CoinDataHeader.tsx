import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd'
import { FC } from 'react'
import { ICoinIdData } from '../../../../types/ICoin';
import { formatDate, formatName, formatPercent, formatSymbol, formatUSD } from '../../../../utils/formatters'
import styles from './CoinDataHeader.module.scss';
import CoinPrice from './CoinPrice/CoinPrice';

const { Text, Title } = Typography

type TCoinDataHeaderProps = {
    data: ICoinIdData;
}

const CoinDataHeader: FC<TCoinDataHeaderProps> = ({ data }) => {
    const coinName = data.name
    const coinSymbol = data.symbol
    const currentPrice = data.market_data.current_price.usd;
    const ath = data.market_data.ath.usd;
    const athChangePercent = data.market_data.ath_change_percentage.usd;
    const athDate = data.market_data.ath_date.usd;
    const priceChange24h = data.market_data.price_change_percentage_24h_in_currency.usd;
    const currentPriceBTC = data.market_data.current_price.btc;
    const priceChange24hBTC = data.market_data.price_change_percentage_24h_in_currency.btc;
    const currentPriceETH = data.market_data.current_price.eth;
    const priceChange24hETH = data.market_data.price_change_percentage_24h_in_currency.eth;
    return (
        <>
            <div className={styles.header}>
                <div>
                    <Text className={`${styles.coinName} ${styles.name}`}>{formatName(coinName)} price</Text>
                    <Text className={`${styles.coinSymbol} ${styles.symbol}`}>({formatSymbol(coinSymbol)})</Text>
                </div>
                <Card className={`${styles.historyCard} ${styles.card}`}>
                    <Text className={`${styles.coinName} ${styles.title}`}>All time high:</Text>
                    <Text className={`${styles.historyTitle} ${styles.title}`}>
                        {formatUSD(ath)}
                    </Text>
                    <div className={styles.athStat}>
                        <Text className={`${styles.highestPercentage} ${styles.percentage}`}>
                            {formatPercent(athChangePercent / 100)}
                        </Text>
                        <Text className={`${styles.historyDate} ${styles.date}`}>{formatDate(athDate)}</Text>
                    </div>
                </Card>
            </div>
            <div className={styles.priceDynamic}>
                <Title className={`${styles.currentPrice} ${styles.price}`} level={2}>
                    {formatUSD(currentPrice)}
                </Title>
                {priceChange24h ?
                    <Text className={`${styles.dailyChangePrice} ${priceChange24h > 0 ? styles.green : styles.red}`}>
                        {priceChange24h > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        {formatPercent(priceChange24h / 100)}
                    </Text>
                    : <Text className={`${styles.dailyChangePrice} ${styles.gray}`}>0%</Text>
                }
            </div>
            <CoinPrice currentCoinPrice={currentPriceBTC} coinName={'BTC'} priceChange={priceChange24hBTC} />
            <CoinPrice currentCoinPrice={currentPriceETH} coinName={'ETH'} priceChange={priceChange24hETH} />
        </>
    )
}

export default CoinDataHeader
