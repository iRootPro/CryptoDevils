import {FC} from 'react';
import {Menu} from 'antd';
import {MoneyCollectOutlined, PieChartOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';
import {Margin} from "../common/Margin";
import {MARGIN} from "../../constants/margins";
import SearchEngine from '../SearchEngine/SearchEngine';
import styles from './NavBar.module.scss';

const logo = require('./../../assets/images/logo.png');

const Navbar: FC = () => {
    const history = useHistory();

    return (
        <Margin vertical={MARGIN.xl}>
            <div className={styles.wrapper}>
                <img src={logo} alt='logo' height='30px'/>
                <Menu mode="horizontal" style={{width: '100%', borderBottomStyle: 'none'}}>
                    <Menu.Item
                        key="cryptocurrencies"
                        icon={<MoneyCollectOutlined />}
                        onClick={() => history.push(ROUTES.main)}
                    >
                        Cryptocurrencies
                    </Menu.Item>
                    <Menu.Item
                        key="portfolio"
                        icon={<PieChartOutlined/>}
                        onClick={() => history.push(ROUTES.portfolio)}
                    >
                        Portfolio
                    </Menu.Item>
                    <Menu.Item
                        key="watchlist"
                        icon={<UnorderedListOutlined/>}
                        onClick={() => history.push(ROUTES.watchlist)}
                    >
                        Watchlist
                    </Menu.Item>
                </Menu>
                <SearchEngine />
            </div>
        </Margin>
    );
};

export default Navbar;
