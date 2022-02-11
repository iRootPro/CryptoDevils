import { createSlice } from '@reduxjs/toolkit';
import { ICoinID } from '../../types/ICoin';

type IwatchList = {
    data: Array<string>;
};
const initialState: IwatchList = {
    data: [],
};

const watchListSlice = createSlice({
    name: 'watchListSlice',
    initialState: initialState,
    reducers: {
        addWatchList(state, action) {
            state.data.push(action.payload);
        },
        removeWatchList(state, action) {
            state.data = state.data.filter((item) => item !== action.payload);
        },
    },
});

export default watchListSlice.reducer;
export const { addWatchList, removeWatchList } = watchListSlice.actions;
