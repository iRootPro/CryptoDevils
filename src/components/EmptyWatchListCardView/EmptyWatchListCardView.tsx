import { Button, Col, Row } from 'antd';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Icon from '@ant-design/icons';

import EmptyItemCardView from './EmptyItemCardView/EmptyItemCardView';

import styles from './EmptyWatchListCardView.module.scss';
import { ReactComponent as CommonStar } from '../../assets/svg/commonStar.svg';

import { useModalVisibleContext } from '../../contexts/ModalVisibleContext';
import useWindowDimensions from '../../hooks/useWindowDimension';

const WatchListMessage: FC = () => {
    const { toogleModal } = useModalVisibleContext();

    return (
        <div className={styles.message}>
            <div className={styles.iconWrapper}>
                <Icon className={styles.starIcon} component={CommonStar} />
            </div>
            <h3 className={styles.header}>Your watchlist is empty</h3>
            <p className={styles.info}>
                Start building your watchlist by clicking button below
            </p>
            <Button
                type="primary"
                className={styles.button}
                onClick={toogleModal}
            >
                Add cryptocurrencies
            </Button>
        </div>
    );
};

const EmptyWatchListCardView: FC = () => {
    const { width } = useWindowDimensions();
    const [dataCoins, setDataCoins] = useState<number[]>([1]);
    // eslint-disable-next-line no-undef
    const [cols, setCols] = useState<JSX.Element[]>([]);

    useLayoutEffect(() => {
        if (width < 576) setDataCoins([1]);
        else if (width < 768) setDataCoins([1, 2]);
        else if (width < 992) setDataCoins([1, 2]);
        else if (width < 1200) setDataCoins([1, 2]);
        else if (width < 1600) setDataCoins([1, 2, 3]);
        else setDataCoins([1, 2, 3, 4]);
    }, [width]);

    useLayoutEffect(() => {
        setCols(
            dataCoins?.map((item, index) => (
                <Col
                    key={`card_view_empty_${index + 1}`}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={8}
                    xxl={6}
                >
                    <EmptyItemCardView />
                </Col>
            )),
        );
    }, [dataCoins]);

    return (
        <div className={styles.wrapper}>
            <Row gutter={[16, 16]}>{cols}</Row>
            <WatchListMessage />
        </div>
    );
};

export default EmptyWatchListCardView;
