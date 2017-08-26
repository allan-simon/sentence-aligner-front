import React from 'react';
import ReactDom from 'react-dom';
import '../index.css';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import configureStore from './reducers/configure_store';
import App from './components/app';

const initial_state = {};
const combined_reducers = combineReducers(
    {
    }
);

const store = configureStore()(combined_reducers, initial_state);

ReactDom.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('app')
);
