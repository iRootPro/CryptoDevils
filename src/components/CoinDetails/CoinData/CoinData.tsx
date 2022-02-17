import { Card, Col } from 'antd'
import { FC, useEffect } from 'react'
import { ICoinIdData } from '../../../types/ICoin'
import CoinDataHeader from './CoinDataHeader/CoinDataHeader'
import CoinGlobalStats from './CoinGlobalStats/CoinGlobalStats'
import CoinProgressBar from './CoinProgressBar/CoinProgressBar'
import styles from './CoinData.module.scss'
import CoinSentimentBar from './CoinSentimentBar/CoinSentimentBar'

type TCoinInfoProps = {
    data: ICoinIdData;
    isFetching?: boolean;
    refetch: () => void
}


const CoinData: FC<TCoinInfoProps> = ({ data, refetch }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            refetch();
        }, 30000);
        return () => clearInterval(timer);
    }, []);
    const sentimentUp = data.sentiment_votes_up_percentage
    const sentimentDown = data.sentiment_votes_down_percentage
    return (
        <Col xs={24} sm={24} lg={12} >
            <Card className={`${styles.coinData} ${styles.data}`}>
                <CoinDataHeader data={data} />
                <CoinProgressBar data={data} />
                <CoinGlobalStats data={data} />
                <CoinSentimentBar sentimentUp={sentimentUp} sentimentDown={sentimentDown} />
            </Card>
        </Col>
    )
}

export default CoinData