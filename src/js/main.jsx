import React from 'react';
import ReactDom from 'react-dom';
import '../index.css';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';

import configureStore from './reducers/configure_store';
import App from './components/app';
import menu_reducer from './components/drawer_menu/reducer';

const initial_state = {};
const combined_reducers = combineReducers(
    {
        'collapsed_menu' : menu_reducer
    }
);

const store = configureStore()(combined_reducers, initial_state);

ReactDom.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('app')
);
