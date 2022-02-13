import { FC, useCallback, useState } from 'react'
import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Icon from '@ant-design/icons';
import millify from 'millify';

import CoinCard from '../CoinCard/CoinCard';

import { COLORS } from '../../constants/colors';
import { ICoinsData, ICoin } from '../../types/ICoin';

import { ReactComponent as CommonStar } from '../../assets/svg/commonStar.svg'
import { ReactComponent as YellowStar } from '../../assets/svg/yellowStar.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCoinToWatchList, removeCoinFromWatchList } from '../../redux/reducers/watchListSlice';
import { selectWatchList } from '../../redux/selectors/watchListSelectors';

const Cryptocurrencies: FC<ICoinsData> = ({dataCoins}) => {
    const [pageSize, setPageSize] = useState(50)
    const watchList: string[] = useAppSelector(selectWatchList).data
    
    const dispatch = useAppDispatch()

    const handleOnStar = (id: string) => {
        const findedID = watchList.find(elem => elem === id)
        findedID ? dispatch(removeCoinFromWatchList(id)) : dispatch(addCoinToWatchList(id))
    }

    const onChangeTable = useCallback((pagination: TablePaginationConfig) => {
        pagination.pageSize && setPageSize(pagination.pageSize)
    }, [pageSize])

    const columns: ColumnsType<ICoin> = [
        {
            title: '',
            dataIndex: 'id',
            key: 'star',
            render: (id: string) => {
                return <Icon onClick={() => handleOnStar(id)} component={watchList.includes(id) ? YellowStar : CommonStar}/>
            }
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank'
        },
        {
            title: 'Name',
            dataIndex: ['id', 'image', 'name', 'symbol'],
            key: 'coin',
            render: (value, record: ICoin) => {
                const {id, image, name, symbol} = record
                return <CoinCard id={id} image={image} name={name} symbol={symbol}/>
            }
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

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataCoins}
                onChange={onChangeTable}
                pagination={{ pageSize: pageSize, position: ['bottomCenter'] }}
            />
        </div>
    )
}

export default Cryptocurrencies
