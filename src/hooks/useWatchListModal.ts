import { useState } from 'react';

export const useWatchListModal = (init: boolean) => {
    const [modalVisible, setModalVisible] = useState(init);

    // console.log(' handle');

    const toogleModal = () => {
        setModalVisible(!modalVisible);
        return modalVisible;
    };

    return {
        modalVisible,
        toogleModal,
    };
};
