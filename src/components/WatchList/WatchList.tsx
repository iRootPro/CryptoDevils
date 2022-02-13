import { FC } from 'react'
import { ConfigProvider } from 'antd';

import { Cryptocurrencies } from '../components';
import { EmptyWatchList } from '../EmptyWatchList/EmptyWatchList';

import { ICoinsData } from '../../types/ICoin';

const WatchList: FC<ICoinsData> = ({dataCoins}) => {
    return (
        <>
            <ConfigProvider renderEmpty={() => <EmptyWatchList/>}>
                <Cryptocurrencies dataCoins={dataCoins}/>
            </ConfigProvider>
        </>
    )
}


export default WatchList
