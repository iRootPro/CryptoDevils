import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Typography } from 'antd';
import { FC, useLayoutEffect, useState } from 'react';
import COLORS from '../../../constants/colors';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { removeCoinFromWatchList } from '../../../redux/reducers/watchListSlice';
import { selectWatchListIds } from '../../../redux/selectors/watchListSelectors';
import { ICoin, ICoinWL } from '../../../types/ICoin';
import {
    formatPercent,
    formatUSD,
    formatUSDforTable,
} from '../../../utils/formatters';
import CoinCard from '../../CoinCard/CoinCard';

import styles from './WatchListCardItem.module.scss';

const { Paragraph } = Typography;

const HoverLoading: FC = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
    return (
        <div className={styles.hover}>
            <Spin indicator={antIcon} />
        </div>
    );
};

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
    const [isCardLoading, setIsCardLoading] = useState(false);

    const watchListIds: string[] = useAppSelector(selectWatchListIds);
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const findedElem = watchListIds.find(
            (watchListID) => watchListID === id,
        );
        if (findedElem) {
            setIsCardLoading(false);
        }
    }, []);

    const handleClose = () => {
        setIsCardLoading(true);
        const coin: ICoinWL = {
            name,
            id,
            image,
            symbol,
        };

        dispatch(removeCoinFromWatchList(coin));
    };

    return (
        <Card hoverable className={styles.card} bodyStyle={{ width: '100%' }}>
            {isCardLoading ? <HoverLoading /> : null}

            <Button
                onClick={handleClose}
                type="ghost"
                className={`${styles.close} ${styles.btn}`}
            >
                <CloseOutlined />
            </Button>

            <CoinCard
                type="watch-list-card-view"
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
                }}
            >
                24h change: {formatPercent(dailychange / 100)}
            </Paragraph>
            <Paragraph className={`${styles.marketcap} ${styles.fake}`}>
                Marketcap: {formatUSD(marketcap)}
            </Paragraph>
        </Card>
    );
};

export default WatchListCardItem;
