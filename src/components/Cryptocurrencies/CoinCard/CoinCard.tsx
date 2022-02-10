import { Avatar, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes';
import ICoin from '../../../types/ICoin'
import styles from './CoinCard.module.scss';

type CoinCardProps = {
    coin: ICoin
}

const { Text } = Typography

const CoinCard: FC<CoinCardProps> = ({ coin }) => {
    const { id, image, name, symbol } = coin
    return (
        <Link to={`${ROUTES.coin}/${id}`} className={styles.link}>
            <div className={styles.wrapper}>
                <Avatar src={`${image}`} />
                <Text className={styles.name}>{name}</Text>
                <Text className={styles.symbol}>{symbol}</Text>
            </div>
        </Link>
    )
}

export default CoinCard