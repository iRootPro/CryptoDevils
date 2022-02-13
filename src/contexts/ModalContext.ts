import { createContext, useContext } from 'react';

type IModalContext = {
    modalVisible: boolean;
    toogleModal: () => boolean;
};

export const ModalContext = createContext<IModalContext>({
    modalVisible: false,
    toogleModal: () => true,
});
export const useModalContext = () => useContext(ModalContext);
