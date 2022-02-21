import {RootState} from '../store';

export const selectModalSelectedCoins = (state: RootState) => state.modalSelectedCoinsReducer.data;
export const selectModalSelectedCoinsIds = (state: RootState) => state.modalSelectedCoinsReducer.data.map((item) => item.id);
