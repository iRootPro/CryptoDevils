import React, { FC, useEffect, useState } from 'react'
import { useGetCoinsQuery } from '../../services/api'
import Loader from '../Loader/Loader'
import CoinCard from '../CoinCard/CoinCard'
import { Avatar, Table } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Name',
        dataIndex: 'coin',
        render: (coin: any) => {
            return (
                <Link to={`coin/:id`} style={{color: '#000'}}>
                <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                    <Avatar src={`${coin.image.small}`} />
                    <p style={{display: 'inline-block', margin: '0px 0px 0px 10px', fontSize: 20, lineHeight: '100%'}}>{coin.name}</p>
                </div>
                </Link>
            )
        }
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: {
            compare: (a: any, b: any) => a.price - b.price,
            multiple: 3,
        },
    },
    {
        title: 'Daily Change',
        dataIndex: 'dailychange',
        sorter: {
            compare: (a: any, b: any) => a.dailychange - b.dailychange,
            multiple: 2,
        },
    },
    {
        title: 'Market Cap',
        dataIndex: 'marketcap',
        sorter: {
            compare: (a: any, b: any) => a.marketcap - b.marketcap,
            multiple: 1,
        },
    },
];


const Cryptocurrencies: FC = () => {
    const { data, isFetching } = useGetCoinsQuery('')
    if (isFetching) return <Loader />
    let dataCoins = data?.map(coin => ({
        coin,
        key: coin.id,
        name: coin.name,
        price: coin.market_data.current_price.usd,
        dailychange: coin.market_data.price_change_percentage_24h_in_currency.usd,
        marketcap: coin.market_data.market_cap.usd,
        image: coin.image.small
    }));

    console.log(data)
    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div>
            <Table columns={columns}
                dataSource={dataCoins}
                onChange={onChange}
                pagination={{ pageSize: 50 }}
            />
            {data?.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
            ))}
        </div>
    )
}

export default Cryptocurrencies







