import { ChangeEventHandler, FC, useState } from 'react';
import { Input, Button, List, Modal, Tag } from 'antd';

import styles from './AddCoinToWatchListModal.module.scss';
import { useModalContext } from '../../contexts/ModalContext';

import CoinCard from '../CoinCard/CoinCard';
import useModalCoinList from '../../hooks/useModalCoinList';
import { useDebounce } from '../../hooks/useDebounce';
import { useSelectCoin } from '../../hooks/useSelectCoin';
import { useAppDispatch } from '../../hooks/redux';
import {
    addCoinToWatchList,
    clearWatchList,
} from '../../redux/reducers/watchListSlice';
import { useModalSelectedCoinsContext } from '../../contexts/ModalSelectedCoinsContext';

const { Search } = Input;

const AddCoinToWatchListModal: FC = () => {
    const { modalVisible, toogleModal } = useModalContext();
    const { prepareCoin } = useSelectCoin();
    const { removeCoin, selectedCoins } = useModalSelectedCoinsContext();

    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const dispatch = useAppDispatch();

    const { getCoinsIds, parseCoinList, dataCoins, setSearchedCoinsIds } =
        useModalCoinList();

    const handleCancel = () => {
        toogleModal();
        setInputValue('');
    };

    const handleOK = () => {
        setLoading(true);

        const preparedCoins = selectedCoins.map(prepareCoin);

        dispatch(clearWatchList());

        preparedCoins.forEach((coin) => {
            dispatch(addCoinToWatchList(coin));
        });

        setLoading(false);
        toogleModal();

        setInputValue('');
    };

    const makeCoinList = (searchTerm: string) => {
        const searchedCoinList = parseCoinList(searchTerm);
        setSearchedCoinsIds(getCoinsIds(searchedCoinList));
    };

    const debouncedMakeCoinList = useDebounce(makeCoinList, 500);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> | undefined = (
        e,
    ) => {
        const searchTerm = e.target.value;
        setInputValue(searchTerm);

        if (searchTerm === '') {
            setInputValue('');
            setSearchedCoinsIds([]);
            return;
        }

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
                        removeCoin(item);
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
                    loading={loading}
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
                dataSource={dataCoins}
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
