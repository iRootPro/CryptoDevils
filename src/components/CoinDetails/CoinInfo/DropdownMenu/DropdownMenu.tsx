/* eslint-disable react/jsx-no-useless-fragment */
import { DownOutlined } from '@ant-design/icons';

import { Button, Dropdown } from 'antd';
import React, { FC, ReactElement } from 'react';
import styles from './DropdownMenu.module.scss';

type CoinInfoProps = {
    datapath: string[];
    children: React.ReactNode;
    name: string;
    menu: ReactElement;
};

const DropdownMenu: FC<CoinInfoProps> = ({
    children,
    datapath,
    name,
    menu,
}) => (
    <>
        {Boolean(datapath.filter(Boolean).length) && (
            <Dropdown
                className={`${styles.homePage} ${styles.page}`}
                overlay={menu}
                placement="bottomCenter"
            >
                <Button className={`${styles.homePageLink} ${styles.link}`}>
                    {children}
                    {name}
                    <DownOutlined />
                </Button>
            </Dropdown>
        )}
    </>
);

export default DropdownMenu;
