import {FC} from 'react';
import {Button, ConfigProvider} from 'antd';

import {AddCoinToWatchListModal, Cryptocurrencies} from '../components';
import {EmptyWatchList} from '../EmptyWatchList/EmptyWatchList';

import {ICoinsData} from '../../types/ICoin';

import styles from './WatchList.module.scss';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useModalVisible} from '../../hooks/useModal';
import {ModalVisibleContext} from '../../contexts/ModalContext';
import {ModalSelectedCoinsContext} from '../../contexts/ModalSelectedCoinsContext';
import {useSelectCoin} from '../../hooks/useSelectCoin';
import {useAppSelector} from '../../hooks/redux';
import {selectWatchListIds} from '../../redux/selectors/watchListSelectors';

const WatchList: FC<ICoinsData> = ({dataCoins}) => {
    const watchListIds = useAppSelector(selectWatchListIds);
    const {modalVisible, toogleModal} = useModalVisible(false);
    const {selectedCoinsIds, selectedCoins, addCoin, removeCoin} =
        useSelectCoin();
    return (
        <ModalVisibleContext.Provider value={{modalVisible, toogleModal}}>
            {watchListIds.length ? (
                <Button
                    icon={<PlusCircleOutlined/>}
                    type='primary'
                    className={styles.button}
                    onClick={toogleModal}>
                    Add coins
                </Button>
            ) : null}

            <ModalSelectedCoinsContext.Provider
                value={{
                    selectedCoinsIds,
                    selectedCoins,
                    addCoin,
                    removeCoin,
                }}>
                <ConfigProvider renderEmpty={() => <EmptyWatchList/>}>
                    <Cryptocurrencies dataCoins={dataCoins}/>
                </ConfigProvider>
                <AddCoinToWatchListModal/>
            </ModalSelectedCoinsContext.Provider>
        </ModalVisibleContext.Provider>
    );
};

export default WatchList;
