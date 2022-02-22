/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, useEffect, useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import {
    AppstoreOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    TableOutlined,
} from '@ant-design/icons';

import { AddCoinToWatchListModal, Cryptocurrencies } from '../components';
import EmptyWatchList from '../EmptyWatchList/EmptyWatchList';

import { ICoinsData } from '../../types/ICoin';

import styles from './WatchList.module.scss';

import { ModalVisibleContext } from '../../contexts/ModalVisibleContext';
import useModalVisible from '../../hooks/useModalVisible';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectWatchList } from '../../redux/selectors/watchListSelectors';
import {
    addCoinToModalSelectedCoins,
    clearModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';
import { clearWatchList } from '../../redux/reducers/watchListSlice';
import WatchListCardView from '../WatchListCardView/WatchListCardView';
import selectView from '../../redux/selectors/watchListViewSelectors';
import { changeView } from '../../redux/reducers/watchListViewSlice';

const WatchList: FC<ICoinsData> = ({ dataCoins }) => {
    const watchList = useAppSelector(selectWatchList);
    const { modalVisible, toogleModal } = useModalVisible(false);

    const dispatch = useAppDispatch();

    const view = useAppSelector(selectView);

    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        dispatch(clearModalSelectedCoins());
        watchList.forEach((item) =>
            dispatch(addCoinToModalSelectedCoins(item)),
        );
    }, [watchList]);

    const handleChangeView = () => {
        setIsBtnDisabled(true);
        setTimeout(() => {
            setIsBtnDisabled(false);
        }, 300);

        dispatch(changeView());
    };

    const renderViewIcon = () => {
        if (view === 'table')
            return <AppstoreOutlined style={{ fontSize: '27px' }} />;
        return <TableOutlined style={{ fontSize: '27px' }} />;
    };

    const renderView = () => {
        if (view === 'table') return <Cryptocurrencies dataCoins={dataCoins} />;
        if (dataCoins?.length === 0) return <EmptyWatchList />;
        return <WatchListCardView dataCoins={dataCoins} />;
    };

    return (
        <ModalVisibleContext.Provider value={{ modalVisible, toogleModal }}>
            {watchList.length ? (
                <div className={styles.wrapper}>
                    <Button
                        disabled={isBtnDisabled}
                        type="ghost"
                        icon={renderViewIcon()}
                        className={`${styles.button} ${styles.tile}`}
                        onClick={handleChangeView}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        className={`${styles.button} ${styles.clear}`}
                        onClick={() => dispatch(clearWatchList())}
                    >
                        Clear watch list
                    </Button>
                    <Button
                        icon={<PlusCircleOutlined />}
                        type="primary"
                        className={`${styles.button} ${styles.add}`}
                        onClick={toogleModal}
                    >
                        Add coins
                    </Button>
                </div>
            ) : null}

            <ConfigProvider renderEmpty={() => <EmptyWatchList />}>
                {renderView()}
            </ConfigProvider>
            <AddCoinToWatchListModal />
        </ModalVisibleContext.Provider>
    );
};

export default WatchList;
