/* eslint-disable react/jsx-no-useless-fragment */
import { ToTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { FC, useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../../../hooks/useWindowDimension';
import styles from './CoinDescription.module.scss';

const { Title, Text } = Typography;

type TcoinDescription = {
    switchButton: boolean;
    handleToggleReading: () => void;
    description: string;
    coinName: string;
};

const CoinDescription: FC<TcoinDescription> = ({
    switchButton,
    handleToggleReading,
    description,
    coinName
}) => {
    const { width } = useWindowDimensions()
    const [hideButton, setHideButton] = useState<boolean>(false)
    const descriptionBlock: any = useRef()

    useEffect(() => {
        if (width < 1431) {
            descriptionBlock?.current?.clientHeight > 690 ? setHideButton(false) : setHideButton(true) //eslint-disable-line
        } else {
            descriptionBlock?.current?.clientHeight > 450 ? setHideButton(false) : setHideButton(true) //eslint-disable-line
        }
    }, [width, description])

    return <>
        {description && (
            <>
                <Title className={styles.descriptionTitle} level={3}>
                    What is {coinName}?
                </Title>
                <div ref={descriptionBlock} className={styles.description}>
                    <Text className={styles.descriptionText}>
                        {HTMLReactParser(description)}
                    </Text>
                </div>
                <div className={styles.buttonContainer}>
                    {!hideButton &&
                        switchButton && (
                            <VerticalAlignBottomOutlined
                                className={`${styles.readMore} ${styles.bottom}`}
                                onClick={handleToggleReading}
                            />
                        )
                    }
                    {!hideButton &&
                        !switchButton && (
                            <ToTopOutlined
                                className={`${styles.readMore} ${styles.top}`}
                                onClick={handleToggleReading}
                            />
                        )
                    }
                </div>
            </>
        )}
    </>
};

export default CoinDescription;
