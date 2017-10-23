import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Card from '../card';

const AddSentence = () => {
    return (
        <Card className={ style.element_root }>
            <div>
                <p>
                    Add Sentence:
                </p>
            </div>
        </Card>
    );
};

AddSentence.propTypes = { };

const map_state_to_props = () => {
    return { };
};

const styled_add_sentence = CSSModules(AddSentence, style);

export default connect(map_state_to_props)(styled_add_sentence);
