import { Progress } from 'antd';
import { FC } from 'react';
import COLORS from '../../../../constants/colors';
import { ICoinIdData } from '../../../../types/ICoin';
import progressValue from '../../../../utils/progressPercentCalculator';

import styles from './CoinProgressBar.module.scss';
import CoinProgressTooltip from './CoinProgressTooltip/CoinProgressTooltip';

type TcoinProgressBar = {
    data: ICoinIdData;
};

const CoinProgressBar: FC<TcoinProgressBar> = ({ data }) => {
    const high24h = data.market_data.high_24h.usd;
    const low24h = data.market_data.low_24h.usd;
    const currentPrice = data.market_data.current_price.usd;
    const progressPercent = progressValue(low24h, high24h, currentPrice);
    return (
        <div className={styles.progressWrapper}>
            <CoinProgressTooltip value24h={low24h} text="Low: " />
            <Progress
                className={`${styles.progressBar} ${styles.progress}`}
                strokeColor={COLORS.blue}
                trailColor={COLORS.gray}
                strokeWidth={12}
                showInfo={false}
                strokeLinecap="square"
                percent={progressPercent}
            />
            <CoinProgressTooltip value24h={high24h} text="High: " />
        </div>
    );
};

export default CoinProgressBar;
