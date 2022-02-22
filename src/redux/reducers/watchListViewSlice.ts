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
    },
});

export default watchListView.reducer;
export const { changeView } = watchListView.actions;
