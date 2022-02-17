import { CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Card, Col, Tooltip, Typography } from 'antd'
import { FC } from 'react';
import { formatSupplySymbol } from '../../../../../utils/formatters';
import styles from './CoinStatCard.module.scss';
const { Title, Text } = Typography

type TcoinStatCard = {
    name: string;
    formaterCurrency: (number: number) => string;
    formaterPercent?: (number: number) => string;
    value: number;
    valueChange24h?: number;
    tooltip: string;
    symbol?: string;
}

const CoinStatCard: FC<TcoinStatCard> = ({ name, formaterCurrency, formaterPercent, value, valueChange24h, tooltip, symbol }) => {
    return (
        <Col span={8}>
            <Card className={`${styles.infoCard} ${styles.info}`}>
                <Title level={5} className={`${styles.statTitle} ${styles.title}`}>
                    {name}
                    <Tooltip placement="bottom" title={tooltip} className={styles.tooltip}>
                        <InfoCircleOutlined />
                    </Tooltip>
                </Title>
                <Title level={5}>
                    <div className={`${styles.priceDifference} ${styles.price}`}>
                        {formaterCurrency(value)}
                        {symbol &&
                            <Text className={`${styles.coinSymbol} ${styles.symbol}`}>{formatSupplySymbol(symbol)}</Text>
                        }
                    </div>
                </Title>
                {valueChange24h && formaterPercent &&
                    <Text className={`${styles.highestPercentage} ${styles.percentageMarket} ${valueChange24h > 0 ? styles.green : styles.red}`}>
                        {valueChange24h > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        {formaterPercent(valueChange24h / 100)}
                    </Text>
                }
            </Card>
        </Col>
    )
}

export default CoinStatCard