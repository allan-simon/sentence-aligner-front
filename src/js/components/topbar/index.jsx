import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

const TopBar = () => {
    return (
        <header className={ style.navbar }>
            <h1>Sentence Aligner</h1>
            <button>Add a sentence</button>
        </header>
    );
};

export default CSSModules(TopBar, style);
