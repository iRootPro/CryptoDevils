import {useState} from 'react';

export const useModalVisible = (init: boolean) => {
    const [modalVisible, setModalVisible] = useState(init);

    const toogleModal = () => {
        setModalVisible(!modalVisible);
        return modalVisible;
    };

    return {
        modalVisible,
        toogleModal,
    };
};
