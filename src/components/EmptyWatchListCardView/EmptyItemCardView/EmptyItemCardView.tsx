import { CloseOutlined } from '@ant-design/icons';
import { Card, Skeleton } from 'antd';
import { FC } from 'react';

import styles from './EmptyItemCardView.module.scss';

const EmptyItemCardView: FC = () => (
    <Card
        hoverable
        className={styles.card}
        bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        }}
    >
        <div className={`${styles.close} ${styles.btn}`}>
            <CloseOutlined />
        </div>

        <div className={styles.rank}>
            <Skeleton.Avatar
                style={{ minHeight: '38px', minWidth: '38px' }}
                active
                size="small"
                shape="circle"
            />
        </div>

        <Skeleton.Avatar
            style={{
                minHeight: '100px',
                minWidth: '100px',
                marginBottom: '10px',
            }}
            active
            size="large"
            shape="circle"
        />

        <Skeleton.Button
            style={{
                width: '100px',
                height: '20px',
                margin: '5px auto 5px auto',
                display: 'flex',
            }}
            active
            size="small"
            shape="round"
            block
        />
        <Skeleton.Button
            style={{
                width: '20px',
                height: '15px',
                margin: '5px auto 5px auto',
                display: 'flex',
            }}
            active
            size="small"
            shape="round"
            block
        />

        <Skeleton.Button
            style={{
                width: '150px',
                height: '15px',
                margin: '5px auto 5px auto',
                display: 'flex',
            }}
            active
            size="small"
            shape="round"
            block
        />
        <Skeleton.Button
            style={{
                width: '170px',
                height: '15px',
                margin: '5px auto 5px auto',
                display: 'flex',
            }}
            active
            size="small"
            shape="round"
            block
        />
        <Skeleton.Button
            style={{
                marginTop: '10px',
                marginBottom: '5px',
                width: '200px',
                height: '15px',
                margin: '5px auto 5px auto',
                display: 'flex',
            }}
            active
            size="small"
            shape="round"
            block
        />
    </Card>
);

export default EmptyItemCardView;
