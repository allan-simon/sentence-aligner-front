import React from 'react';

/**
 * @param {NamedNodeMap} attributes list of xml's attributes and value
 *                       to convert into a associative array of key=>value,
 *                       with the key being prefixed by `data-`
 *
 * @return {Object}
 */
const _attribute_to_dataset = (attributes) => {
    if (attributes === undefined) {
        return {};
    }

    const dataset = {};

    Object.keys(attributes).forEach(
        (oneKey) => {
            const oneAttribute = attributes[ oneKey ];

            dataset[ 'data-' + oneAttribute.nodeName ] = oneAttribute.textContent;
        }
    );

    return dataset;
};

/**
 * @param {Element} xmlBlock XML element to be converted
 *
 * @return {Array} array of React Elements
 */
const create_HTML_from_XML = (xmlBlock) => {
    const nodes = xmlBlock.childNodes;

    const componentChildren = [];

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[ i ];

        if (node.tagName === undefined) {
            componentChildren.push(node.textContent);
            continue;
        }
        const dataset = _attribute_to_dataset(node.attributes);

        // Needed for react's internal
        // Otherwise it complains the `key` attribute is missing
        dataset.key = i;

        const childrenComponents = create_HTML_from_XML(node);
        const span = React.createElement(
            'span',
            dataset,
            childrenComponents
        );

        componentChildren.push(span);
    }

    return componentChildren;
};

/**
 * @param {Element} block XML element to which we will add attributes
 * @param {NamedNodeMap} attributesMap HTML attributes to be converted
 *
 * @return {Element} The XML block with the newly added attributes
 */
const _data_attributes_to_XML_attributes = (block, attributesMap) => {
    if (attributesMap === undefined) {
        return block;
    }

    const attributes = Array.from(attributesMap);
    const dataAttributes = attributes.filter(
        (oneAttribute) => {
            return oneAttribute.nodeName.startsWith('data-');
        }
    );

    dataAttributes.forEach(
        (dataAttribute) => {
            block.setAttribute(
                dataAttribute.nodeName.substr('data-'.length),
                dataAttribute.value
            );
        }
    );

    return block;
};

/**
 * @param {Element} span HTML element for which we will convert all children
 * @param {Element} xmlDest XML element in which we will add all the converted
 *                          children
 *
 * @return {Element}
 */
const create_XML_from_HTML = function (span, xmlDest) {
    const nodes = span.childNodes;

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[ i ];

        // Happens because reactjs, as of december 2017,
        // Put html comments in the DOM to keep track of its
        // Internal state
        if (node.nodeType === Node.COMMENT_NODE) {
            continue;
        }

        if (node.tagName === undefined) {
            const textNode = document.createTextNode(node.textContent);

            xmlDest.appendChild(textNode);
            continue;
        }
        let block = document.createElement('block');

        block = _data_attributes_to_XML_attributes(block, node.attributes);
        block = create_XML_from_HTML(node, block);
        xmlDest.appendChild(block);
    }

    return xmlDest;
};

export default {
    create_XML_from_HTML,
    create_HTML_from_XML,
};
