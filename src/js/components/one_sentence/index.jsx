import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Card from '../card';

const OneSentence = ({ one_sentence }) => {
    return (
        <Card className={ style.element_root }>
            <div>
                <p>
                    Sentence Detail:
                </p>
                <table className={ style.sentences_table }>
                    <thead>
                        <tr>
                            <th>
                                Text
                            </th>
                            <th>
                                Language
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={ one_sentence.data.id }>
                            <td>
                                { one_sentence.data.text }
                            </td>
                            <td>
                                { one_sentence.data.iso639_3 }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

OneSentence.propTypes = {
    'one_sentence' : React.PropTypes.object.isRequired,
};

const map_state_to_props = ({ sentences }) => {
    return {
        'one_sentence' : sentences.one,
    };
};

const styled_one_sentence = CSSModules(OneSentence, style);

export default connect(map_state_to_props)(styled_one_sentence);
