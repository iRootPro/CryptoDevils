import { CheckOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToModalSelectedCoins,
    removeCoinFromModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';
import { selectModalSelectedCoinsIds } from '../../redux/selectors/modalSelectedCoinsSelectors';
import { ICoinCard, ICoinWL } from '../../types/ICoin';
import styles from './CoinCard.module.scss';

const { Text } = Typography;

const CoinCard: FC<ICoinCard> = ({ id, image, name, symbol, type }) => {
    const [showSelect, setShowSelect] = useState(false);

    const selectedCoinsIds = useAppSelector(selectModalSelectedCoinsIds);
    const dispatch = useAppDispatch();

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
                    <Avatar src={`${image}`} />
                    <Text className={styles.name}>{name}</Text>
                    <Text className={styles.symbol}>{symbol}</Text>
                </div>
                {showSelect ? <Check /> : null}
            </div>
        );
    else
        return (
            <div className={styles.wrapper}>
                <Avatar
                    className={`${styles.tag} ${styles.avatar}`}
                    src={`${image}`}
                />
                <Text className={`${styles.name} ${styles.tag}`}>{name}</Text>
            </div>
        );
};

const Check: FC = () => {
    return (
        <div className={styles.checkWrapper}>
            <CheckOutlined style={{ color: 'white' }} />
        </div>
    );
};

export default CoinCard;
