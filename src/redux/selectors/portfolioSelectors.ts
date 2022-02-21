import { RootState } from '../store';

export const selectPortfolios = (state: RootState) => state.portfolios.portfolios;
export const selectSelectedCoinForTrade = (state: RootState) => state.portfolios.selectCoin
export const selectAllPortfolios = (state: RootState) => state.portfolios
