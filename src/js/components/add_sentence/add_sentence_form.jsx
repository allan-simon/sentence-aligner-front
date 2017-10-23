import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './style.css';

const AddSentenceForm = () => {
    return (
        <form>
        </form>
    );
};

AddSentenceForm.propTypes = { };

const map_state_to_props = () => {
    return { };
};

const styled_add_sentence_form = CSSModules(AddSentenceForm, style);

export default connect(map_state_to_props)(styled_add_sentence_form);
