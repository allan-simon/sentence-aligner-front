import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import SentencesAPI from '../../apis/sentences.jsx';
import style from './style.css';

const create_sentence = (sentence, resolve, reject, dispatch) => {
    dispatch(
        SentencesAPI.actions.create(
            {},
            { 'body' : JSON.stringify(sentence) }
        )
    ).then(
        (creation_response) => {
            console.log(creation_response);
            resolve();
        }
    );
};

const onSubmit = (sentence, dispatch) => {
    const promise = new Promise(
        (resolve, reject) => {
            dispatch(
                create_sentence.bind(null, sentence, resolve, reject)
            );
        }
    );

    return promise;
};

const _AddSentenceForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={ handleSubmit }>
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
    'handleSubmit' : PropTypes.func.isRequired,
};

const map_state_to_props = () => {
    return { };
};

const styled_add_sentence_form = CSSModules(_AddSentenceForm, style);

const AddSentenceForm = connect(map_state_to_props)(styled_add_sentence_form);

export default reduxForm({
    'form' : 'sentence_creation',
    onSubmit,
})(AddSentenceForm);

