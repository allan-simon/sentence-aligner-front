import React from 'react';
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
    'children' : React.PropTypes.element,
};

export default CSSModules(Card, style);
