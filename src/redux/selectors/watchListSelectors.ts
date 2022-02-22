import {RootState} from '../store';

export const selectWatchList = (state: RootState) => state.watchListReducer.data;
export const selectWatchListIds = (state: RootState) => state.watchListReducer.data.map((item) => item.id);
