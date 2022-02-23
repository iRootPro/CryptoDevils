import { Typography } from 'antd';
import { FC } from 'react';
import { useGetGlobalStatsQuery } from '../../services/api';
import { useGetEthereumQuery } from '../../services/ethereumApi';
import { formatPercent, formatUSDNoDecimal } from '../../utils/formatters';
import styles from './StatBar.module.scss';
import { ReactComponent as GasStation } from '../../assets/svg/gasStation.svg';
import ApiStatus from './ApiStatus/ApiStatus';

const { Text } = Typography;

const StatBar: FC = () => {
    const { data } = useGetGlobalStatsQuery('');
    const { data: ethereum } = useGetEthereumQuery('');
    if (!data || !ethereum) return <ApiStatus />;
    const coins = data.data.active_cryptocurrencies;
    const exchanges = data.data.markets;
    const marketCap = data.data.total_market_cap.usd;
    const volume = data.data.total_volume.usd;
    const dominance = `BTC: ${formatPercent(
        data.data.market_cap_percentage.btc / 100,
    )} ETH: ${formatPercent(data.data.market_cap_percentage.eth / 100)}`;
    return (
        <div className={styles.statBar}>
            <div className={styles.fadeRight} />
            <div className={styles.wrapper}>
                <div>
                    <Text className={`${styles.statType} ${styles.type}`}>
                        Cryptos: <span>{coins}</span>
                    </Text>
                    <Text className={`${styles.statType} ${styles.type}`}>
                        Exchanges: <span>{exchanges}</span>
                    </Text>
                    <Text className={`${styles.statType} ${styles.type}`}>
                        Market Cap: <span>{formatUSDNoDecimal(marketCap)}</span>
                    </Text>
                    <Text className={`${styles.statType} ${styles.type}`}>
                        Volume: <span>{formatUSDNoDecimal(volume)}</span>
                    </Text>
                    <Text className={`${styles.statType} ${styles.type}`}>
                        Dominance: <span>{dominance}</span>
                    </Text>
                    <Text className={`${styles.statType} ${styles.type}`}>
                        <GasStation className={styles.icon} />
                        ETH Gas: <span>{ethereum.currentBaseFee} Gwei</span>
                    </Text>
                </div>
                <div>
                    <ApiStatus />
                </div>
            </div>
        </div>
    );
};

export default StatBar;
