import React from 'react';
import ReactDOM from 'react-dom';
import MainView from "./views/MainView";
import { Provider } from 'react-redux';
import "./index.css";

import store from "./state/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainView />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
