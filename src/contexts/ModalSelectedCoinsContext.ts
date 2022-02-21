import {createContext, useContext} from 'react';
import {ICoinCard} from '../types/ICoin';

type IModalSelectedCoinsContext = {
    selectedCoins: ICoinCard[];
    selectedCoinsIds: string[];
    addCoin: (coin: ICoinCard) => void;
    removeCoin: (coin: ICoinCard) => void;
};

export const ModalSelectedCoinsContext =
    createContext<IModalSelectedCoinsContext>({
        selectedCoins: [],
        addCoin: () => {
        },
        removeCoin: () => {
        },
        selectedCoinsIds: [],
    });
export const useModalSelectedCoinsContext = () =>
    useContext(ModalSelectedCoinsContext);
