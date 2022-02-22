/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinWL } from '../../types/ICoin';

type IModalSelectedCoins = {
    data: ICoinWL[];
};

const initialState: IModalSelectedCoins = {
    data: [],
};

const modalSelectedCoinsSlice = createSlice({
    name: 'modalSelectedCoinsSlice',
    initialState,
    reducers: {
        addCoinToModalSelectedCoins(state, action: PayloadAction<ICoinWL>) {
            state.data.push(action.payload);
        },
        removeCoinFromModalSelectedCoins(
            state,
            action: PayloadAction<ICoinWL>,
        ) {
            state.data = state.data.filter(
                (item) => item.id !== action.payload.id,
            );
        },
        clearModalSelectedCoins(state) {
            state.data = [];
        },
    },
});

export default modalSelectedCoinsSlice.reducer;
export const {
    addCoinToModalSelectedCoins,
    removeCoinFromModalSelectedCoins,
    clearModalSelectedCoins,
} = modalSelectedCoinsSlice.actions;
