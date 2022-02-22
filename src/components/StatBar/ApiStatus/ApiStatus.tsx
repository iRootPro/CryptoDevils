import { Typography } from 'antd';
import { FC } from 'react';
import { useGetGlobalStatsQuery } from '../../../services/api';
import styles from './ApiStatus.module.scss';

const { Text } = Typography;

const ApiStatus: FC = () => {
    const { data } = useGetGlobalStatsQuery('');

    return (
        <Text className={`${styles.apiStatus} ${styles.status}`}>
            API Status:
            {data ? (
                <div className={styles.green} />
            ) : (
                <div className={styles.red} />
            )}
        </Text>
    );
};

export default ApiStatus;
