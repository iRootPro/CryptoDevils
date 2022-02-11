import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Icon from '@ant-design/icons';
import millify from 'millify';

import CoinCard from './CoinCard/CoinCard';

import { COLORS } from '../../constants/colors';
import {CryptocurranciesProps, ICoin, ICoinData, ICoinID} from '../../types/ICoin';

import {ReactComponent as CommonStar} from '../../assets/svg/commonStar.svg'
import {ReactComponent as YellowStar} from '../../assets/svg/yellowStar.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {addWatchList, removeWatchList} from '../../redux/reducers/watchList';

const Cryptocurrencies: FC<CryptocurranciesProps> = ({dataCoins}) => {
    const [pageSize, setPageSize] = useState(50)
    const watchList: string[] = useAppSelector(state => state.watchListReducer).data
    
    const dispatch = useAppDispatch()

    const handleStar = (id: string) => {
        for (let i = 0; i < watchList.length; i++) {
            if (watchList[i] === id) {
                dispatch(removeWatchList(id))
                return
            }
        }
        dispatch(addWatchList(id))
    }

    const columns: ColumnsType<ICoinData> = [
        {
            title: '',
            dataIndex: 'coin',
            key: 'star',
            render: (coin: ICoin) => {
                return <Icon onClick={() => handleStar(coin.id)} component={watchList.includes(coin.id) ? YellowStar : CommonStar}/>
            }
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank'
        },
        {
            title: 'Name',
            dataIndex: 'coin',
            key: 'coin',
            render: (coin: ICoin) => <CoinCard coin={coin} />
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: {
                compare: (a: { price: number; }, b: { price: number; }) => a.price - b.price,
                multiple: 3,
            },
            render: (price: number) => millify(price, { precision: 5 })
        },
        {
            title: '24h %',
            dataIndex: 'dailychange',
            key: 'dailychange',
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
            key: 'marketcap',
            sorter: {
                compare: (a: { marketcap: number; }, b: { marketcap: number; }) => a.marketcap - b.marketcap,
                multiple: 1,
            },
            render: (marketCap: number) => millify(marketCap, { precision: 2 })
        },
    ]

    const onChange = useCallback((pagination: TablePaginationConfig) => {
        pagination.pageSize && setPageSize(pagination.pageSize)
    }, [pageSize])

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


















