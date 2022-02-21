import {createContext, useContext} from 'react';

type IModalContext = {
    modalVisible: boolean;
    toogleModal: () => boolean;
};

export const ModalVisibleContext = createContext<IModalContext>({
    modalVisible: false,
    toogleModal: () => true,
});
export const useModalVisibleContext = () => useContext(ModalVisibleContext);
