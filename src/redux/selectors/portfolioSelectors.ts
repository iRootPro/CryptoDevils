import { RootState } from '../store';

export const selectPortfolios = (state: RootState) => state.portfolios.portfolios;
// export const selectWatchListIds = (state: RootState) =>
//     state.watchListReducer.data.map((item) => item.id);
