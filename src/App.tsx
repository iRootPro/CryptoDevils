import Layout from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import {
    CoinDetails,
    Footer,
    Navbar,
    Portfolio,
    StatBar,
} from './components/components';
import {
    CryptocurrenciesContainer,
    ExchangesContainer,
    WatchListContainer
} from './containers';
import ROUTES from './constants/routes';
import Wrapper from './components/Wrapper/Wrapper';

const App = () => (
    <Wrapper>
        <StatBar />
        <Navbar />
        <Layout style={{ backgroundColor: '#fff' }}>
            <Switch>
                <Route
                    exact
                    path={ROUTES.main}
                    render={() => <CryptocurrenciesContainer />}
                />
                <Route
                    exact
                    path={`${ROUTES.coin}/:id`}
                    render={() => <CoinDetails />}
                />
                <Route
                    exact
                    path={ROUTES.portfolio}
                    render={() => <Portfolio />}
                />
                <Route
                    exact
                    path={ROUTES.watchlist}
                    render={() => <WatchListContainer />}
                />
                <Route
                    exact path={ROUTES.exchanges}
                    render={() => <ExchangesContainer />}
                />
            </Switch>
        </Layout>
        <Footer />
    </Wrapper>
);

export default App;
