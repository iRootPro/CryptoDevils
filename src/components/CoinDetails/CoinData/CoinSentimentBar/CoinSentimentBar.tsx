/* eslint-disable react/jsx-no-useless-fragment */
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Card, Progress, Typography } from 'antd';
import { FC } from 'react';
import COLORS from '../../../../constants/colors';
import { formatSupply } from '../../../../utils/formatters';
import styles from './CoinSentimentBar.module.scss';

const { Text } = Typography;

type TcoinSentimentBar = {
    sentimentUp: number;
    sentimentDown: number;
};

const CoinSentimentBar: FC<TcoinSentimentBar> = ({
    sentimentUp,
    sentimentDown,
}) => (
    <>
        {Boolean(sentimentUp) && (
            <Card>
                <Progress
                    strokeColor={COLORS.green}
                    trailColor={COLORS.red}
                    strokeWidth={12}
                    showInfo={false}
                    strokeLinecap="square"
                    percent={sentimentUp}
                />
                <Text className={`${styles.progressTooltip} ${styles.tooltip}`}>
                    <div className={styles.emotionWrapper}>
                        {formatSupply(sentimentUp)}% Good
                        <LikeOutlined
                            className={`${styles.emotionTooltip} ${styles.tooltip}`}
                        />
                    </div>
                    <div className={styles.emotionWrapper}>
                        {formatSupply(sentimentDown)}% Bad
                        <DislikeOutlined
                            className={`${styles.emotionTooltip} ${styles.tooltip}`}
                        />
                    </div>
                </Text>
            </Card>
        )}
    </>
);

export default CoinSentimentBar;
