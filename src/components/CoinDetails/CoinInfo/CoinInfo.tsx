import React, { FC, useCallback, useEffect, useState } from 'react';
import { Card, Col, Menu, Typography } from 'antd';
import {
    GithubOutlined,
    LinkOutlined,
    RedditOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import styles from './CoinInfo.module.scss';
import { ICoinIdData } from '../../../types/ICoin';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { formatDescription, formatUrl } from '../../../utils/formatters';
import CoinDescription from './CoinDescription/CoinDescription';
import CoinInfoHeader from './CoinInfoHeader/CoinInfoHeader';
import CoinRanking from './CoinRanking/CoinRanking';
import useWindowDimensions from '../../../hooks/useWindowDimension';

type TcoinInfoProps = {
    data: ICoinIdData;
    isFetching: boolean;
};
type TcardHeight = string | number;
type Tdescription = string;
type TswitchButton = boolean;
type TtoggleReading = () => void;
type ThideButton = boolean;

const { Text } = Typography;

const menuTemplate = (datapath: string[]) => (
    <Menu>
        {datapath.map(
            (item) =>
                item && (
                    <Menu.Item key={item}>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={item}
                        >
                            {item}
                        </a>
                    </Menu.Item>
                ),
        )}
    </Menu>
);

const CoinInfo: FC<TcoinInfoProps> = ({ isFetching, data }) => {
    const coinName = data.name;
    const coinSymbol = data.symbol;
    const descriptionEN = data.description.en;
    const image = data.image.large;
    const rank = data.market_cap_rank;
    const genesisDate = data.genesis_date;
    const { categories } = data;
    const url = data.links.homepage[0];
    const { id } = data;

    const [cardHeight, SetCardHeight] = useState<TcardHeight>(670);
    const [description, setDescription] = useState<Tdescription>(descriptionEN);
    const [switchButton, setSwitchButton] = useState<TswitchButton>(true);
    const [hideButton, setHideButton] = useState<ThideButton>(false);
    const { width } = useWindowDimensions()
    useEffect(() => {
        setDescription(
            descriptionEN.length > 1250
                ? formatDescription(descriptionEN, width)
                : descriptionEN,
        );
        if (width <= 992) {
            SetCardHeight('auto')
            setHideButton(true)
        } else {
            setHideButton(false)
        }
        if (description.length === descriptionEN.length) {
            setHideButton(true)
        } else {
            setHideButton(false)
        }
    }, [descriptionEN, width, hideButton]);

    const handleToggleReading: TtoggleReading = useCallback(() => {
        if (switchButton) {
            SetCardHeight('auto');
            setDescription(descriptionEN);
            setSwitchButton(false);
        } else {
            SetCardHeight(670);
            setDescription(formatDescription(descriptionEN, width));
            setSwitchButton(true);
        }
    }, [description, switchButton]);

    const menuExplorers = menuTemplate(data.links.blockchain_site);
    const menuChat = menuTemplate(data.links.chat_url);
    const menuSourceCode = menuTemplate(data.links.repos_url.github);

    return (
        <Col xs={24} lg={12}>
            <Card style={{ height: cardHeight, borderColor: 'transparent' }}>
                <CoinInfoHeader
                    isFetching={isFetching}
                    coinName={coinName}
                    coinSymbol={coinSymbol}
                    image={image}
                    id={id}
                />
                <CoinRanking
                    genesisDate={genesisDate}
                    categories={categories}
                    rank={rank}
                />
                <div className={styles.linksMenu}>
                    <Text className={styles.homePage}>
                        <LinkOutlined />
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.homePageLink} ${styles.homePageButton}`}
                            href={url}
                        >
                            {formatUrl(url)}
                        </a>
                    </Text>
                    <DropdownMenu
                        menu={menuExplorers}
                        name="Explorers"
                        datapath={data.links.blockchain_site}
                    >
                        <SearchOutlined />
                    </DropdownMenu>
                    <DropdownMenu
                        menu={menuChat}
                        name="Chat"
                        datapath={data.links.chat_url}
                    >
                        <RedditOutlined />
                    </DropdownMenu>
                    <DropdownMenu
                        menu={menuSourceCode}
                        name="Source Code"
                        datapath={data.links.repos_url.github}
                    >
                        <GithubOutlined />
                    </DropdownMenu>
                </div>
                <CoinDescription
                    hideButton={hideButton}
                    switchButton={switchButton}
                    handleToggleReading={handleToggleReading}
                    description={description}
                    coinName={coinName}
                />
            </Card>
        </Col>
    );
};

export default React.memo(CoinInfo);
