import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Card from '../card';

const SentencesList = ({ sentences_list }) => {
    return (
        <Card className={ style.element_root }>
            <div>
                <p>
                    Sentences list:
                </p>
                <p>
                    { sentences_list.data.length } sentences
                </p>
                <table className={ style.sentences_table }>
                    <thead>
                        <tr>
                            <th>
                                Content
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sentences_list.data.map(
                                (sentence) => {
                                    return (
                                        <tr key={ sentence.id }>
                                            <td>
                                                <Link to={ '/sentences/' + sentence.id }>
                                                    { sentence.text }
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

SentencesList.propTypes = {
    'sentences_list' : React.PropTypes.object.isRequired,
};

const map_state_to_props = ({ sentences }) => {
    return {
        'sentences_list' : sentences.list,
    };
};

const styled_sentences_list = CSSModules(SentencesList, style);

export default connect(map_state_to_props)(styled_sentences_list);
