import React from 'react';
import { Router } from 'react-router';
import Layout from '../layout';
import Card from '../card';
import SentencesList from '../sentences_list';
import SentencesAPI from '../../apis/sentences.jsx';

const AppRouter = ({ dispatch, history }) => {
    const fetch_sentences_list = () => {
        dispatch(SentencesAPI.actions.list());
    };

    const routes_config = {
        'path' : '/',
        'component' : Layout,
        'indexRoute' : {
            'component' : Card,
        },
        'childRoutes' : [
            {
                'path' : 'error',
                'component' : Card,
            },
            {
                'path' : 'sentences',
                'onEnter' : fetch_sentences_list,
                'component' : SentencesList,
            },
            {
                'path' : '*',
                'component' : Card,
            },
        ],
    };

    return (
        <Router
            history={ history }
            routes={ routes_config }
        />
    );
};

AppRouter.propTypes = {
    'dispatch' : React.PropTypes.func.isRequired,
    'history' : React.PropTypes.object,
};

export default AppRouter;
