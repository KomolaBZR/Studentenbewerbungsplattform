import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import rootReducer from './redux/RootReducer';

const initialState = {};
const middlewares = [thunk];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = 'https://localhost:443/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tokenSession');


root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
