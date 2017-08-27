import {
    createStore,
    applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { routerMiddleware } from 'react-router-redux';

const logger = createLogger();

const configure_store = (
    combined_reducers,
    initial_state,
    history
) => {
    // We disable logging Redux Actions in console when bundling for prod
    if ( process.env.NODE_ENV === 'production' ) {
        return createStore(
            combined_reducers,
            initial_state,
            applyMiddleware(
                thunk,
                promise,
                routerMiddleware(history)
            )
        );
    }

    // `logger` should be the last middleware so as to log actions
    return createStore(
        combined_reducers,
        initial_state,
        applyMiddleware(
            thunk,
            promise,
            routerMiddleware(history),
            logger
        )
    );
};

export default configure_store;
