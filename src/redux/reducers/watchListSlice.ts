/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinWL } from '../../types/ICoin';

type IWatchList = {
    data: ICoinWL[];
};
const initialState: IWatchList = {
    data: [],
};

const watchListSlice = createSlice({
    name: 'watchListSlice',
    initialState,
    reducers: {
        addCoinToWatchList(state, action: PayloadAction<ICoinWL>) {
            state.data.push(action.payload);
        },
        removeCoinFromWatchList(state, action: PayloadAction<ICoinWL>) {
            state.data = state.data.filter(
                (item) => item.id !== action.payload.id,
            );
        },
        clearWatchList(state) {
            state.data = [];
        },
    },
});

export default watchListSlice.reducer;
export const { addCoinToWatchList, removeCoinFromWatchList, clearWatchList } =
    watchListSlice.actions;
