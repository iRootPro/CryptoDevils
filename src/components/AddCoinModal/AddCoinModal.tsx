import { FC, useState } from "react";
import { Button, Modal } from "antd";

import styles from './AddCoinModal.module.scss'
import { useModalContext } from "../../contexts/ModalContext";

const AddCoinModal: FC = () => {
    const {modalVisible, toogleModal} = useModalContext()

    const [loading, setLoading] = useState(false);

    const handleOK = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            toogleModal();
        }, 0);
    }

    return (
        <>
            <Modal 
                className={styles.modal}
                visible={modalVisible}
                title={<h3 className={styles.title}>Add Coins</h3>}
                onOk={handleOK}
                width={500}
                footer={[
                    <Button key="submit" type="primary" loading={loading} block onClick={handleOK}>OK</Button>
                ]}
            >
                <div className={styles.modalWrapper}>
                    <div className={styles.modalSearch}></div>
                </div>
            </Modal>
        </>
    )
}

export default AddCoinModal;