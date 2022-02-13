import { createSlice } from '@reduxjs/toolkit';

type IWatchList = {
    data: string[];
};
const initialState: IWatchList = {
    data: [],
};

const watchListSlice = createSlice({
    name: 'watchListSlice',
    initialState: initialState,
    reducers: {
        addCoinToWatchList(state, action) {
            state.data.push(action.payload);
        },
        removeCoinFromWatchList(state, action) {
            state.data = state.data.filter((item) => item !== action.payload);
        },
    },
});

export default watchListSlice.reducer;
export const { addCoinToWatchList, removeCoinFromWatchList } =
    watchListSlice.actions;
