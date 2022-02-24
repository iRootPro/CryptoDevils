/* eslint-disable react/jsx-no-constructed-context-values */
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Button, ConfigProvider, Modal } from 'antd';

import {
    AppstoreOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
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
import {
    changeView,
    setCards,
    setTable,
} from '../../redux/reducers/watchListViewSlice';
import EmptyWatchListCardView from '../EmptyWatchListCardView/EmptyWatchListCardView';
import useWindowDimensions from '../../hooks/useWindowDimension';

const { confirm } = Modal;

const WatchList: FC<ICoinsData> = ({ dataCoins }) => {
    const { width } = useWindowDimensions();
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
            return (
                <AppstoreOutlined className={`${styles.icon} ${styles.wl}`} />
            );
        return <TableOutlined className={`${styles.icon} ${styles.wl}`} />;
    };

    const renderView = () => {
        if (view === 'table') return <Cryptocurrencies dataCoins={dataCoins} />;
        return <WatchListCardView dataCoins={dataCoins} />;
    };

    const changeViewOnWidth = () => {
        if (width < 830 && dataCoins?.length === 0) dispatch(setCards());
        if (width >= 830 && dataCoins?.length === 0) dispatch(setTable());
    };

    useLayoutEffect(() => {
        changeViewOnWidth();
    }, [width, view]);

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete watch list items?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action is irreversible',
            onOk() {
                dispatch(clearWatchList());
                changeViewOnWidth();
            },
            onCancel() {},
        });
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
                        onClick={showConfirm}
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
                {view === 'cards' && dataCoins?.length === 0 && (
                    <EmptyWatchListCardView />
                )}
            </ConfigProvider>
            <AddCoinToWatchListModal />
        </ModalVisibleContext.Provider>
    );
};

export default WatchList;
