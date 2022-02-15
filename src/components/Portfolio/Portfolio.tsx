import React, {FC, useEffect, useState} from 'react'
import {PlusCircleFilled, DollarCircleOutlined, UserOutlined} from "@ant-design/icons";
import styles from './Portfolio.module.scss';
import {Button, Divider, Table, Modal, Input, DatePicker, Radio, RadioChangeEvent} from "antd";
import {Margin} from "../common/Margin";
import {MARGIN} from "../../constants/margins";
import Title from "antd/es/typography/Title";
import { Typography } from 'antd';
import moment from "moment";
import {v4 as uuid} from 'uuid'

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

const optionsTradeDirection = [
    { label: 'Buy', value: 'buy' },
    { label: 'Sell', value: 'sell' },
];

const dateFormat = 'DD/MM/YYYY';
const dateNow = moment().format(dateFormat)

const Portfolio:FC = () => {
    const [showNewPortfolioModal, setShowNewPortfolioModal] = useState<boolean>(false)
    const [showNewTradeModal, setShowNewTradeModal] = useState<boolean>(false)
    const [totalSpent, setTotalSpent] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [pricePerCoin, setPricePerCoin] = useState<number>(0)
    const [direction, setDirection] = useState<DirectionType>('buy')
    const [date, setDate] = useState<string>(dateNow)
    const [newPortfolioName, setNewPortfolioName] = useState<string>('')
    const [errorPortfolioName, setErrorPortfolioName] = useState<boolean>(false)
    const [errorQuantity, setErrorQuantity] = useState<boolean>(false)
    const [errorPriceCoin, setErrorPriceCoin] = useState<boolean>(false)


    const handleCreatePortfolio = () => {
        setShowNewPortfolioModal(true)
    }

    useEffect(() => {
        setTotalSpent(pricePerCoin * quantity)
    }, [quantity, pricePerCoin])

    useEffect(() => {
        if(quantity) {
            setErrorQuantity(false)
        }
    }, [quantity])

    useEffect(() => {
        if(quantity) {
            setErrorPriceCoin(false)
        }
    }, [pricePerCoin])

    useEffect(() => {
        if(newPortfolioName) {
            setErrorPortfolioName(false)
        }
    }, [newPortfolioName])

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleChangePricePerCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCoin(Number(e.target.value))
    }

    const handleClickCancel = () => {
        clearForm()
        setShowNewTradeModal(false)
        setErrorQuantity(false)
        setErrorPriceCoin(false)
    }
    const clearForm = () => {
        setQuantity(0)
        setPricePerCoin(0)
        setDate(dateNow)
    }

    const handleClickOk = () => {
        if(!quantity) {
            setErrorQuantity(true)
        } else if(!pricePerCoin) {
            setErrorPriceCoin(true)
        }
        else {
            const trade = {
                coin: 'BTC',
                price: pricePerCoin,
                quantity,
                totalSpent,
                direction,
                date
            }
            setShowNewTradeModal(false)
            clearForm()
        }
    }

    const handleChangeDirection = (e: RadioChangeEvent) => {
        setDirection(e.target.value as DirectionType)
    }

    const handleChangeDate = (date: moment.Moment | null, dateString: string) => {
        setDate(dateString)
    }

    const handleChangePortfolioName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(newPortfolioName) setErrorPortfolioName(false)
        setNewPortfolioName(e.target.value)
    }

    const handleClickNewPortfolio = () => {
        const newPortfolio = {
            id: uuid(),
            name: newPortfolioName,
            trades: {}
        }
        if(!newPortfolioName) {
            setErrorPortfolioName(true)
        } else {
            setShowNewPortfolioModal(false)
            setNewPortfolioName('')
        }
    }

    const handleClickCancelPortfolio = () => {
        setShowNewPortfolioModal(false)
        setErrorPortfolioName(false)
        setNewPortfolioName('')
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
                    <div><Button type="primary" shape="round" icon={<PlusCircleFilled />} onClick={() => setShowNewTradeModal(true)}>Add new</Button></div>
                </div>
                <Margin vertical={MARGIN.xxl}>
                    <Title level={4}>Your assets</Title>
                </Margin>
                <Table dataSource={data} columns={columns} />
            </div>
        </div>
            <Modal
                centered
                visible={showNewPortfolioModal}
                onOk={handleClickNewPortfolio}
                onCancel={handleClickCancelPortfolio}
                width={500}
            >
                <Title level={4}>Create portfolio</Title>
                <Text strong style={{fontSize: 14}}>Portfolio name</Text>
                <Input
                    style={{borderRadius: '10px', height: 40}}
                    placeholder="Enter your portfolio name..."
                    onChange={handleChangePortfolioName}
                />
                {errorPortfolioName && <Text style={{color: 'red', margin: 5}}>Filed is required</Text>}
            </Modal>
        <Modal
        centered
        visible={showNewTradeModal}
        onOk={handleClickOk}
        onCancel={handleClickCancel}
        width={500}
        >
            <Title level={3}>Add Transaction</Title>
            <div className={styles.direction}>
                <Radio.Group
                    style={{display:"flex", width: '100%'}}
                    options={optionsTradeDirection}
                    onChange={handleChangeDirection}
                    value={direction}
                    optionType="button"
                    buttonStyle="solid"
                />
            </div>

            <div style={{display: "flex", justifyContent: 'space-between'}}>
                <div style={{display: "flex", flexDirection: "column", flex: 1, padding: 5}}>
                    <Title level={5}>Quantity</Title>
                    <Input
                        value={quantity}
                        type="number"
                        style={{borderRadius: 10}}
                        onChange={handleChangeQuantity}
                    />
                    { errorQuantity && <Text style={{color: "red", margin: 5}}>Field is requires</Text>}
                </div>
                <div style={{display: "flex", flexDirection: "column", flex: 1, padding: 5}}>
                    <Title level={5}>Price Per Coin</Title>
                    <Input
                        value={pricePerCoin}
                        style={{borderRadius: 10}}
                        type="number"
                        onChange={handleChangePricePerCoin}
                    />
                    {errorPriceCoin && <Text style={{color: "red", margin: 5}}>Field is requires</Text>}
                </div>
                <div style={{display: "flex", flexDirection: "column", flex: 1, padding: 5}}>
                    <Title level={5}>Date</Title>
                    <DatePicker
                        defaultValue={moment(dateNow, dateFormat)}
                        value={moment(date, dateFormat)}
                        format={dateFormat}
                        style={{borderRadius: 10}}
                        onChange={(date, dateString) => handleChangeDate(date, dateString)}
                    />
                </div>
            </div>
            <div style={{background: '#f8f8f8', borderRadius: 10, padding: 10, margin: 5}}>
                <Title level={5}>Total spent</Title>
                <Text strong style={{fontSize: 30}}>${totalSpent}</Text>
            </div>
        </Modal>
    </div>
  )
}

export default Portfolio


type DirectionType = 'buy' | 'sell'
