import { ChangeEventHandler, FC, useState } from 'react';
import { Input, Button, List, Modal, Tag } from 'antd';

import styles from './AddCoinToWatchListModal.module.scss';
import { useModalVisibleContext } from '../../contexts/ModalVisibleContext';

import CoinCard from '../CoinCard/CoinCard';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    addCoinToWatchList,
    clearWatchList,
} from '../../redux/reducers/watchListSlice';
import { selectModalSelectedCoins } from '../../redux/selectors/modalSelectedCoinsSelectors';
import {
    clearModalSelectedCoins,
    removeCoinFromModalSelectedCoins,
} from '../../redux/reducers/modalSelectedCoinsSlice';
import { ICoinListItem } from '../../types/ICoinList';
import {
    useGetCoinsByIdsQuery,
    useGetCoinsListQuery,
} from '../../services/api';
import { useListDataCoins } from '../../hooks/useListDataCoins';

const { Search } = Input;

const AddCoinToWatchListModal: FC = () => {
    const { modalVisible, toogleModal } = useModalVisibleContext();

    const [inputValue, setInputValue] = useState('');

    const selectedCoins = useAppSelector(selectModalSelectedCoins);
    const dispatch = useAppDispatch();

    const coinList = useGetCoinsListQuery('').data;
    const [searchedCoinsIds, setSearchedCoinsIds] = useState<string[]>([]);

    const ids = searchedCoinsIds.join(',');
    const pageLimit = inputValue && !ids ? 0 : 50;

    const { data, error, isFetching, isLoading } = useGetCoinsByIdsQuery({
        currency: 'usd',
        ids: ids,
        perPage: pageLimit,
    });

    const dataCoins = useListDataCoins(data);

    if (error) console.log(`error fetching with status: ${error}`);

    const parseCoinList = (searchTerm: string) => {
        return coinList!.filter(
            (coin) =>
                coin.name.toLowerCase().replace(/\s/g, '').indexOf(searchTerm) >
                -1,
        );
    };

    const getCoinsIds = (coinList: ICoinListItem[]) => {
        return coinList?.map((item) => item.id);
    };

    const makeSearchedCoinList = (searchTerm: string) => {
        const searchedCoinList = searchTerm ? parseCoinList(searchTerm) : [];
        const searchedIds = getCoinsIds(searchedCoinList);
        if (searchedIds.join(',').length < 8093)
            setSearchedCoinsIds(searchedIds);
    };

    const debouncedMakeSearchedCoinList = useDebounce(
        makeSearchedCoinList,
        500,
    );

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

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const searchTerm = e.target.value;
        setInputValue(searchTerm);
        debouncedMakeSearchedCoinList(searchTerm);
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
                loading={isLoading || isFetching}
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
