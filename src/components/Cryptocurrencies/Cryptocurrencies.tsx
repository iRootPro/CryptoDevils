import React, { FC, useCallback, useState } from 'react';
import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Icon from '@ant-design/icons';

import CoinCard from '../CoinCard/CoinCard';

import COLORS from '../../constants/colors';
import { ICoin, ICoinsData } from '../../types/ICoin';

import { ReactComponent as CommonStar } from '../../assets/svg/commonStar.svg';
import { ReactComponent as YellowStar } from '../../assets/svg/yellowStar.svg';

import {
    formatPercent,
    formatUSD,
    formatUSDforTable,
} from '../../utils/formatters';
import useAddCoinToWL from '../../hooks/useAddCoinToWL';
import MiniChartContainer from '../MiniChart/MiniChartContainer';

const Cryptocurrencies: FC<ICoinsData> = ({ dataCoins }) => {
    const [pageSize, setPageSize] = useState(10);

    const { watchListIds, handleOnStar } = useAddCoinToWL();

    const onChangeTable = useCallback(
        (pagination: TablePaginationConfig) => {
            if (pagination.pageSize) {
                setPageSize(pagination.pageSize);
            }
        },
        [pageSize],
    );

    const columns: ColumnsType<ICoin> = [
        {
            title: '',
            dataIndex: ['id', 'image', 'name', 'symbol'],
            key: 'star',
            render: (value, record: ICoin) => (
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
            ),
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: (rank: number) => rank || '―',
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
                        type="cryptocurrencies"
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
            },
            onCell: (dailychange: { dailychange: number }) => ({
                style: {
                    color:
                        dailychange.dailychange > 0 ? COLORS.green : COLORS.red,
                },
            }),
            render: (dailychange) => formatPercent(dailychange / 100),
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketcap',
            key: 'marketcap',
            sorter: {
                compare: (a: { marketcap: number }, b: { marketcap: number }) =>
                    a.marketcap - b.marketcap,
            },
            render: (marketCap: number) => formatUSD(marketCap),
        },
        {
            title: 'Last 30 days',
            render: (id) => <MiniChartContainer id={id.id} />,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={dataCoins}
            onChange={onChangeTable}
            pagination={{
                pageSize,
                position: ['bottomCenter'],
                hideOnSinglePage: true,
            }}
            scroll={{ x: 1000 }}
        />
    );
};

export default Cryptocurrencies;
