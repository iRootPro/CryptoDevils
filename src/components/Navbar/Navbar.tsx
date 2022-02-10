import {FC} from 'react';
import {Menu} from 'antd';
import {MoneyCollectOutlined, PieChartOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';
import {Margin} from "../common/Margin";
import {MARGIN} from "../../constants/margins";

const Navbar: FC = () => {
    const history = useHistory();

    return (
        <Margin offset={MARGIN.xl}>
            <Menu mode="horizontal">
                <Menu.Item
                    key="cryptocurrencies"
                    icon={<MoneyCollectOutlined/>}
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
        </Margin>
    );
};

export default Navbar;
