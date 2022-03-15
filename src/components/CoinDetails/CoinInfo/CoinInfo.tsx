import React, { FC, useState } from 'react';
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
import { formatUrl } from '../../../utils/formatters';
import CoinDescription from './CoinDescription/CoinDescription';
import CoinInfoHeader from './CoinInfoHeader/CoinInfoHeader';
import CoinRanking from './CoinRanking/CoinRanking';
import useWindowDimensions from '../../../hooks/useWindowDimension';

type TcoinInfoProps = {
    data: ICoinIdData;
    isFetching: boolean;
};
type TcardHeight = string | number;
type TswitchButton = boolean;
type TtoggleReading = () => void;

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
    const url = data.links.homepage[0];
    const { categories, id } = data;

    const { width } = useWindowDimensions()
    const initialHeight = width < 1431 ? 960 : 670

    const [cardHeight, SetCardHeight] = useState<TcardHeight>(initialHeight);
    const [switchButton, setSwitchButton] = useState<TswitchButton>(true);

    const handleToggleReading: TtoggleReading = () => {
        if (switchButton) {
            SetCardHeight(4500);
            setSwitchButton(false);
        } else {
            SetCardHeight(initialHeight);
            setSwitchButton(true);
        }
    };

    const menuExplorers = menuTemplate(data.links.blockchain_site);
    const menuChat = menuTemplate(data.links.chat_url);
    const menuSourceCode = menuTemplate(data.links.repos_url.github);

    return (
        <Col xs={24} lg={12}>
            <Card id='card' style={{
                maxHeight: cardHeight, borderColor: 'transparent', overflowY: 'hidden'
            }}>
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
                    switchButton={switchButton}
                    handleToggleReading={handleToggleReading}
                    description={descriptionEN}
                    coinName={coinName}
                />
            </Card>
        </Col>
    );
};

export default React.memo(CoinInfo);
