import {
    createStore,
    applyMiddleware
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const logger = createLogger();

const configure_store = () => {
    // We disable logging Redux Actions in console when bundling for prod
    if ( process.env.NODE_ENV === 'production' ) {
        return applyMiddleware(thunk, promise)(createStore);
    }

    // `logger` should be the last middleware so as to log actions
    return applyMiddleware(thunk, promise, logger)(createStore);
};

export default configure_store;
