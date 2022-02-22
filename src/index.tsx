import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

import 'antd/dist/antd.css';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import App from './App';

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById('root'),
);
