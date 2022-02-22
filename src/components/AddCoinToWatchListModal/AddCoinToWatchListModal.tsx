import {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { Input, Button, List, Modal, Tag } from 'antd';

import styles from './AddCoinToWatchListModal.module.scss';
import { useModalVisibleContext } from '../../contexts/ModalVisibleContext';

import CoinCard from '../CoinCard/CoinCard';

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
import { ICoinListItem, ICoinListWL } from '../../types/ICoinList';
import {
    useGetCoinsByIdsQuery,
    useGetCoinsListQuery,
} from '../../services/api';
import useListDataCoins from '../../hooks/useListDataCoins';
import debounce from '../../utils/debounce';

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

    const [isListLoading, setIsListLoading] = useState(false);

    const { data, error } = useGetCoinsByIdsQuery({
        currency: 'usd',
        ids,
        perPage: pageLimit,
    });

    if (error) {
        console.log(`error fetching with status: ${JSON.stringify(error)}`);
    }

    const [dataCoins, setDataCoins] = useState<ICoinListWL>([]);

    const parseCoinList = (searchTerm: string) =>
        coinList!.filter(
            (coin) =>
                coin.name.toLowerCase().replace(/\s/g, '').indexOf(searchTerm) >
                -1,
        );

    const getCoinsIds = (coinListProps: ICoinListItem[]) =>
        coinListProps?.map((item) => item.id);

    const makeSearchedCoinList = () => {
        const searchTerm = inputValue;

        const searchedCoinList = searchTerm ? parseCoinList(searchTerm) : [];
        const searchedIds = getCoinsIds(searchedCoinList);

        let lengthNormalizedSearchedIds: string[] = [];

        if (searchedIds.join(',').length < 8000) {
            lengthNormalizedSearchedIds = searchedIds;
        } else {
            let index = 0;
            do {
                lengthNormalizedSearchedIds.push(searchedIds[index]);
                index += 1;
            } while (lengthNormalizedSearchedIds.join(',').length < 8000);
        }

        setSearchedCoinsIds(lengthNormalizedSearchedIds);
    };

    useEffect(() => {
        setIsListLoading(true);
        setDataCoins([]);
        makeSearchedCoinList();
    }, [inputValue]);

    useEffect(() => {
        setDataCoins(useListDataCoins(data));
    }, [data]);

    useLayoutEffect(() => {
        if (
            inputValue &&
            data?.length !== 0 &&
            searchedCoinsIds.length !== 0 &&
            dataCoins?.length !== 0
        ) {
            setIsListLoading(false);
        } else setIsListLoading(true);

        if (inputValue && data?.length === 0 && dataCoins?.length === 0) {
            setIsListLoading(false);
        }

        if (
            inputValue &&
            data?.length === 0 &&
            searchedCoinsIds.length !== 0 &&
            dataCoins?.length === 0
        ) {
            setIsListLoading(true);
        }

        if (
            inputValue &&
            data?.length !== 0 &&
            searchedCoinsIds.length !== 0 &&
            dataCoins?.length === 0
        ) {
            setIsListLoading(true);
        }

        if (!inputValue) setIsListLoading(false);
    }, [inputValue, dataCoins, searchedCoinsIds]);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
    };

    const [debouncedHandleChange, teardown] = useMemo(
        () =>
            debounce<ChangeEvent<HTMLInputElement>, void>(handleOnChange, 300),
        [inputValue],
    );

    const handleCancel = () => {
        toogleModal();
        setInputValue('');
        dispatch(clearModalSelectedCoins());
        teardown();
    };

    const handleOK = () => {
        dispatch(clearWatchList());

        selectedCoins.forEach((coin) => {
            dispatch(addCoinToWatchList(coin));
        });

        handleCancel();
    };

    const makeSelectedCoinsTags = () =>
        selectedCoins.map((item) => (
            <Tag
                key={`tag_${item.id}`}
                className={`${styles.tag} ${styles.modal}`}
                closable
                onClose={() => {
                    dispatch(removeCoinFromModalSelectedCoins(item));
                }}
            >
                <CoinCard
                    key={`tag_coincard_${item.id}`}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    symbol={item.symbol}
                    type="watchlist-modal-tag"
                />
            </Tag>
        ));

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
                    key="modal_tags_wrapper"
                    className={`${styles.tagWrapper} ${
                        selectedCoins.length ? null : styles.hide
                    }`}
                >
                    {makeSelectedCoinsTags()}
                </div>,
                <Button
                    key="modal_submit"
                    type="primary"
                    block
                    onClick={handleOK}
                >
                    OK
                </Button>,
            ]}
        >
            <Search
                defaultValue=""
                allowClear
                placeholder="Search"
                onChange={debouncedHandleChange}
            />
            <List
                loading={isListLoading}
                itemLayout="horizontal"
                dataSource={dataCoins}
                className={styles.list}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            padding: 0,
                            height: '50px',
                            display: 'list-item',
                        }}
                        key={`listitem_${item.id}`}
                    >
                        <CoinCard
                            key={`modal_card_${item.id}`}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                            symbol={item.symbol}
                            type="watchlist-modal-list"
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default AddCoinToWatchListModal;
