/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type IWLView = {
    view: 'cards' | 'table';
};
const initialState: IWLView = {
    view: 'table',
};

const watchListView = createSlice({
    name: 'watchListSlice',
    initialState,
    reducers: {
        changeView(state) {
            if (state.view === 'table') state.view = 'cards';
            else state.view = 'table';
        },
        setTable(state) {
            state.view = 'table';
        },
        setCards(state) {
            state.view = 'cards';
        },
    },
});

export default watchListView.reducer;
export const { changeView, setTable, setCards } = watchListView.actions;
