import { FC, useCallback, useState } from 'react';
import { Spin, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Icon from '@ant-design/icons';
import millify from 'millify';

import CoinCard from '../CoinCard/CoinCard';

import { COLORS } from '../../constants/colors';
import { ICoinsData, ICoin, ICoinWL } from '../../types/ICoin';

import { ReactComponent as CommonStar } from '../../assets/svg/commonStar.svg';
import { ReactComponent as YellowStar } from '../../assets/svg/yellowStar.svg';
import { ReactComponent as Spinner } from '../../assets/svg/spinner.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToWatchList,
    removeCoinFromWatchList,
} from '../../redux/reducers/watchListSlice';
import {
    selectWatchList,
    selectWatchListIds,
} from '../../redux/selectors/watchListSelectors';
import { useSelectCoin } from '../../hooks/useSelectCoin';

import styles from './Cryptocurrencies.module.scss';

const Cryptocurrencies: FC<ICoinsData> = ({ dataCoins }) => {
    const [pageSize, setPageSize] = useState(50);
    const [isLoadingStar, setIsLoadingStar] = useState(false);
    const watchList: ICoinWL[] = useAppSelector(selectWatchList);
    const watchListIds: string[] = useAppSelector(selectWatchListIds);
    const { prepareCoin } = useSelectCoin();

    const dispatch = useAppDispatch();

    const handleOnStar = (coin: ICoin) => {
        setIsLoadingStar(true);
        const preparedCoin = prepareCoin(coin);

        if (!watchList.length) {
            dispatch(addCoinToWatchList(preparedCoin));
            return;
        }

        const findedElem = watchList.find(
            (coin) => coin.id === preparedCoin.id,
        );

        if (findedElem) {
            dispatch(removeCoinFromWatchList(findedElem));
        } else dispatch(addCoinToWatchList(preparedCoin));
        setIsLoadingStar(false);
    };

    const onChangeTable = useCallback(
        (pagination: TablePaginationConfig) => {
            pagination.pageSize && setPageSize(pagination.pageSize);
        },
        [pageSize],
    );

    const columns: ColumnsType<ICoin> = [
        {
            title: '',
            dataIndex: ['id', 'image', 'name', 'symbol'],
            key: 'star',
            render: (value, record: ICoin) => {
                return (
                    <Icon
                        onClick={() => {
                            handleOnStar(record);
                        }}
                        component={
                            isLoadingStar && watchListIds.includes(record.id)
                                ? Spinner
                                : watchListIds.includes(record.id)
                                ? YellowStar
                                : CommonStar
                        }
                    />
                );
            },
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
        },
        {
            title: 'Name',
            dataIndex: ['id', 'image', 'name', 'symbol'],
            key: 'coin',
            render: (value, record: ICoin) => {
                const { id, image, name, symbol } = record;
                return (
                    <CoinCard
                        id={id}
                        key={id}
                        image={image}
                        name={name}
                        symbol={symbol}
                        type='cryptocurrencies'
                    />
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: {
                compare: (a: { price: number }, b: { price: number }) =>
                    a.price - b.price,
                multiple: 3,
            },
            render: (price: number) => millify(price, { precision: 5 }),
        },
        {
            title: '24h %',
            dataIndex: 'dailychange',
            key: 'dailychange',
            sorter: {
                compare: (
                    a: { dailychange: number },
                    b: { dailychange: number },
                ) => a.dailychange - b.dailychange,
                multiple: 2,
            },
            render: (dailychange: number) => {
                return {
                    props: {
                        style: {
                            color: dailychange > 0 ? COLORS.green : COLORS.red,
                        },
                    },
                    children: (
                        <div>
                            {millify(dailychange, {
                                units: ['%'],
                                space: true,
                                precision: 2,
                            })}
                        </div>
                    ),
                };
            },
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketcap',
            key: 'marketcap',
            sorter: {
                compare: (a: { marketcap: number }, b: { marketcap: number }) =>
                    a.marketcap - b.marketcap,
                multiple: 1,
            },
            render: (marketCap: number) => millify(marketCap, { precision: 2 }),
        },
    ];

    return (
        <div>
            <Table
                className={`${styles.table} ${styles.svg}`}
                columns={columns}
                dataSource={dataCoins}
                onChange={onChangeTable}
                pagination={{ pageSize: pageSize, position: ['bottomCenter'] }}
            />
        </div>
    );
};

export default Cryptocurrencies;
