import Layout from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { CoinDetails, CryptocurrenciesContainer, Footer, Navbar, Portfolio, WatchListContainer } from './components/components';
import {ROUTES} from './constants/routes'
import {Wrapper} from "./components/Wrapper/Wrapper";

function App() {
  return (
        <Wrapper>
              <Navbar />
              <Layout>
                <Switch>
                  <Route exact path={ROUTES.main} render={() => <CryptocurrenciesContainer />} />
                  <Route exact path={ROUTES.coin} render={() => <CoinDetails />} />
                  <Route exact path={ROUTES.portfolio} render={() => <Portfolio />} />
                  <Route exact path={ROUTES.watchlist} render={() => <WatchListContainer />} />
                </Switch>
              </Layout>
              <Footer />
        </Wrapper>
  );
}

export default App;

