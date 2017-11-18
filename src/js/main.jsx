import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import { reducer as formReducer } from 'redux-form';
import {
    routerReducer,
    syncHistoryWithStore,
} from 'react-router-redux';

import '../index.css';

import configureStore from './reducers/configure_store';
import AppRouter from './components/router';
import menu_reducer from './components/drawer_menu/reducer';
import structure_reducer from './components/decomposed_sentence/reducer';
import SentencesAPI from './apis/sentences';

const initial_state = {};
const combined_reducers = combineReducers(
    {
        'collapsed_menu' : menu_reducer,
        'routing' : routerReducer,
        'form' : formReducer,
        'sentences' : combineReducers({
            'list' : SentencesAPI.reducers.list,
            'one' : SentencesAPI.reducers.one,
        }),
        'sentenceStructure' : structure_reducer,
    }
);

const history = hashHistory;
const store = configureStore(
    combined_reducers,
    initial_state,
    history
);
const synced_history = syncHistoryWithStore(history, store);

ReactDom.render(
    <Provider store={ store }>
        <AppRouter
            dispatch={ store.dispatch }
            history={ synced_history }
        />
    </Provider>,
    document.getElementById('app')
);
