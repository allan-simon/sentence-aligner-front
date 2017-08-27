import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Layout from '../layout';
import Card from '../card';

const App = () => {
    return (
        <Layout>
            <Card>
                Hello World !
            </Card>
        </Layout>
    );
};

export default CSSModules(App, style);
