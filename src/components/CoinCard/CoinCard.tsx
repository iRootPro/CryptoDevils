import { Avatar, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes';
import {ICoin, ICoinCard} from '../../types/ICoin'
import styles from './CoinCard.module.scss';

const { Text } = Typography

const CoinCard: FC<ICoinCard> = ({ id, image, name, symbol }) => {
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
