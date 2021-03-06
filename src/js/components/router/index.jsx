import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import Layout from '../layout';
import Card from '../card';
import SentencesList from '../sentences_list';
import AddSentence from '../add_sentence';
import OneSentence from '../one_sentence';
import SentencesAPI from '../../apis/sentences.jsx';

const AppRouter = ({ dispatch, history }) => {
    const fetch_sentences_list = () => {
        dispatch(SentencesAPI.actions.list());
    };

    const fetch_one_sentence = (nextState) => {
        const { id } = nextState.params;

        dispatch(SentencesAPI.actions.one({ 'id' : id }));
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
                'path' : 'sentences/create',
                'component' : AddSentence,

            },
            {
                'path' : 'sentences/:id',
                'onEnter' : fetch_one_sentence,
                'component' : OneSentence,
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
    'dispatch' : PropTypes.func.isRequired,
    'history' : PropTypes.object.isRequired,
};

export default AppRouter;
