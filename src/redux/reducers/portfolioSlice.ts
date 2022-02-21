import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type PortfolioType = {
    id: string,
    name: string,
    trades: TradesType,
    totalSum: number,
    summaryCoinsInfo: SummaryType,
}

type SummaryType = {
    [coin: string]: {
        quantity: number
    }
}

export type PortfoliosType = {
    portfolios: Array<PortfolioType>
    selectCoin: string,
}

export type TradesType = {
    [coin: string]: Array<TradeType>
}

export type TradeType = {
        id: string,
        coin: string,
        date: string,
        quantity: number,
        price: number,
        totalSpent: number,
}

export type AddTradeType = {
    trade: TradeType,
    portfolioId: string
}

type RemoveTradeType = {
    id: string,
    coin: string,
    portfolioId: string
}


const initialState: PortfoliosType = {
    portfolios: [],
    selectCoin: 'bitcoin',
}

const portfolioSlice = createSlice({
    name: 'portfolioSlice',
    initialState: initialState,
    reducers: {
        addPortfolio(state, action) {
            state.portfolios.push(action.payload)
        },
        removePortfolio(state, action: PayloadAction<string>) {
            state.portfolios = state.portfolios.filter(p => p.id !== action.payload)
        },
        addTrade(state, action:PayloadAction<AddTradeType>) {
            const coin = action.payload.trade.coin
            const portfolio = state.portfolios.find(p => p.id === action.payload.portfolioId)
            if(portfolio) {
                state.selectCoin = 'bitcoin'
                portfolio.trades[coin]
                    ? portfolio.trades[coin].push(action.payload.trade)
                    : portfolio.trades[coin] = [action.payload.trade]
                portfolio.totalSum += action.payload.trade.totalSpent
                portfolio.summaryCoinsInfo[coin]
                    ? portfolio.summaryCoinsInfo[coin] = {
                        quantity: portfolio.summaryCoinsInfo[coin].quantity += action.payload.trade.quantity,
                }
                    : portfolio.summaryCoinsInfo[coin] = {quantity: action.payload.trade.quantity }
            }
        },
        setSelectCoinForTrade(state, action:PayloadAction<string>) {
            state.selectCoin = action.payload
        },
    },
});

export default portfolioSlice.reducer;
export const { addPortfolio, removePortfolio, addTrade, setSelectCoinForTrade } = portfolioSlice.actions;
