import React, {FC} from 'react'
import {Margin} from "../common/Margin";
import {MARGIN} from "../../constants/margins";
import {HeartFilled} from "@ant-design/icons";
import styles from './Footer.module.scss';
import {Divider} from "antd";

const logo = require('./../../assets/images/logo.png')

const Footer: FC = () => {
    return (
        <>
            <Divider/>
            <Margin vertical={MARGIN.xl}>
                <div className={styles.wrapper}>
                    <img src={logo} alt="logo" height="50px"/>
                    <span className={styles.text}>Made with <HeartFilled/> by CryptoDevils</span>
                    <span className={styles.text}>copyright © 2022</span>
                </div>
            </Margin>
        </>
    )
}

export default Footer
