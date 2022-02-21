import {Avatar, Spin, Typography} from 'antd';
import {FC} from 'react';
import {formatName, formatSymbol} from '../../../../utils/formatters';
import {ReactComponent as CommonStar} from '../../../../assets/svg/commonStar.svg';
import styles from './CoinInfoHeader.module.scss';

const {Title, Text} = Typography;

type TcoinInfoHeader = {
    isFetching: boolean;
    coinName: string;
    coinSymbol: string;
    image: string;
}

const CoinInfoHeader: FC<TcoinInfoHeader> = ({
                                                 isFetching, coinName, coinSymbol, image,
                                             }) => (
    <div className={styles.headerWrapper}>
        <div className={styles.header}>
            {isFetching
                ? <Avatar shape="square" className={styles.avatarLoader} size={64} src={<Spin size="large"/>}/>
                : <Avatar shape="square" size={64} src={image}/>}
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
            <CommonStar className={styles.star}/>
        </div>
    </div>
);

export default CoinInfoHeader;
