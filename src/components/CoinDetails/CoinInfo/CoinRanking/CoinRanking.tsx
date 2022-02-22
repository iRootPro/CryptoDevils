import { Typography } from 'antd';
import { FC } from 'react';
import { formatDate } from '../../../../utils/formatters';
import styles from './CoinRanking.module.scss';

const { Text } = Typography;

type TcoinRanking = {
    rank: number;
    genesisDate: string;
    categories: string[];
};

const CoinRanking: FC<TcoinRanking> = ({ rank, genesisDate, categories }) => (
    <>
        <div className={styles.rankingSection}>
            <Text className={`${styles.rankingText} ${styles.text}`}>
                {rank ? `Rank #${rank}` : 'No RANK'}
            </Text>
            {genesisDate && (
                <Text className={`${styles.rankingText} ${styles.text}`}>
                    since: {formatDate(genesisDate)}
                </Text>
            )}
        </div>
        <div className={styles.rankingSection}>
            {categories.map(
                (category, index) =>
                    category && (
                        <Text
                            className={styles.category}
                            key={`category_${index + 1}`}
                        >
                            {category}
                        </Text>
                    ),
            )}
        </div>
    </>
);

export default CoinRanking;
