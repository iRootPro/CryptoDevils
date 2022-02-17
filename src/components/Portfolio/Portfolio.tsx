import React, {FC, useEffect, useMemo, useState} from 'react'
import {PlusCircleFilled, DollarCircleOutlined, UserOutlined, DeleteFilled} from "@ant-design/icons";
import styles from './Portfolio.module.scss';
import {Button, Divider, Table, Modal, Input, DatePicker, Radio, RadioChangeEvent} from "antd";
import {Margin} from "../common/Margin";
import {MARGIN} from "../../constants/margins";
import Title from "antd/es/typography/Title";
import { Typography } from 'antd';
import moment from "moment";
import {v4 as uuid} from 'uuid'
import {addPortfolio, addTrade, PortfolioType, removePortfolio} from "../../redux/reducers/portfolioSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {selectPortfolios} from "../../redux/selectors/portfolioSelectors";

const { Text } = Typography;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Avg.Buy price',
        dataIndex: 'avgPrice',
        key: 'avgPrice',
    },
];

type DataType = {
    key: string,
    name: string,
    quantity: number
    avgPrice: string,
}

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
    const [errorExsitName, setErrorExistName] = useState<boolean>(false)
    const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null)
    const [data, setData] = useState<Array<DataType>>([])

    const portfolios = useAppSelector(selectPortfolios);

    const dispatch = useAppDispatch();

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


    const portfolio = useMemo(() => {
        return portfolios.find(p => p.id === selectedPortfolio)
    }, [selectedPortfolio, portfolios])

    useEffect(() => {
        const rawData: Array<DataType> = []
        if(!portfolio) return
        Object.keys(portfolio.summaryCoinsInfo).forEach(coin => {
            rawData.push({
                key: coin,
                name: coin,
                quantity: portfolio.summaryCoinsInfo[coin].quantity,
                avgPrice: `$${portfolio.summaryCoinsInfo[coin].avgPrice}`
            })
        })
        setData(rawData)
    }, [portfolio])


    const sumOfPortfolio = useMemo(() => {
        if(!portfolio) return 0
        const obj = Object.values(portfolio.trades).flat(1)
    }, [portfolio])

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleChangePricePerCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCoin(Number(e.target.value))
    }

    const handleClickCancelAddNew = () => {
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

    const handleClickAddNew = () => {
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
                date,
                id: uuid()
            }
            setShowNewTradeModal(false)
            if(selectedPortfolio) {
                dispatch(addTrade({
                    trade,
                    portfolioId: selectedPortfolio,
                }))
            }
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
        setErrorExistName(false)
        setNewPortfolioName(e.target.value)
    }

    const handleClickNewPortfolio = () => {
        if(!newPortfolioName) {
            setErrorPortfolioName(true)
        } else if (portfolios.find(p => p.name === newPortfolioName)) {
            setErrorExistName(true)
        }
        else {
            const newPortfolio: PortfolioType = {
                id: uuid(),
                name: newPortfolioName,
                trades: {},
                totalSum: 0,
                summaryCoinsInfo: {},
            }
            dispatch(addPortfolio(newPortfolio))
            setShowNewPortfolioModal(false)
            setNewPortfolioName('')
        }

    }

    const handleClickCancelPortfolio = () => {
        setShowNewPortfolioModal(false)
        setErrorPortfolioName(false)
        setErrorExistName(false)
        setNewPortfolioName('')
    }

    const onClickSelectPortfolio = (id: string) => {
        setSelectedPortfolio(id)
    }

    const handleClickRemovePortfolio = (id: string) => {
        dispatch(removePortfolio(id))
    }

    useEffect(() => {
        setSelectedPortfolio(null)
    }, [portfolios.length])

    console.log('portfolio', portfolio)


  // @ts-ignore
    // @ts-ignore
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
            {
                portfolios.map(p => {
                    return (
                        <div
                            key={p.id}
                            className={`${styles.allPortfolio} ${p.id === selectedPortfolio && styles.selectedPortfolio}`}
                            onClick={() => onClickSelectPortfolio(p.id)}
                        >
                            <UserOutlined style={{fontSize: 36, marginRight: 10}}
                        />
                            <div className={styles.infoBlock}>
                                <div>{p.name}</div>
                                <div>≈${p.totalSum}</div>
                            </div>
                                <div className={styles.actionButton}>
                                    { p.id === selectedPortfolio &&
                                    <DeleteFilled onClick={() => handleClickRemovePortfolio(p.id)} /> }
                                </div>

                        </div>
                    )
                })
            }

        <div className={styles.createPortfolio} onClick={()=> setShowNewPortfolioModal(true)}><PlusCircleFilled /> Create portfolio</div>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.RightBlock}>
                <div>Current Balance</div>
                <div className={styles.summaryButtonBlock}>
                    <div className={styles.summary}>$635.10</div>
                    {portfolios.length > 0 && selectedPortfolio && <div><Button type="primary" shape="round" icon={<PlusCircleFilled />} onClick={() => setShowNewTradeModal(true)}>Add new</Button></div>}
                </div>
                <Margin vertical={MARGIN.xxl}>
                    <Title level={4}>Your assets</Title>
                </Margin>
                {
                    portfolio
                        ? <Table dataSource={data} columns={columns} />
                        : <Title level={5}>Please, select portfolios</Title>
                }
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
                    value={newPortfolioName}
                />
                {errorExsitName && <Text style={{color: 'red', margin: 5}}>Name already used</Text>}
                {errorPortfolioName && <Text style={{color: 'red', margin: 5}}>Filed is required</Text>}
            </Modal>
            <Modal
            centered
            visible={showNewTradeModal}
            onOk={handleClickAddNew}
            onCancel={handleClickCancelAddNew}
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
