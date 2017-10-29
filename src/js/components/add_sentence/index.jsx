import React from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import AddSentenceForm from './add_sentence_form';
import Card from '../card';

const AddSentence = () => {
    return (
        <Card className={ style.element_root }>
            <div>
                <p>
                    Add Sentence:
                </p>
                <AddSentenceForm/>
            </div>
        </Card>
    );
};

const styled_add_sentence = CSSModules(AddSentence, style);

export default styled_add_sentence;
