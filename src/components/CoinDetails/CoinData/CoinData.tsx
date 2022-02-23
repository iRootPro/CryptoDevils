import { Card, Col } from 'antd';
import { FC, useEffect } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import { ICoinIdData } from '../../../types/ICoin';
import CoinDataHeader from './CoinDataHeader/CoinDataHeader';
import CoinGlobalStats from './CoinGlobalStats/CoinGlobalStats';
import CoinProgressBar from './CoinProgressBar/CoinProgressBar';
import CoinSentimentBar from './CoinSentimentBar/CoinSentimentBar';

type TCoinInfoProps = {
    data: ICoinIdData;
    refetch: () => void;
};

const CoinData: FC<TCoinInfoProps> = ({ data, refetch }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            refetch();
        }, 30000);
        return () => clearInterval(timer);
    }, []);
    const { width } = useWindowDimensions()
    const sentimentUp = data.sentiment_votes_up_percentage;
    const sentimentDown = data.sentiment_votes_down_percentage;
    let height;
    if (width < 1431) {
        if (width < 991) {
            height = 'auto'
        } else {
            height = 950;
        }
    } else {
        height = 670;
    }
    return (
        <Col xs={24} lg={12}>
            <Card style={{ height, borderColor: 'transparent' }}>
                <CoinDataHeader data={data} />
                <CoinProgressBar data={data} />
                <CoinGlobalStats data={data} />
                <CoinSentimentBar
                    sentimentUp={sentimentUp}
                    sentimentDown={sentimentDown}
                />
            </Card>
        </Col>
    );
};

export default CoinData;
