import { Avatar, Spin, Typography } from 'antd';
import { FC } from 'react';
import Icon from '@ant-design/icons';
import { formatName, formatSymbol } from '../../../../utils/formatters';
import { ReactComponent as CommonStar } from '../../../../assets/svg/commonStar.svg';
import { ReactComponent as YellowStar } from '../../../../assets/svg/yellowStar.svg';
import styles from './CoinInfoHeader.module.scss';
import { ICoinWL } from '../../../../types/ICoin';
import useAddCoinToWL from '../../../../hooks/useAddCoinToWL';

const { Title, Text } = Typography;

type TcoinInfoHeader = {
    isFetching: boolean;
    coinName: string;
    coinSymbol: string;
    image: string;
    id: string;
};

const CoinInfoHeader: FC<TcoinInfoHeader> = ({
    isFetching,
    coinName,
    coinSymbol,
    image,
    id,
}) => {
    const { watchListIds, handleOnStar } = useAddCoinToWL();
    const coin: ICoinWL = {
        name: coinName,
        id,
        image,
        symbol: coinSymbol,
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                {isFetching ? (
                    <Avatar
                        shape="square"
                        className={styles.avatarLoader}
                        size={64}
                        src={<Spin size="large" />}
                    />
                ) : (
                    <Avatar shape="square" size={64} src={image} />
                )}
                <Title
                    level={3}
                    className={`${styles.headerTitle} ${styles.title}`}
                >
                    {formatName(coinName)}
                </Title>
                <Text className={`${styles.headerText} ${styles.text}`}>
                    {formatSymbol(coinSymbol)}
                </Text>
            </div>
            <div className={styles.starWrapper}>
                <Icon
                    className={styles.star}
                    onClick={() => {
                        handleOnStar(coin);
                    }}
                    component={
                        watchListIds.includes(coin.id) ? YellowStar : CommonStar
                    }
                />
            </div>
        </div>
    );
};

export default CoinInfoHeader;
