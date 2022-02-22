import { Card, Col, Row } from 'antd';
import { FC } from 'react';
import tooltip from '../../../../constants/tooltip';
import { ICoinIdData } from '../../../../types/ICoin';
import {
    formatCrypto,
    formatPercent,
    formatSupply,
    formatUSD,
} from '../../../../utils/formatters';
import styles from './CoinGlobalStats.module.scss';
import CoinGlobalSummary from './CoinGlobalSummary/CoinGlobalSummary';
import CoinStatCard from './CoinStatCard/CoinStatCard';

type TcoinGlobalStats = {
    data: ICoinIdData;
};

const CoinGlobalStats: FC<TcoinGlobalStats> = ({ data }) => {
    const marketCap = data.market_data.market_cap.usd;
    const marketCapChange24h =
        data.market_data.market_cap_change_percentage_24h;
    const volume = data.market_data.total_volume.usd;
    const circulatingSupply = data.market_data.circulating_supply;
    const totalSupply = data.market_data.total_supply;
    const { symbol } = data;
    return (
        <>
            <div className={styles.globalStatsContainer}>
                <CoinStatCard
                    name="Market Cap"
                    formaterCurrency={formatUSD}
                    formaterPercent={formatPercent}
                    value={marketCap}
                    valueChange24h={marketCapChange24h}
                    tooltip={tooltip.marketCap}
                />
                <CoinStatCard
                    name="Volume"
                    formaterCurrency={formatUSD}
                    value={volume}
                    tooltip={tooltip.volume}
                />
                <CoinStatCard
                    name="Circulating supply"
                    formaterCurrency={formatSupply}
                    value={circulatingSupply}
                    tooltip={tooltip.supply}
                    symbol={symbol}
                />
            </div>
            <Row>
                <Col span={24}>
                    <Card>
                        <CoinGlobalSummary
                            value={totalSupply}
                            tooltip="Total Supply:"
                            formater={formatSupply}
                        />
                        <CoinGlobalSummary
                            value={volume / marketCap}
                            tooltip="Volume/Market Cap:"
                            formater={formatCrypto}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CoinGlobalStats;
