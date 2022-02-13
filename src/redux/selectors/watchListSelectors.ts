import { RootState } from '../store';

export const selectWatchList = (state: RootState) => state.watchListReducer;
