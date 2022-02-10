import { Avatar, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ICoin from '../../../types/ICoin'
import styles from './CoinCard.module.scss';

type CoinCardProps = {
    coin: ICoin
}

const { Title } = Typography

const CoinCard: FC<CoinCardProps> = ({ coin }) => {
    const { id, image, name } = coin
    return (
        <Link to={`coin/${id}`} className={styles.link}>
            <div className={styles.wrapper}>
                <Avatar src={`${image}`} />
                <Title className={styles.name}>{name}</Title>
            </div>
        </Link>
    )
}

export default CoinCard