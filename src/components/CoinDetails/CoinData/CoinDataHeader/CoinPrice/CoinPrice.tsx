/* eslint-disable react/jsx-no-useless-fragment */
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FC } from 'react';
import { formatCrypto, formatPercent } from '../../../../../utils/formatters';
import styles from './CoinPrice.module.scss';

const { Text, Title } = Typography;

type Tcoinprice = {
    currentCoinPrice: number;
    coinName: string;
    priceChange: number;
};


const CoinPrice: FC<Tcoinprice> = ({ currentCoinPrice, coinName, priceChange }) =>
    <>
        {currentCoinPrice !== 1 &&
            <div className={styles.topCurrenciesContainer}>
                <Title className={`${styles.cryptoPrice} ${styles.price}`} level={5}>
                    {currentCoinPrice ? formatCrypto(currentCoinPrice) : '0'} {coinName}
                </Title>
                {priceChange ?
                    <Text
                        className={`${styles.highestPercentage} ${styles.percentageCrypto} ${priceChange > 0 && styles.green}`}>
                        {priceChange > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        {formatPercent(priceChange / 100)}
                    </Text>
                    : <Text
                        className={`${styles.highestPercentage} ${styles.percentageCrypto} ${styles.gray}`}>
                        0%
                    </Text>
                }
            </div>}
    </>


export default CoinPrice;
