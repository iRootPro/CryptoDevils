import { RootState } from '../store';

export const selectView = (state: RootState) => state.watchListViewReducer.view;
