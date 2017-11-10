import React from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    reduxForm,
    SubmissionError,
} from 'redux-form';
import CSSModules from 'react-css-modules';
import SentencesAPI from '../../apis/sentences.jsx';
import style from './style.css';

const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;

const create_sentence = (sentence, dispatch) => {
    return dispatch(
        SentencesAPI.actions.create(
            {},
            { 'body' : JSON.stringify(sentence) }
        )
    ).then(
        (creation_response) => {
            const api_response = creation_response.data;
            if (api_response.status === HTTP_CONFLICT) {
                throw new SubmissionError({
                    '_error' : 'Sentence Already Exists!',
                });
            }
        }
    )
};

const onSubmit = (sentence, dispatch) => {
    return dispatch(
        create_sentence.bind(null, sentence)
    );
};

const AddSentenceForm = ({
    error,
    handleSubmit,
    submitting,
}) => {
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                { error }
            </div>
            <div>
                <label htmlFor='content'>Content:</label>
                <Field
                    name='text'
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
                <button
                    type='submit'
                    disabled={ submitting }
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

AddSentenceForm.defaultProps = {
    'error' : undefined,
};

AddSentenceForm.propTypes = {
    'error' : PropTypes.string,
    'handleSubmit' : PropTypes.func.isRequired,
    'submitting' : PropTypes.bool.isRequired,
};

const StyledAddSentenceForm = CSSModules(AddSentenceForm, style);

export default reduxForm({
    'form' : 'sentence_creation',
    onSubmit,
})(StyledAddSentenceForm);
