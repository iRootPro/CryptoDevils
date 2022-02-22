import { Space, Typography } from 'antd';
import { FC } from 'react';
import styles from './CoinGlobalSummary.module.scss';

const { Title } = Typography;

type TcoinGlobalSummary = {
    value: number;
    tooltip: string;
    formater: (number: number) => string;
};

const CoinGlobalSummary: FC<TcoinGlobalSummary> = ({value, tooltip, formater}) => 
        <Title level={5} className={`${styles.statTitle} ${styles.stat}`}>
            <Space>
                {tooltip}
                <div className={`${styles.priceDifference} ${styles.price}`}>
                    {Number.isFinite(value) ? formater(value) : 0}
                </div>
            </Space>
        </Title>

export default CoinGlobalSummary;
