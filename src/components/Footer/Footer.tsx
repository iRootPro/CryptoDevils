import React, { FC } from 'react';
import { HeartFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import Margin from '../common/Margin';
import MARGIN from '../../constants/margins';

import styles from './Footer.module.scss';

const logo = require('../../assets/images/logo.png');

const Footer: FC = () => (
    <>
        <Divider />
        <Margin vertical={MARGIN.xl}>
            <div className={styles.wrapper}>
                <img src={logo} alt="logo" />
                <span className={styles.text}>
                    Made with <HeartFilled /> by CryptoDevils
                </span>
                <span className={styles.textBottom}>copyright © 2022</span>
            </div>
        </Margin>
    </>
);

export default Footer;
