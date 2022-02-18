import { ChangeEventHandler, FC, useState } from 'react';
import { Input, Button, List, Modal, Tag } from 'antd';

import styles from './AddCoinToWatchListModal.module.scss';

import CoinCard from '../CoinCard/CoinCard';
import useModalCoinList from '../../hooks/useModalCoinList';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToWatchList,
    clearWatchList,
} from '../../redux/reducers/watchListSlice';
import { useModalVisibleContext } from '../../contexts/ModalVisibleContext';
import { selectModalSelectedCoins } from '../../redux/selectors/modalSelectedCoinsSelectors';
import {
    clearModalSelectedCoins,
    removeCoinFromModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';

const { Search } = Input;

const AddCoinToWatchListModal: FC = () => {
    const { modalVisible, toogleModal } = useModalVisibleContext();

    const selectedCoins = useAppSelector(selectModalSelectedCoins);
    const dispatch = useAppDispatch();

    const [inputValue, setInputValue] = useState('');

    const { dataCoins, searchedCoinsIds, makeCoinList } = useModalCoinList();

    const handleCancel = () => {
        toogleModal();
        setInputValue('');
        dispatch(clearModalSelectedCoins());
    };

    const handleOK = () => {
        dispatch(clearWatchList());

        selectedCoins.forEach((coin) => {
            dispatch(addCoinToWatchList(coin));
        });

        handleCancel();
    };

    const debouncedMakeCoinList = useDebounce(makeCoinList, 500);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const searchTerm = e.target.value;
        setInputValue(searchTerm);
        debouncedMakeCoinList(searchTerm);
    };

    const makeSelectedCoinsTags = () => {
        return selectedCoins.map((item) => {
            return (
                <Tag
                    key={`tag_${item.id}`}
                    className={`${styles.tag} ${styles.modal}`}
                    closable
                    onClose={() => {
                        dispatch(removeCoinFromModalSelectedCoins(item));
                    }}>
                    <CoinCard
                        key={`tag_coincard_${item.id}`}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        symbol={item.symbol}
                        type='watchlist-modal-tag'
                    />
                </Tag>
            );
        });
    };

    return (
        <Modal
            className={styles.modal}
            visible={modalVisible}
            title={<h3 className={styles.title}>Add Coins</h3>}
            onOk={handleOK}
            onCancel={handleCancel}
            destroyOnClose
            width={500}
            centered
            footer={[
                <div
                    key={`modal_tags_wrapper`}
                    className={`${styles.tagWrapper} ${
                        selectedCoins.length ? null : styles.hide
                    }`}>
                    {makeSelectedCoinsTags()}
                </div>,
                <Button
                    key='modal_submit'
                    type='primary'
                    block
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <Search
                defaultValue={''}
                allowClear
                placeholder='Search'
                onChange={handleOnChange}
                value={inputValue}
            />
            <List
                itemLayout='horizontal'
                dataSource={
                    inputValue && !searchedCoinsIds?.length
                        ? undefined
                        : dataCoins
                }
                className={styles.list}
                renderItem={(item) => (
                    <List.Item key={`listitem_${item.id}`}>
                        <List.Item.Meta
                            title={
                                <CoinCard
                                    key={`modal_card_${item.id}`}
                                    id={item.id}
                                    image={item.image}
                                    name={item.name}
                                    symbol={item.symbol}
                                    type='watchlist-modal-list'
                                />
                            }
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default AddCoinToWatchListModal;
