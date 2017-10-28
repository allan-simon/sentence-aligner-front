import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import style from './style.css';

const Card = ({ children }) => {
    return (
        <div className={ style.card }>
            { children }
        </div>
    );
};

Card.propTypes = {
    'children' : PropTypes.element.isRequired,
};

export default CSSModules(Card, style);
