import Actions from './actions';
import Converter from './xml_html_converter';

const sentence_structure_reducer = (state, action) => {
    if ( typeof state === 'undefined' ) {
        return null;
    }

    if (action.type !== Actions.GROUP_CREATED) {
        return state;
    }
    const { sentenceDiv } = action;

    const xml = Converter.create_XML_from_HTML(
        sentenceDiv.childNodes[ 0 ],
        document.createElement('structure')
    );

    return new XMLSerializer().serializeToString(xml);
};

export default sentence_structure_reducer;
