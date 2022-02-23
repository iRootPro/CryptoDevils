import React, {FC} from 'react';
import styles from './Header.module.scss';

export const Header:FC = ({children}) => (
    <span className={styles.header}>
        {children}
    </span>
);
