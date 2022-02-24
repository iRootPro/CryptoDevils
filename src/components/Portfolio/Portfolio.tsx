import React, {FC, useEffect, useMemo, useState} from 'react';
import {
    DeleteFilled,
    DollarCircleOutlined,
    EditOutlined,
    PieChartOutlined,
    PlusCircleFilled,
    StockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Button, DatePicker, Divider, Input, Modal, Radio, RadioChangeEvent, Table, Typography,} from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import {v4 as uuid} from 'uuid';
import {useSelector} from 'react-redux';
import styles from './Portfolio.module.scss';
import Margin from '../common/Margin';
import MARGIN from '../../constants/margins';
import {
    addPortfolio,
    addTrade,
    changePortfolioName,
    PortfolioType,
    removePortfolio,
} from '../../redux/reducers/portfolioSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {selectPortfolios, selectSelectedCoinForTrade,} from '../../redux/selectors/portfolioSelectors';
import {formatPercent, formatUSDforTable, formatUSDforTableMoney,} from '../../utils/formatters';
import {SearchEngine} from '../components';
import {useGetCoinsByIdsQuery} from '../../services/api';
import CoinCard from '../CoinCard/CoinCard';
import {ICoinRaw} from '../../types/ICoin';
import {Chart} from '../Chart';
import getAveragePrice from '../../utils/getAveragePrice';
import {ItemDataTypePie, PieChart} from '../PieChart/PieChart';
import getAllInvestMoney from '../../utils/getAllInvestMoney';
import InfoError from './InfoError';

const { Text } = Typography;

export type DataType = {
    key: string;
    name: string;
    quantity: number;
    avgPrice: string;
    marketPrice: string;
    image: string;
    change_24h_percent: string;
    profitLoss: string;
    profitLossUSD: string;
};

type DirectionType = 'buy' | 'sell';

const optionsTradeDirection = [
    { label: 'Buy', value: 'buy' },
    { label: 'Sell', value: 'sell' },
];

const dateFormat = 'DD/MM/YYYY';
const dateNow = moment().format(dateFormat);
const Portfolio: FC = () => {
    const [showNewPortfolioModal, setShowNewPortfolioModal] =
        useState<boolean>(false);
    const [showNewTradeModal, setShowNewTradeModal] = useState<boolean>(false);
    const [totalSpent, setTotalSpent] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [pricePerCoin, setPricePerCoin] = useState<number>(0);
    const [direction, setDirection] = useState<DirectionType>('buy');
    const [date, setDate] = useState<string>(dateNow);
    const [newPortfolioName, setNewPortfolioName] = useState<string>('');
    const [errorPortfolioName, setErrorPortfolioName] =
        useState<boolean>(false);
    const [errorQuantity, setErrorQuantity] = useState<boolean>(false);
    const [errorPriceCoin, setErrorPriceCoin] = useState<boolean>(false);
    const [errorExsitName, setErrorExistName] = useState<boolean>(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(
        null,
    );
    const [errorSelectedCoinForTrade, setErrorSelectedCoinForTrade] =
        useState<boolean>(false);
    const [data, setData] = useState<Array<DataType>>([]);
    const [marketData, setMarketData] = useState<ICoinRaw[]>([]);
    const [idChart, setIdChart] = useState<string | null>(null);
    const [pieChartShow, setPieChartShow] = useState<boolean>(false);
    const [showEditPortfolioModal, setShowEditPortfolioModal] =
        useState<boolean>(false);

    const dispatch = useAppDispatch();

    const portfolios = useAppSelector(selectPortfolios);
    const selectCoinForTrade = useSelector(selectSelectedCoinForTrade);

    const summary = getAllInvestMoney();

    const colorChange = (value: string) =>
        value.split('-').length > 1 ? 'red' : 'green';

    const columns = [
        {
            title: 'Name',
            dataIndex: ['name', 'image'],
            key: 'name',
            render: (value: any, record: DataType) => {
                const { name, image } = record;
                return (
                    <CoinCard
                        id={name.toLowerCase()}
                        key={name}
                        image={image}
                        name={name}
                        symbol=""
                        type="cryptocurrencies"
                    />
                );
            },
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
        {
            title: 'Market Price',
            dataIndex: 'marketPrice',
            key: 'marketPrice',
        },
        {
            title: '24h %',
            dataIndex: 'change_24h_percent',
            key: 'change_24h_percent',
            render: (value: any, record: DataType) => (
                <span style={{ color: colorChange(record.change_24h_percent) }}>
                    {record.change_24h_percent}
                </span>
            ),
        },
        {
            title: 'Profit/Loss %',
            dataIndex: 'profitLoss',
            key: 'profit_loss',
            render: (value: any, record: DataType) => (
                <span style={{ color: colorChange(record.profitLoss) }}>
                    {record.profitLoss}
                </span>
            ),
        },
        {
            title: 'Profit/Loss $',
            dataIndex: 'profitLossUSD',
            key: 'profit_loss_usd',
            render: (value: any, record: DataType) => (
                <span style={{ color: colorChange(record.profitLossUSD) }}>
                    {record.profitLossUSD}
                </span>
            ),
        },
        {
            title: 'chart',
            dataIndex: 'name',
            key: 'action',
            render: (value: any, record: DataType) => (
                <StockOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIdChart(record.name.toLowerCase())}
                />
            ),
        },
    ];

    const columnsTrade = [
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total Spent $',
            dataIndex: 'totalSpent',
            key: 'totalSpent',
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    useEffect(() => {
        setTotalSpent(pricePerCoin * quantity);
    }, [quantity, pricePerCoin]);

    useEffect(() => {
        if (quantity) {
            setErrorQuantity(false);
        }
    }, [quantity]);

    useEffect(() => {
        if (quantity) {
            setErrorPriceCoin(false);
        }
    }, [pricePerCoin]);

    useEffect(() => {
        if (newPortfolioName) {
            setErrorPortfolioName(false);
        }
    }, [newPortfolioName]);

    const portfolio = useMemo(
        () => portfolios.find((p) => p.id === selectedPortfolio),
        [selectedPortfolio, portfolios, marketData],
    );

    const needFetchCoins = useMemo(() => {
        let actualListCoins =
            String(
                Object.keys(portfolio ? portfolio.trades : {}),
            ).toLocaleLowerCase() || '';
        if (!actualListCoins.includes(selectCoinForTrade)) {
            actualListCoins = `${actualListCoins},${selectCoinForTrade}`;
        }
        return actualListCoins;
    }, [portfolio, selectCoinForTrade]);

    const { data: fetchedData } = useGetCoinsByIdsQuery({
        currency: 'usd',
        ids: needFetchCoins,
    });

    const getPriceCurrent = (coin: string) => {
        const foundCoin = marketData.find((c) => c.name === coin);
        if (foundCoin) {
            return foundCoin.current_price;
        }
        return 0;
    };

    const currentBalance = useMemo(() => {
        let currentSum: number = 0;

        if (portfolio) {
            Object.values(portfolio.trades)
                .flat()
                .forEach((trade) => {
                    currentSum += trade.quantity * getPriceCurrent(trade.coin);
                });
        }
        return currentSum;
    }, [marketData, portfolio]);

    useEffect(() => {
        if (fetchedData) {
            setMarketData(fetchedData);
        }
    }, [portfolio]);

    useEffect(() => {
        const rawData: Array<DataType> = [];
        if (!portfolio) return;
        Object.keys(portfolio.summaryCoinsInfo).forEach((coin) => {
            const foundedCoin = marketData?.find((c) => c.name === coin);
            rawData.push({
                key: coin,
                name: coin,
                quantity: portfolio.summaryCoinsInfo[coin].quantity,
                avgPrice: `${formatUSDforTableMoney(
                    getAveragePrice(portfolio.trades[coin]),
                )}`,
                marketPrice: `${formatUSDforTable(
                    foundedCoin?.current_price || 0,
                )}`,
                change_24h_percent: `${formatPercent(
                    foundedCoin?.price_change_percentage_24h
                        ? foundedCoin.price_change_percentage_24h / 100
                        : 0,
                )}`,
                image: foundedCoin?.image || '',
                profitLoss: `${formatPercent(
                    foundedCoin?.current_price
                        ? (foundedCoin.current_price -
                              getAveragePrice(portfolio.trades[coin])) /
                              foundedCoin.current_price
                        : 0,
                )}`,
                profitLossUSD: `${formatUSDforTableMoney(
                    foundedCoin?.current_price
                        ? (foundedCoin.current_price -
                              getAveragePrice(portfolio.trades[coin])) *
                              portfolio.summaryCoinsInfo[coin].quantity
                        : 0,
                )}`,
            });
        });
        setData(rawData);
    }, [portfolio, marketData]);

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleChangePricePerCoin = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPricePerCoin(Number(e.target.value));
    };

    const clearForm = () => {
        setQuantity(0);
        setPricePerCoin(0);
        setDate(dateNow);
    };

    const handleClickCancelAddNew = () => {
        clearForm();
        setShowNewTradeModal(false);
        setErrorQuantity(false);
        setErrorPriceCoin(false);
        setErrorSelectedCoinForTrade(false);
    };

    const firstLetterUpper = (str: string): string =>
        str[0].toUpperCase() + str.substring(1);

    const handleClickAddNew = () => {
        if (!quantity) {
            setErrorQuantity(true);
        } else if (!pricePerCoin) {
            setErrorPriceCoin(true);
        } else if (!selectSelectedCoinForTrade) {
            setErrorSelectedCoinForTrade(true);
        } else {
            const trade = {
                coin: firstLetterUpper(selectCoinForTrade),
                price: pricePerCoin,
                quantity: direction === 'sell' ? -quantity : quantity,
                totalSpent: direction === 'sell' ? -totalSpent : totalSpent,
                direction,
                date,
                id: uuid(),
            };
            setShowNewTradeModal(false);
            if (selectedPortfolio) {
                dispatch(
                    addTrade({
                        trade,
                        portfolioId: selectedPortfolio,
                    }),
                );
            }
            clearForm();
        }
    };

    const handleChangeDirection = (e: RadioChangeEvent) => {
        setDirection(e.target.value as DirectionType);
    };

    const handleChangeDate = (
        dateTime: moment.Moment | null,
        dateString: string,
    ) => {
        setDate(dateString);
    };

    const handleChangePortfolioName = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setErrorExistName(false);
        setNewPortfolioName(e.target.value);
    };

    const handleClickNewPortfolio = () => {
        if (!newPortfolioName) {
            setErrorPortfolioName(true);
        } else if (portfolios.find((p) => p.name === newPortfolioName)) {
            setErrorExistName(true);
        } else {
            const newPortfolio: PortfolioType = {
                id: uuid(),
                name: newPortfolioName,
                trades: {},
                totalSum: 0,
                summaryCoinsInfo: {},
            };
            dispatch(addPortfolio(newPortfolio));
            setShowNewPortfolioModal(false);
            setNewPortfolioName('');
        }
    };

    const handleClickCancelPortfolio = () => {
        setShowNewPortfolioModal(false);
        setErrorPortfolioName(false);
        setErrorExistName(false);
        setNewPortfolioName('');
    };

    const onClickSelectPortfolio = (id: string) => {
        setIdChart(null);
        setSelectedPortfolio(id);
    };

    const handleClickRemovePortfolio = (id: string) => {
        dispatch(removePortfolio(id));
    };

    const handleEditPortfolioName = () => {
        setShowEditPortfolioModal(true);
    };

    const handleClickCancelEditPortfolio = () => {
        setShowEditPortfolioModal(false);
    };

    const handleNewNamePortfolio = () => {
        if (!selectedPortfolio) return;
        if (!newPortfolioName) {
            setErrorPortfolioName(true);
            return;
        }
        dispatch(
            changePortfolioName({
                id: selectedPortfolio,
                name: newPortfolioName,
            }),
        );
        setShowEditPortfolioModal(false);
        setNewPortfolioName('');
    };

    const averagePriceByCoin = useMemo(() => {
        if (idChart && portfolio) {
            return getAveragePrice(portfolio.trades[firstLetterUpper(idChart)]);
        }
        return undefined;
    }, [idChart]);

    const getDataForPie = useMemo(() => {
        const dataPie: ItemDataTypePie[] = [];
        if (portfolio) {
            const coins = Object.keys(portfolio.trades);
            coins.forEach((coin) => {
                const foundCoin = dataPie.find((c) => c.name === coin);
                let sumTotal: number = 0;
                portfolio.trades[coin].forEach((trade) => {
                    sumTotal += trade.totalSpent;
                });
                if (foundCoin) {
                    foundCoin.y += totalSpent;
                } else {
                    dataPie.push({ name: coin, y: sumTotal });
                }
                sumTotal = 0;
            });
        }
        return dataPie;
    }, [portfolio, marketData]);

    const handleClickTogglePie = () => {
        setPieChartShow((prevState) => !prevState);
    };

    useEffect(() => {
        setSelectedPortfolio(null);
    }, [portfolios.length]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.allPortfolio}>
                    <DollarCircleOutlined
                        style={{
                            fontSize: 36,
                            marginRight: 10,
                            color: '#FF7E21',
                        }}
                    />
                    <div className={styles.infoBlock}>
                        <div>All portfolios</div>
                        <div>
                            Invest money{' '}
                            <Text strong>
                                ≈{formatUSDforTableMoney(summary.summaryInvest)}
                            </Text>
                        </div>
                        <div>
                            Current money
                            <Text
                                strong
                                style={{
                                    color:
                                        summary.summaryInvest >
                                        summary.summaryDataMarket
                                            ? 'red'
                                            : 'green',
                                }}
                            >
                                ≈
                                {formatUSDforTableMoney(
                                    summary.summaryDataMarket,
                                )}
                            </Text>
                        </div>
                    </div>
                </div>
                <Divider />
                {portfolios.map((p) => (
                    <div
                        aria-hidden="true"
                        key={p.id}
                        className={`
                            ${styles.allPortfolio} ${
                        p.id === selectedPortfolio &&
                            styles.selectedPortfolio
                    }
                            `}
                        onClick={() => onClickSelectPortfolio(p.id)}
                    >
                        <div className={styles.userWrapper}>
                            <UserOutlined
                                style={{ fontSize: 36, marginRight: 10 }}
                            />
                            <div className={styles.infoBlock}>
                                <div>{p.name}</div>
                            </div>
                        </div>
                        <div className={styles.actionButton}>
                            {p.id === selectedPortfolio && (
                                <>
                                    <EditOutlined
                                        style={{ marginRight: 8 }}
                                        onClick={handleEditPortfolioName}
                                    />
                                    <DeleteFilled
                                        onClick={() =>
                                            handleClickRemovePortfolio(p.id)
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div
                    aria-hidden="true"
                    className={styles.createPortfolio}
                    onClick={() => setShowNewPortfolioModal(true)}
                >
                    <PlusCircleFilled /> Create portfolio
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.RightBlock}>
                    {selectedPortfolio && (
                        <div className={styles.summaryButtonBlock}>
                            <div>
                                <div>Current Balance</div>
                                <div className={styles.summary}>
                                    {formatUSDforTableMoney(currentBalance)}
                                </div>
                            </div>
                            <div>
                                <div>Invest money</div>
                                <div className={styles.summary}>
                                    {portfolio &&
                                        formatUSDforTableMoney(
                                            portfolio.totalSum,
                                        )}
                                </div>
                            </div>
                            <div>
                                <div>Profit/Loss</div>
                                <div className={styles.summary}>
                                    <span style={{color: portfolio && currentBalance - portfolio.totalSum > 0 ? 'green' : "red"}}>
                                         {portfolio &&
                                         formatUSDforTableMoney(
                                             currentBalance - portfolio.totalSum,
                                         )}
                                    </span>

                                </div>
                            </div>

                            {portfolios.length > 0 && selectedPortfolio && (
                                <div>
                                    <Button
                                        type="primary"
                                        shape="round"
                                        icon={<PlusCircleFilled />}
                                        onClick={() =>
                                            setShowNewTradeModal(true)
                                        }
                                    >
                                        Add new
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div className={styles.assets}>
                            <Title level={4}>Your assets</Title>
                        </div>
                        {selectedPortfolio && (
                            <PieChartOutlined
                                style={{
                                    fontSize: 24,
                                    margin: 10,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                }}
                                onClick={handleClickTogglePie}
                            />
                        )}
                    </div>

                    {portfolio ? (
                        <Table
                            className={styles.tableWrapper}
                            dataSource={data}
                            columns={columns}
                            pagination={{ hideOnSinglePage: true }}
                            expandable={{
                                // eslint-disable-next-line react/no-unstable-nested-components
                                expandedRowRender: (record, index) => (
                                    <Table
                                        rowKey={`${record.name}_${index}`}
                                        dataSource={
                                            portfolio.trades[record.name]
                                        }
                                        columns={columnsTrade}
                                        pagination={false}
                                    />
                                ),
                            }}
                            scroll={{ x: 'max-content' }}
                        />
                    ) : (
                        <Title level={5} style={{ textAlign: 'center' }}>
                            Please, select portfolios
                        </Title>
                    )}
                    {pieChartShow && <PieChart data={getDataForPie} />}
                </div>
                {idChart && (
                    <>
                        <Title level={4}>{idChart.toUpperCase()} chart</Title>
                        <Chart id={idChart} averagePrice={averagePriceByCoin} />
                    </>
                )}
            </div>
            <Modal
                centered
                visible={showNewPortfolioModal}
                onOk={handleClickNewPortfolio}
                onCancel={handleClickCancelPortfolio}
                width={500}
            >
                <Title level={4}>Create portfolio</Title>
                <Text strong style={{ fontSize: 14 }}>
                    Portfolio name
                </Text>
                <Input
                    style={{ borderRadius: '10px', height: 40 }}
                    placeholder="Enter your portfolio name..."
                    onChange={handleChangePortfolioName}
                    value={newPortfolioName}
                />
                {errorExsitName && <InfoError text="Name already used" />}
                {errorPortfolioName && <InfoError text="Filed is required" />}
            </Modal>
            <Modal
                centered
                visible={showEditPortfolioModal}
                onOk={handleNewNamePortfolio}
                onCancel={handleClickCancelEditPortfolio}
                width={500}
            >
                <Title level={4}>Change portfolio name</Title>
                <Text strong style={{ fontSize: 14 }}>
                    Portfolio name
                </Text>
                <Input
                    style={{ borderRadius: '10px', height: 40 }}
                    placeholder="Enter new portfolio name..."
                    onChange={handleChangePortfolioName}
                    value={newPortfolioName}
                />
                {errorExsitName && <InfoError text="Name already used" />}
                {errorPortfolioName && <InfoError text="Filed is required" />}
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
                        style={{ display: 'flex', width: '100%' }}
                        options={optionsTradeDirection}
                        onChange={handleChangeDirection}
                        value={direction}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </div>
                <Margin vertical={MARGIN.l}>
                    <SearchEngine getId />
                    {errorSelectedCoinForTrade && (
                        <Text style={{ color: 'red', margin: 5 }}>
                            You need selected coin
                        </Text>
                    )}
                </Margin>

                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            padding: 5,
                        }}
                    >
                        <Title level={5}>Quantity</Title>
                        <Input
                            value={quantity}
                            type="number"
                            style={{ borderRadius: 10 }}
                            onChange={handleChangeQuantity}
                        />
                        {errorQuantity && (
                            <InfoError text="Field is requires" />
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            padding: 5,
                        }}
                    >
                        <Title level={5}>Price Per Coin</Title>
                        <Input
                            value={pricePerCoin}
                            style={{ borderRadius: 10 }}
                            type="number"
                            onChange={handleChangePricePerCoin}
                        />
                        {errorPriceCoin && (
                            <InfoError text="Field is requires" />
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            padding: 5,
                        }}
                    >
                        <Title level={5}>Date</Title>
                        <DatePicker
                            defaultValue={moment(dateNow, dateFormat)}
                            value={moment(date, dateFormat)}
                            format={dateFormat}
                            style={{ borderRadius: 10 }}
                            onChange={handleChangeDate}
                        />
                    </div>
                </div>
                <div
                    style={{
                        background: '#f8f8f8',
                        borderRadius: 10,
                        padding: 10,
                        margin: 5,
                    }}
                >
                    <Title level={5}>Total spent</Title>
                    <Text strong style={{ fontSize: 30 }}>
                        ${totalSpent}
                    </Text>
                </div>
            </Modal>
        </div>
    );
};

export default Portfolio;
