import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

const TopBar = () => {
    return (
        <header className={ style.navbar }>
            <h1>Sentence Aligner</h1>
            <Link to='sentences/create'>
                <button>Add a sentence</button>
            </Link>
        </header>
    );
};

export default CSSModules(TopBar, style);
