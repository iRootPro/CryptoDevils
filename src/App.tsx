import Layout from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { CoinDetails, Cryptocurrencies, Footer, Navbar, Portfolio, WatchList } from './components/components';

function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <Switch>
          <Route exact path="/" render={() => <Cryptocurrencies />} />
          <Route exact path="/coin/:id" render={() => <CoinDetails />} />
          <Route exact path="/portfolio" render={() => <Portfolio />} />
          <Route exact path="/watchlist" render={() => <WatchList />} />
        </Switch>
      </Layout>
      <Footer />
    </>
  );
}

export default App;

