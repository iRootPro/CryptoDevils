import { FC, useEffect, useState } from 'react'
import { useGetCoinsQuery } from '../../services/api'
import { Table, TablePaginationConfig } from 'antd';
import ICoin from '../../types/ICoin';
import CoinCard from './CoinCard/CoinCard';
import millify from 'millify';

const columns = [
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
        title: 'Daily Change',
        dataIndex: 'dailychange',
        sorter: {
            compare: (a: { dailychange: number; }, b: { dailychange: number; }) => a.dailychange - b.dailychange,
            multiple: 2,
        },
        render: (dailychange: number) => {
            return {
                props: {
                    style: { color: dailychange > 0 ? "#16c784" : "#e93943" }
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
];


const Cryptocurrencies: FC = () => {
    const [pageSize, setPageSize] = useState(50)
    const { data, refetch } = useGetCoinsQuery('usd')
    useEffect(() => {
        const timer = setInterval(() => {
            refetch()
        }, 5000)
        return () => clearInterval(timer);
    }, [])
    let dataCoins = data?.map(coin => ({
        coin,
        rank: coin.market_cap_rank,
        dailychange: coin.price_change_percentage_24h,
        key: coin.id,
        name: coin.name,
        price: coin.current_price,
        image: coin.image,
        marketcap: coin.market_cap
    }));

    const onChange = (pagination: TablePaginationConfig) => {
        pagination.pageSize && setPageSize(pagination.pageSize)
    }
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


















