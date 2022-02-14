import React, {FC, useState} from 'react'
import {PlusCircleFilled, DollarCircleOutlined, UserOutlined, DownloadOutlined} from "@ant-design/icons";
import styles from './Portfolio.module.scss';
import {Button, Divider, Table, Modal, Input} from "antd";
import {Margin} from "../common/Margin";
import {MARGIN} from "../../constants/margins";
import Title from "antd/es/typography/Title";
import { Typography } from 'antd';

const { Text } = Typography;

const data = [
    {
        key: '1',
        name: 'Solana',
        price: 101.48,
        change_24h: 7.74,
        avg_buy_price: 13,
    },
    {
        key: '2',
        name: 'Bitcoin',
        price: 10000,
        change_24h: 15.03,
        avg_buy_price: 9000,
    },
    {
        key: '3',
        name: 'Etherium',
        price: 3200,
        change_24h: 12,
        avg_buy_price: 2700,
    },
    {
        key: '4',
        name: 'Harmony',
        price: 101.48,
        change_24h: 7.74,
        avg_buy_price: 13,
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '24h',
        dataIndex: 'change_24h',
        key: 'change_24h',
    },
    {
        title: 'Avg.Buy Price',
        dataIndex: 'avg_buy_price',
        key: 'avg_buy_price',
    },
];

const Portfolio:FC = () => {
    const [showNewPortfolioModal, setShowNewPortfolioModal] = useState<boolean>(false)

    const handleCreatePortfolio = () => {
        setShowNewPortfolioModal(true)
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.leftSide}>
        <div className={styles.allPortfolio}><DollarCircleOutlined style={{fontSize: 36, marginRight: 10, color: "blue"}} />
            <div className={styles.infoBlock}>
                <div>All portfolios</div>
                <div>≈$895</div>
            </div>
        </div>
        <Divider/>
        <div className={styles.allPortfolio}><UserOutlined style={{fontSize: 36, marginRight: 10}} />
            <div className={styles.infoBlock}>
                <div>First portfolio</div>
                <div>≈$300</div>
            </div>
        </div>
        <div className={styles.allPortfolio}><UserOutlined style={{fontSize: 36, marginRight: 10}} />
            <div className={styles.infoBlock}>
                <div>Second portfolio</div>
                <div>≈$300</div>
            </div>
        </div>
        <div className={styles.allPortfolio}><UserOutlined style={{fontSize: 36, marginRight: 10}} />
            <div className={styles.infoBlock}>
                <div>My portfolio</div>
                <div>≈$300</div>
            </div>
        </div>

        <div className={styles.createPortfolio} onClick={handleCreatePortfolio}><PlusCircleFilled /> Create portfolio</div>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.RightBlock}>
                <div>Current Balance</div>
                <div className={styles.summaryButtonBlock}>
                    <div className={styles.summary}>$635.10</div>
                    <div><Button type="primary" shape="round" icon={<PlusCircleFilled />}>Add new</Button></div>
                </div>
                <Margin vertical={MARGIN.xxl}>
                    <Title level={4}>Your assets</Title>
                </Margin>
                <Table dataSource={data} columns={columns} />
            </div>
        </div>
            <Modal
                title="Create portfolio"
                centered
                visible={showNewPortfolioModal}
                onOk={() => setShowNewPortfolioModal(false)}
                onCancel={() => setShowNewPortfolioModal(false)}
                width={500}
            >
                <Text strong style={{fontSize: 14}}>Portfolio name</Text>
                <Input style={{borderRadius: '10px', height: 40}}
                    placeholder="Enter your portfolio name..."
                />

            </Modal>
    </div>
  )
}

export default Portfolio
