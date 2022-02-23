/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CheckOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import styled, { keyframes, css } from 'styled-components';
import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToModalSelectedCoins,
    removeCoinFromModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';
import { selectModalSelectedCoinsIds } from '../../redux/selectors/modalSelectedCoinsSelectors';
import { ICoinCard, ICoinWL } from '../../types/ICoin';
import {
    isOverflownWidth,
    clientScrollRatioPercentage,
} from '../../utils/overflown';

import styles from './CoinCard.module.scss';

import ROUTES from '../../constants/routes';

const { Text } = Typography;

let clientScrollRatio: number = 100;

const Check: FC = () => (
    <div className={styles.checkWrapper}>
        <CheckOutlined style={{ color: 'white' }} />
    </div>
);

type IMarqueeProps = {
    clientScrollRatio: number;
};

const marquee = (props: IMarqueeProps) => keyframes`
    0% {
        transform: translateX(0);
    }
    48% {
        transform: translateX(${-props.clientScrollRatio}%);
    }
    49% {
        transform: translate(${-props.clientScrollRatio}%, 150%);
    }
    50% {
        transform: translate(105%, 150%);
    }
    51% {
        transform: translate(105%);
    }
    52% {
        transform: translateX(100%);
    }
    80% {
        transform: translateX(40%);
    }
    100% {
        transform: translateX(0);
    }
`;

const MarqueeDiv = styled.div<IMarqueeProps>`
    width: 100%;
    display: inline-block;
    
    &:hover {
        animation: ${(props) => css`
            ${marquee(props)} 5s linear 300ms infinite running;
        `};
        animation-fill-mode: forwards;
    },
`;

const CommonDiv = styled.div<IMarqueeProps>`
    display: inline-flex;
    flex-direction: column;
    width: 100%;
`;

const CoinCard: FC<ICoinCard> = ({ id, image, name, symbol, type, rank }) => {
    const [showSelect, setShowSelect] = useState(false);

    const selectedCoinsIds = useAppSelector(selectModalSelectedCoinsIds);
    const dispatch = useAppDispatch();

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (selectedCoinsIds.length)
            setShowSelect(selectedCoinsIds.includes(id));
        else setShowSelect(false);
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

    if (type === 'cryptocurrencies') {
        return (
            <Link to={`${ROUTES.coin}/${id}`} className={styles.link}>
                <div className={styles.wrapper}>
                    <Avatar
                        src={image}
                        className={`${styles.image} ${styles.fix}`}
                    />
                    <Text className={styles.name}>{name}</Text>
                    <Text className={styles.symbol}>{symbol}</Text>
                </div>
            </Link>
        );
    }
    if (type === 'watchlist-modal-list') {
        return (
            <div
                role="listitem"
                className={`${styles.wrapper} ${styles.modalList}`}
                onClick={handleOnClick}
            >
                <div className={styles.centerContent}>
                    <Avatar
                        src={image}
                        className={`${styles.image} ${styles.fix}`}
                    />
                    <Text className={`${styles.name} ${styles.modalList}`}>
                        {name}
                    </Text>
                    <Text className={styles.symbol}>{symbol}</Text>
                </div>
                {showSelect ? <Check /> : null}
            </div>
        );
    }
    if (type === 'watchlist-modal-tag') {
        return (
            <div className={styles.wrapper}>
                <Avatar
                    className={`${styles.tag} ${styles.avatar}`}
                    src={`${image}`}
                />
                <Text className={`${styles.name} ${styles.tag}`}>{name}</Text>
            </div>
        );
    }

    let MyDiv = CommonDiv;

    if (divRef.current !== null) {
        const div = divRef.current;
        if (isOverflownWidth(div)) {
            MyDiv = MarqueeDiv;
            clientScrollRatio = clientScrollRatioPercentage(div);
        }
    }

    return (
        <Link to={`${ROUTES.coin}/${id}`} className={styles.link}>
            <div className={`${styles.wrapper} ${styles.WLCardView}`}>
                <Text className={`${styles.rank} ${styles.WLCardView}`}>
                    #{rank || '―'}
                </Text>
                <Avatar
                    src={`${image}`}
                    className={`${styles.image} ${styles.fix} ${styles.WLCardView}`}
                />
                <MyDiv ref={divRef} clientScrollRatio={clientScrollRatio}>
                    <Text className={`${styles.name} ${styles.WLCardView}`}>
                        {name}
                    </Text>
                    <Text className={`${styles.symbol} ${styles.WLCardView}`}>
                        {symbol}
                    </Text>
                </MyDiv>
            </div>
        </Link>
    );
};

export default CoinCard;
