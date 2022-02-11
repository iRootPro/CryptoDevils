import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import {store, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

