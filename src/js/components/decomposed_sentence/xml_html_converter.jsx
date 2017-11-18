import React from 'react';

/**
 * @param {NamedNodeMap} attributes
 *
 * @return {Object}
 */
const _attribute_to_dataset = function(attributes) {
    if (attributes === undefined) {
        return {};
    }

    let dataset = {};

    const keys = Object.keys(attributes);
    keys.forEach(
        function(oneKey) {
            const oneAttribute = attributes[oneKey];
            dataset["data-"+oneAttribute.nodeName] = oneAttribute.textContent;;
        }
    );
    return dataset;
};

/**
 * TODO: can certainly be factorized with createXmlFromSpan
 *
 * @param {Element} xmlBlock
 * @param {Element} htmlBlock
 *
 * @return {Element}
 */
const create_HTML_from_XML = function(xmlBlock) {
    const nodes = xmlBlock.childNodes;

    let componentChildren = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tagName === undefined) {
            componentChildren.push(node.textContent);
            continue;
        }
        const dataset = _attribute_to_dataset(span, node.attributes);
        let childrenComponents = create_HTML_from_XML(node);
        let span = React.createElement("span", dataset, childrenComponents);
        componentChildren.push(span);
    }
    return componentChildren;
};


/**
 * @param {Element} span
 * @param {Element} xmlSource
 *
 * @return {Element}
 */
const create_XML_from_HTML = function (span, xmlSource) {
    const nodes = span.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tagName === undefined) {
            const textNode = document.createTextNode(node.textContent);
            xmlSource.appendChild(textNode);
            continue;
        }
        let block = document.createElement("block");
        block = _data_attributes_to_XML_attributes(block, node.attributes);
        block = create_XML_from_HTML(node, block);
        xmlSource.appendChild(block);
    }

    return xmlSource;
};

/**
 * @param {Element} block
 * @param {NamedNodeMap} attributesMap
 */
const _data_attributes_to_XML_attributes = function(block, attributesMap) {
    if (attributesMap === undefined) {
        return block;
    }

    const attributes = Array.from(attributesMap);
    const dataAttributes = attributes.filter(
        (oneAttribute) => {
            return oneAttribute.nodeName.startsWith("data-");
        }
    );
    dataAttributes.forEach(
        (dataAttribute) => {
            block.setAttribute(
                dataAttribute.nodeName.substr("data-".length),
                dataAttribute.value
            );
        }
    );
    return block;
};

export default {
    create_XML_from_HTML,
    create_HTML_from_XML,
};
