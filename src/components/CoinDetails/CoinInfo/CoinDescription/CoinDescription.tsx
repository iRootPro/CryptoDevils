/* eslint-disable react/jsx-no-useless-fragment */
import { ToTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { FC } from 'react';
import styles from './CoinDescription.module.scss';

const { Title, Text } = Typography;

type TcoinDescription = {
    switchButton: boolean;
    handleToggleReading: () => void;
    description: string;
    coinName: string;
    hideButton: boolean;
};

const CoinDescription: FC<TcoinDescription> = ({
    switchButton,
    handleToggleReading,
    description,
    coinName,
    hideButton,
}) => (
    <>
        {description && (
            <>
                <Title className={styles.descriptionTitle} level={3}>
                    What is {coinName}?
                </Title>
                <div className={styles.description}>
                    <Text className={styles.descriptionText}>
                        {HTMLReactParser(description)}
                    </Text>
                    {!hideButton &&
                        switchButton && (
                            <VerticalAlignBottomOutlined
                                className={`${styles.readMore} ${styles.read}`}
                                onClick={handleToggleReading}
                            />
                        )
                    }
                    {!hideButton &&
                        !switchButton && (
                            <ToTopOutlined
                                className={`${styles.readMore} ${styles.read}`}
                                onClick={handleToggleReading}
                            />
                        )
                    }
                </div>
            </>
        )}
    </>
);

export default CoinDescription;
