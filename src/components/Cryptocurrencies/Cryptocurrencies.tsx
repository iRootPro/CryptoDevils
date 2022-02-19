import { FC, useCallback, useState } from 'react';
import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Icon from '@ant-design/icons';

import CoinCard from '../CoinCard/CoinCard';

import { COLORS } from '../../constants/colors';
import { ICoinsData, ICoin, ICoinWL } from '../../types/ICoin';

import { ReactComponent as CommonStar } from '../../assets/svg/commonStar.svg';
import { ReactComponent as YellowStar } from '../../assets/svg/yellowStar.svg';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToWatchList,
    removeCoinFromWatchList,
} from '../../redux/reducers/watchListSlice';
import {
    selectWatchList,
    selectWatchListIds,
} from '../../redux/selectors/watchListSelectors';
import {
    formatPercent,
    formatUSD,
    formatUSDforTable,
} from '../../utils/formatters';
import { useAddCoinToWL } from '../../hooks/useAddCoinToWL';

const Cryptocurrencies: FC<ICoinsData> = ({ dataCoins }) => {
    const [pageSize, setPageSize] = useState(50);

    const { watchListIds, handleOnStar } = useAddCoinToWL();

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
                            watchListIds.includes(record.id)
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
            render: (price: number) => formatUSDforTable(price),
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
            onCell: (dailychange: { dailychange: number }) => {
                return {
                    style: {
                        color:
                            dailychange.dailychange > 0
                                ? COLORS.green
                                : COLORS.red,
                    },
                };
            },
            render: (dailychange) => formatPercent(dailychange / 100),
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
            render: (marketCap: number) => formatUSD(marketCap),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataCoins}
            onChange={onChangeTable}
            pagination={
                dataCoins!.length < 10
                    ? false
                    : { pageSize: pageSize, position: ['bottomCenter'] }
            }
        />
    );
};

export default Cryptocurrencies;
