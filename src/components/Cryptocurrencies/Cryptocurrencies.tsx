import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useGetCoinsQuery } from '../../services/api'
import { Table, TablePaginationConfig } from 'antd';
import ICoin from '../../types/ICoin';
import CoinCard from './CoinCard/CoinCard';
import millify from 'millify';
import { COLORS } from '../../constants/colors';

const Cryptocurrencies: FC = () => {
    const [pageSize, setPageSize] = useState(50)
    const { data, refetch } = useGetCoinsQuery('usd')
    useEffect(() => {
        const timer = setInterval(() => {
            refetch()
        }, 5000)
        return () => clearInterval(timer);
    }, [])
    const dataCoins = useMemo(() => data?.map(coin => ({
        coin,
        rank: coin.market_cap_rank,
        dailychange: coin.price_change_percentage_24h,
        key: coin.id,
        name: coin.name,
        price: coin.current_price,
        image: coin.image,
        marketcap: coin.market_cap
    })), [data]);
    const columns = useMemo(() => [
        {
            title: 'Rank',
            dataIndex: 'rank'
        },
        {
            title: 'Name',
            dataIndex: 'coin',
            render: (coin: ICoin) => <CoinCard coin={coin} />
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: {
                compare: (a: { price: number; }, b: { price: number; }) => a.price - b.price,
                multiple: 3,
            },
            render: (price: number) => millify(price, { precision: 5 })
        },
        {
            title: '24h %',
            dataIndex: 'dailychange',
            sorter: {
                compare: (a: { dailychange: number; }, b: { dailychange: number; }) => a.dailychange - b.dailychange,
                multiple: 2,
            },
            render: (dailychange: number) => {
                return {
                    props: {
                        style: { color: dailychange > 0 ? COLORS.green : COLORS.red }
                    },
                    children: <div>{millify(dailychange, { units: ['%'], space: true, precision: 2 })}</div>
                }
            }
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketcap',
            sorter: {
                compare: (a: { marketcap: number; }, b: { marketcap: number; }) => a.marketcap - b.marketcap,
                multiple: 1,
            },
            render: (marketCap: number) => millify(marketCap, { precision: 2 })
        },
    ], [dataCoins])
    const onChange = useCallback(() => {
        (pagination: TablePaginationConfig) => {
            pagination.pageSize && setPageSize(pagination.pageSize)
        }
    },
        [pageSize],
    )

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataCoins}
                onChange={onChange}
                pagination={{ pageSize: pageSize, position: ['bottomCenter'] }}
            />
        </div>
    )
}

export default Cryptocurrencies


















