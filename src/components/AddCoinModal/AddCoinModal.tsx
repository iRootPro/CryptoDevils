import { FC, useState } from "react";
import { Button, Modal } from "antd";

import styles from './AddCoinModal.module.scss'

const AddCoinModal: FC = () => {
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    
    const toogleModal = () => {
        setModalVisible(!modalVisible)
        return modalVisible;
    }

    const handleOK = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            toogleModal();
        }, 3000);
    }

    return (
        <Modal 
            visible={toogleModal()}
            title="Add Coins"
            onOk={handleOK}
            footer={[
                <Button type="primary" loading={loading} onClick={handleOK}/>
            ]}
        >
            <div className={styles.modalWrapper}>
                <div className={styles.modalSearch}></div>

            </div>
        </Modal>
    )
}

export default AddCoinModal;