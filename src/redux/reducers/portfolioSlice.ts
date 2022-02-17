import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type PortfolioType = {
    id: string,
    name: string,
    trades: TradesType,
    totalSum: number,
    summaryCoinsInfo: SummaryType
}

type SummaryType = {
    [coin: string]: {
        quantity: number
        avgPrice: number
    }
}

export type PortfoliosType = {
    portfolios: Array<PortfolioType>
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


const initialState: PortfoliosType = {
    portfolios: []
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
                portfolio.trades[coin] ? portfolio.trades[coin].push(action.payload.trade) : portfolio.trades[coin] = [action.payload.trade]
                portfolio.totalSum += action.payload.trade.totalSpent
                portfolio.summaryCoinsInfo[coin]
                    ? portfolio.summaryCoinsInfo[coin] = {
                        quantity: portfolio.summaryCoinsInfo[coin].quantity += action.payload.trade.quantity,
                        avgPrice: (action.payload.trade.price * action.payload.trade.quantity + portfolio.summaryCoinsInfo[coin].quantity * portfolio.summaryCoinsInfo[coin].avgPrice) / (action.payload.trade.quantity + portfolio.summaryCoinsInfo[coin].quantity)
                }
                    : portfolio.summaryCoinsInfo[coin] = {quantity: action.payload.trade.quantity, avgPrice: action.payload.trade.price }
            }
        },
    },
});

export default portfolioSlice.reducer;
export const { addPortfolio, removePortfolio, addTrade } = portfolioSlice.actions;
