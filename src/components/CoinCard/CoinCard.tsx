import { CheckOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToModalSelectedCoins,
    removeCoinFromModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';
import { selectModalSelectedCoinsIds } from '../../redux/selectors/modalSelectedCoinsSelectors';
import { ICoinCard, ICoinWL } from '../../types/ICoin';
import { isOverflownWidth } from '../../utils/isOverflownWidth';
import styles from './CoinCard.module.scss';

const { Text } = Typography;

const CoinCard: FC<ICoinCard> = ({ id, image, name, symbol, type, rank }) => {
    const [showSelect, setShowSelect] = useState(false);

    const selectedCoinsIds = useAppSelector(selectModalSelectedCoinsIds);
    const dispatch = useAppDispatch();

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        selectedCoinsIds.length
            ? setShowSelect(selectedCoinsIds.includes(id))
            : setShowSelect(false);
    }, [selectedCoinsIds]);

    const handleOnClick = () => {
        setShowSelect(!showSelect);

        const coin: ICoinWL = {
            id,
            image,
            name,
            symbol,
        };

        if (showSelect) dispatch(removeCoinFromModalSelectedCoins(coin));
        else dispatch(addCoinToModalSelectedCoins(coin));
    };

    if (type === 'cryptocurrencies')
        return (
            <Link to={`${ROUTES.coin}/${id}`} className={styles.link}>
                <div className={styles.wrapper}>
                    <Avatar
                        src={`${image}`}
                        className={`${styles.image} ${styles.fix}`}
                    />
                    <Avatar src={`${image}`} className={styles.image} />
                    <Text className={styles.name}>{name}</Text>
                    <Text className={styles.symbol}>{symbol}</Text>
                </div>
            </Link>
        );
    else if (type === 'watchlist-modal-list')
        return (
            <div
                className={`${styles.wrapper} ${styles.modalList}`}
                onClick={handleOnClick}>
                <div className={styles.centerContent}>
                    <Avatar
                        src={`${image}`}
                        className={`${styles.image} ${styles.fix}`}
                    />
                    <Text className={styles.name}>{name}</Text>
                    <Text className={styles.symbol}>{symbol}</Text>
                </div>
                {showSelect ? <Check /> : null}
            </div>
        );
    else if (type === 'watchlist-modal-tag')
        return (
            <div className={styles.wrapper}>
                <Avatar
                    className={`${styles.tag} ${styles.avatar}`}
                    src={`${image}`}
                />
                <Text className={`${styles.name} ${styles.tag}`}>{name}</Text>
            </div>
        );
    else {
        const div = divRef.current;

        const isAnimateString =
            div !== null
                ? isOverflownWidth(div)
                    ? `${styles.runningStringAnim} ${styles.runningStringWrapper}`
                    : `${styles.runningStringWrapper}`
                : undefined;

        return (
            <Link to={`${ROUTES.coin}/${id}`} className={styles.link}>
                <div className={`${styles.wrapper} ${styles.WLCardView}`}>
                    <Text className={`${styles.rank} ${styles.WLCardView}`}>
                        #{rank ? rank : 'N'}
                    </Text>
                    <Avatar
                        src={`${image}`}
                        className={`${styles.image} ${styles.fix} ${styles.WLCardView}`}
                    />
                    <div
                        ref={divRef}
                        className={isAnimateString}
                        data-string-width={'250%'}>
                        <Text className={`${styles.name} ${styles.WLCardView}`}>
                            {name}
                        </Text>
                        <Text
                            className={`${styles.symbol} ${styles.WLCardView}`}>
                            {symbol}
                        </Text>
                    </div>
                </div>
            </Link>
        );
    }
};

const Check: FC = () => {
    return (
        <div className={styles.checkWrapper}>
            <CheckOutlined style={{ color: 'white' }} />
        </div>
    );
};

export default CoinCard;
