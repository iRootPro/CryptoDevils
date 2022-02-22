import {FC} from 'react';
import Icon from '@ant-design/icons';
import {Button, Skeleton, Space} from 'antd';

import styles from './EmptyWatchList.module.scss';
import {ReactComponent as CommonStar} from '../../assets/svg/commonStar.svg';

import {AddCoinToWatchListModal} from '../components';
import {useModalContext} from '../../contexts/ModalContext';

export const EmptyWatchList: FC = () => {
    return (
        <div className={styles.listWrapper}>
            <WatchListItems count={6}/>
            <WatchListMessage/>
            <AddCoinToWatchListModal/>
        </div>
    );
};

type IWLItemsProps = {
    count: number;
};

const WatchListItems: FC<IWLItemsProps> = ({count}) => {
    const items = [];

    for (let i = 0; i < count; i++) {
        items.push(<WatchListItem key={`WatchListSkeleton${i}`}/>);
    }

    return <>{items}</>;
};

const WatchListItem: FC = () => {
    return (
        <div className={styles.listItemWrapper}>
            <Space>
                <Skeleton.Avatar
                    className={styles.star}
                    size={10}
                    shape={'circle'}
                />
                <Skeleton.Avatar size={20} shape={'circle'}/>
                <SkeletonInput width={250}/>
                <SkeletonInput width={150}/>
                <SkeletonInput width={150}/>
                <SkeletonInput width={100}/>
            </Space>
        </div>
    );
};

const SkeletonInput: FC<{ width: number }> = ({width}) => {
    return (
        <div className={styles.currencyName}>
            <Skeleton.Input style={{width}} active size={'default'}/>
        </div>
    );
};

const WatchListMessage: FC = () => {
    const {toogleModal} = useModalContext();

    return (
        <div className={styles.message}>
            <div className={styles.iconWrapper}>
                <Icon className={styles.starIcon} component={CommonStar}/>
            </div>
            <h3 className={styles.header}>Your watchlist is empty</h3>
            <p className={styles.info}>
                Start building your watchlist by clicking button below
            </p>
            <Button
                type='primary'
                className={styles.button}
                onClick={toogleModal}>
                Add cryptocurrencies
            </Button>
        </div>
    );
};
