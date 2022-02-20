import { FC, useEffect } from 'react';
import { Button, ConfigProvider } from 'antd';
import {
    AppstoreOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';

import { AddCoinToWatchListModal, Cryptocurrencies } from '../components';
import { EmptyWatchList } from '../EmptyWatchList/EmptyWatchList';

import { ICoinsData } from '../../types/ICoin';

import styles from './WatchList.module.scss';

import { ModalVisibleContext } from '../../contexts/ModalVisibleContext';
import { useModalVisible } from '../../hooks/useModalVisible';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectWatchList } from '../../redux/selectors/watchListSelectors';
import {
    addCoinToModalSelectedCoins,
    clearModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';
import { clearWatchList } from '../../redux/reducers/watchListSlice';
import { WatchListCardView } from '../WatchListCardView/WatchListCardView';

const WatchList: FC<ICoinsData> = ({ dataCoins }) => {
    const watchList = useAppSelector(selectWatchList);
    const { modalVisible, toogleModal } = useModalVisible(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearModalSelectedCoins());
        watchList.forEach((item) =>
            dispatch(addCoinToModalSelectedCoins(item)),
        );
    }, [watchList]);

    return (
        <ModalVisibleContext.Provider value={{ modalVisible, toogleModal }}>
            {watchList.length ? (
                <div className={styles.wrapper}>
                    <Button
                        icon={<AppstoreOutlined style={{ fontSize: '27px' }} />}
                        className={`${styles.button} ${styles.tile}`}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type='primary'
                        className={`${styles.button} ${styles.clear}`}
                        onClick={() => dispatch(clearWatchList())}>
                        Clear watch list
                    </Button>
                    <Button
                        icon={<PlusCircleOutlined />}
                        type='primary'
                        className={`${styles.button} ${styles.add}`}
                        onClick={toogleModal}>
                        Add coins
                    </Button>
                </div>
            ) : null}

            {/* <ConfigProvider renderEmpty={() => <EmptyWatchList />}>
                <Cryptocurrencies dataCoins={dataCoins} />
            </ConfigProvider> */}
            <WatchListCardView dataCoins={dataCoins} />
            <AddCoinToWatchListModal />
        </ModalVisibleContext.Provider>
    );
};

export default WatchList;
