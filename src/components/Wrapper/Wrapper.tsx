import React, {FC} from 'react';
import styles from './Wrapper.module.scss';

export const Wrapper: FC = ({children}) => (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            {children}
        </div>
    </div>
);
