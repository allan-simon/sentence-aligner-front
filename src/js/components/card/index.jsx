import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

const Card = () => {
    return (
        <div className={ style.card }/>
    );
};

Card.propTypes = {};

export default CSSModules(Card, style);
