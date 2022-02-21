import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById('root'),
);
