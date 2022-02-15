import { createSlice } from '@reduxjs/toolkit';

type PortfoliosType = {
    portfolios: Array<PortfolioType>
};


export type PortfolioType = {
    id: string,
    name: string,
    trades: Array<TradeType>
}

export type TradeType = {
    id: string,
    coin: string,
    date: string,
    quantity: number,
    price: number,
    totalSpent: number,
}


const initialState: PortfoliosType = {
    portfolios: [],
};

const portfolioSlice = createSlice({
    name: 'portfolioSlice',
    initialState: initialState,
    reducers: {
        addPortfolio(state, action) {
            state.portfolios.push(action.payload)
        },
        removePortfolio(state, action) {
            state.portfolios.filter(p => p.id === action.payload)
        },
    },
});

export default portfolioSlice.reducer;
export const { addPortfolio, removePortfolio } = portfolioSlice.actions;
