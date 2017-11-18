import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import Actions from './actions';
import style from './style.css';
import Converter from './xml_html_converter';

/**
 *
 * @param {string} group
 * @param {Range}  range
 */
var create_words_group_from_range = (
    group,
    range
) => {
    let span = document.createElement('span');

    span.setAttribute('data-group', group);
    range.surroundContents(span);
};


/**
 * Check if said selection can be used to deliminate a group of words
 *
 * @param {Selection} selection Object representing the piece of text that
 *                    that has been selected
 *
 * @return bool
 */
const is_valid_selection = (selection) => {
    console.log(selection);
    return (
        selection.anchorNode === selection.focusNode ||

        // TODO to keep things simple, we disallow multiple range
        // In one selection (one can do that by keeping ctrl pressed)
        selection.rangeCount === 1
    );
};

/**
 * Check if the key pressed is one that can be used to identify a word group
 *
 * @param {Event} KeyUp event when a user press a key on the keyboard
 * @return {bool}
 */
const is_valid_key = ({ keyCode }) => {
    // If on digits line of a qwerty keyboard
    return keyCode >= 48 && keyCode <= 57;
};

/**
 * Return the group of words associated to the key pressed
 *
 * @param  {Event}   keyEvent The keyup event
 * @return {string}
 * @private
 */
const get_group_from_key = ({ keyCode }) => {
    return {
        48 : '0',
        49 : '1',
        50 : '2',
        51 : '3',
        52 : '4',
        53 : '5',
        54 : '6',
        55 : '7',
        56 : '8',
        57 : '9',
    }[ keyCode ];
};

const key_up_handler = ( dispatch, event ) => {
    if (!is_valid_key(event)) {
        return;
    }

    const selection = window.getSelection();

    if (!is_valid_selection(selection)) {
        return;
    }
    const group = get_group_from_key(event);

    // TODO we handle only one range for the time being
    const range = selection.getRangeAt(0);

    create_words_group_from_range(
        group,
        range
    );

    let sentenceDiv = event.currentTarget;

    const action = {
        'type': Actions.GROUP_CREATED,
        'sentenceDiv': sentenceDiv,
    }
    dispatch(action);
};

const DecomposedSentence = ({ one_sentence, sentenceXML, dispatch }) => {

    let sentenceBlocks = one_sentence.text;
    if (sentenceXML !== undefined && sentenceXML !== null) {
        let sentenceBlocks = Converter.create_HTML_from_XML(sentenceXML);
    }

    const sentenceStructure = React.createElement(
        'span',
        {},
        sentenceBlocks
    );

    const structure = React.createElement(
        'div',

        // Taxindex is required, otherwise div will not receive keyup events
        {
            'tabIndex' : '1',
            'onKeyUp' : key_up_handler.bind(null, dispatch),
        },
        sentenceStructure
    );

    return (
        <div>
            <h4>Sentence Structure:</h4>
            <p>
                Select some part of speech of the text,
                and then press a key from 1 to 9, to create
                a group
            </p>
            { structure }
        </div>
    );
};

DecomposedSentence.propTypes = {
    'one_sentence' : PropTypes.object.isRequired,
};

const map_state_to_props = ({
    sentences,
    sentenceStructure,
}) => {
    return {
        'one_sentence' : sentences.one.data,
        'sentenceXML' : sentenceStructure,
    };
};

const StyledComponent = CSSModules(DecomposedSentence, style);
export default connect(map_state_to_props)(StyledComponent);
