import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const key_up_handler = ( _event ) => {

};

const DecomposedSentence = ({ one_sentence }) => {
    const structure = React.createElement(
        'div',

        // Taxindex is required, otherwise div will not receive keyup events
        {
            'tabIndex' : '1',
            'onKeyUp' : key_up_handler,
        },
        one_sentence.text
    );

    return (
        <div>
            <h4>Sentence Structure:</h4>
            { structure }
        </div>
    );
};

DecomposedSentence.propTypes = {
    'one_sentence' : PropTypes.object.isRequired,
};

const map_state_to_props = ({ sentences }) => {
    return {
        'one_sentence' : sentences.one.data,
    };
};

export default connect(map_state_to_props)(DecomposedSentence);
