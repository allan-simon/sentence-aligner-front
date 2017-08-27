import React from 'react';
import { Router } from 'react-router';
import Layout from '../layout';
import Card from '../card';

const AppRouter = ({ history }) => {
    const routes_config = {
        'path' : '/',
        'component' : Layout,
        'indexRoute' : {
            'component' : Card
        },
        'childRoutes' : [
            {
                'path' : 'error',
                'component' : Card
            },
            {
                'path' : '*',
                'component' : Card
            }
        ]
    };

    return (
        <Router
            history={ history }
            routes={ routes_config }
        />
    );
};

AppRouter.propTypes = {
    'history' : React.PropTypes.object
};

export default AppRouter;
