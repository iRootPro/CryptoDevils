import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Typography } from 'antd';
import { FC } from 'react';
import { COLORS } from '../../../constants/colors';
import { ICoin } from '../../../types/ICoin';
import {
    formatPercent,
    formatUSD,
    formatUSDforTable,
} from '../../../utils/formatters';
import CoinCard from '../../CoinCard/CoinCard';

import styles from './WatchListCardItem.module.scss';

const { Paragraph } = Typography;

const WatchListCardItem: FC<ICoin> = ({
    id,
    symbol,
    rank,
    dailychange,
    name,
    price,
    image,
    marketcap,
}) => {
    return (
        <Card hoverable className={styles.card}>
            <Button type='ghost' className={`${styles.close} ${styles.btn}`}>
                <CloseOutlined />
            </Button>

            <CoinCard
                type='watch-list-card-view'
                name={name}
                id={id}
                symbol={symbol}
                image={image}
                rank={rank}
            />

            <Paragraph className={`${styles.price} ${styles.fake}`}>
                Price: {formatUSDforTable(price)}
            </Paragraph>
            <Paragraph
                className={`${styles.dailychange} ${styles.fake}`}
                style={{
                    color: dailychange > 0 ? COLORS.green : COLORS.red,
                }}>
                24h change: {formatPercent(dailychange / 100)}
            </Paragraph>
            <Paragraph className={`${styles.marketcap} ${styles.fake}`}>
                Marketcap: {formatUSD(marketcap)}
            </Paragraph>
        </Card>
    );
};

export { WatchListCardItem };
