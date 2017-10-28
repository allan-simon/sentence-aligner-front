import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import style from './style.css';

const _AddSentenceForm = ({ handle_submit }) => {
    return (
        <form onSubmit={ handle_submit }>
            <div>
                <label htmlFor='content'>Content:</label>
                <Field
                    name='content'
                    component='input'
                    type='text'
                    required
                />
            </div>
            <div>
                <label htmlFor='iso639_3'>Language:</label>
                <Field
                    name='iso639_3'
                    component='select'
                    required
                >
                    <option disabled/>
                    <option value='fra'>French</option>
                    <option value='eng'>English</option>
                    <option value='cmn'>Chinese</option>
                </Field>
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
};

_AddSentenceForm.propTypes = {
    'handle_submit' : PropTypes.func.isRequired,
};

const map_state_to_props = () => {
    return { };
};

const styled_add_sentence_form = CSSModules(_AddSentenceForm, style);

const AddSentenceForm = connect(map_state_to_props)(styled_add_sentence_form);

export default reduxForm({
    'form' : 'sentence_creation',
})(AddSentenceForm);

