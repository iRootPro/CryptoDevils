import {ToTopOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import HTMLReactParser from "html-react-parser"
import { FC } from "react";
import styles from './CoinDescription.module.scss';

const { Title, Text } = Typography

type TcoinDescription = {
    showButton: boolean;
    handleToggleReading: () => void;
    description: string;
    coinName: string;
}

const CoinDescription: FC<TcoinDescription> = ({ showButton, handleToggleReading, description, coinName }) => {

    return (
        <>
            {description &&
                <>
                    <Title className={styles.descriptionTitle} level={3}>What is {coinName}?</Title>
                    <div className={styles.description}>
                        <Text className={styles.descriptionText}>{HTMLReactParser(description)}</Text>
                        {description.length > 1250 && showButton && <VerticalAlignBottomOutlined className={`${styles.readMore} ${styles.read}`} onClick={handleToggleReading} />}
                        {description.length > 1250 && !showButton && <ToTopOutlined className={`${styles.readMore} ${styles.read}`} onClick={handleToggleReading} />}
                    </div>
                </>
            }
        </>
    )
}

export default CoinDescription