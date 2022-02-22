import { Typography } from 'antd';
import { FC } from 'react';
import { formatUSD } from '../../../../../utils/formatters';

import styles from './CoinProgressTooltip.module.scss';

type TcoinProgressToolTip = {
    value24h: number;
    text: string;
};

const { Text } = Typography;


const CoinProgressTooltip: FC<TcoinProgressToolTip> = ({ value24h, text }) =>
    <Text className={`${styles.priceDifference} ${styles.price}`}>
        <span className={`${styles.coinName} ${styles.name}`}>{text}</span>
        {value24h ? formatUSD(value24h) : '0%'}
    </Text>




export default CoinProgressTooltip;
