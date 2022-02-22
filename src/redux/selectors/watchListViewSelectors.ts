import { RootState } from '../store';

const selectView = (state: RootState) => state.watchListViewReducer.view;

export default selectView;
