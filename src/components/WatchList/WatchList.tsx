import React, { FC, useState } from 'react'
import { Skeleton, Space, Button, Modal, } from 'antd';

import styles from './WatchList.module.scss'
import Icon from '@ant-design/icons';
import {ReactComponent as CommonStar} from '../../assets/svg/commonStar.svg'

import { Cryptocurrencies } from '../components';

const WatchList: FC = () => {
    return (
        <>
            <Cryptocurrencies dataCoins={undefined}/>
            <EmptyWatchList/>
            {/* <AddCoinModal/> */}
        </>
    )
}

const EmptyWatchList: FC = () => {
    return (
        <div className={styles.listWrapper}>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListItem/>
            <WatchListMessage/>
        </div>
    )
}

const WatchListItem: FC = () => {
    return (
        <div className={styles.listItemWrapper}>
            <Space>
                <Skeleton.Avatar className={styles.star} size={10} shape={'circle'} />
                <Skeleton.Avatar size={20} shape={'circle'} />
                <SkeletonInputWrapper width={250}/>
                <SkeletonInputWrapper width={150}/>
                <SkeletonInputWrapper width={150}/>
                <SkeletonInputWrapper width={100}/>
            </Space>
        </div>
    )
}

const SkeletonInputWrapper: FC<{width: number}> = ({width}) => {
    return (
        <div className={styles.currencyName}>
            <Skeleton.Input style={{width}} active size={'default'}/>
        </div>
    )
}

const WatchListMessage: FC = () => {
    return (
        <div className={styles.message}>
            <div className={styles.iconWrapper}>
                <Icon className={styles.starIcon} component={CommonStar}/>
            </div>
            <h3 className={styles.header}>Your watchlist is empty</h3>
            <p className={styles.info}>Start building your watchlist by clicking button below</p>
            <Button type="primary" className={styles.button}>Add cryptocurrencies</Button>
        </div>
    )
}

// const AddCoinModal: FC = () => {
//     const [loading, setLoading] = useState(false)
//     const [modalVisible, setModalVisible] = useState(false);
    
//     const toogleModal = () => {
//         setModalVisible(!modalVisible)
//         return modalVisible;
//     }

//     const handleOK = () => {
//         setLoading(true)
//         setTimeout(() => {
//             setLoading(false);
//             toogleModal();
//         }, 3000);
//     }

//     return (
//         <Modal 
//             visible={toogleModal()}
//             title="Add Coins"
//             onOk={handleOK}
//             footer={[
//                 <Button type="primary" loading={loading} onClick={handleOK}/>
//             ]}
//         >
//             <div className={styles.modalWrapper}>
//                 <div className={styles.modalSearch}></div>

//             </div>
//         </Modal>
//     )
// }


export default WatchList