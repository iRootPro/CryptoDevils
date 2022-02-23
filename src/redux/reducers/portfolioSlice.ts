/* eslint-disable no-param-reassign */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TradeType = {
    id: string,
    coin: string,
    date: string,
    quantity: number,
    price: number,
    totalSpent: number,
}

export type TradesType = {
    [coin: string]: Array<TradeType>
}

type SummaryType = {
    [coin: string]: {
        quantity: number
    }
}

export type PortfolioType = {
    id: string,
    name: string,
    trades: TradesType,
    totalSum: number,
    summaryCoinsInfo: SummaryType,
}



export type PortfoliosType = {
    portfolios: Array<PortfolioType>
    selectCoin: string,
}


export type AddTradeType = {
    trade: TradeType,
    portfolioId: string
}

type ChangeNamePortfolioType = {
    id: string,
    name: string
}

const initialState: PortfoliosType = {
    portfolios: [],
    selectCoin: 'bitcoin',
}

const portfolioSlice = createSlice({
    name: 'portfolioSlice',
    initialState,
    reducers: {
        addPortfolio(state, action) {
            state.portfolios.push(action.payload)
        },
        changePortfolioName(state, action:PayloadAction<ChangeNamePortfolioType>) {
            const {id, name} = action.payload
            const foundPortfolio = state.portfolios.find(p => p.id === id)
            if(foundPortfolio) {
                foundPortfolio.name = name
            }
        },
        removePortfolio(state, action: PayloadAction<string>) {
            state.portfolios = state.portfolios.filter(p => p.id !== action.payload)
        },
        addTrade(state, action:PayloadAction<AddTradeType>) {
            const {coin} = action.payload.trade
            const portfolio = state.portfolios.find(p => p.id === action.payload.portfolioId)
            if(portfolio) {
                state.selectCoin = 'bitcoin'
                // eslint-disable-next-line no-unused-expressions
                portfolio.trades[coin]
                    ? portfolio.trades[coin].push(action.payload.trade)
                    : portfolio.trades[coin] = [action.payload.trade]
                portfolio.totalSum += action.payload.trade.totalSpent
                // eslint-disable-next-line no-unused-expressions
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
export const { addPortfolio, removePortfolio, addTrade, setSelectCoinForTrade, changePortfolioName } = portfolioSlice.actions;
