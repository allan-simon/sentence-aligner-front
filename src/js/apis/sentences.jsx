import reduxApi, { transformers } from 'redux-api';

const API_URL = 'http://172.17.0.5';

const Sentences = reduxApi(
    {
        'list' : {
            'url' : `${ API_URL }/sentences`,
            'transformer' : transformers.array,
        },
    }
);

const adapter_fetch = (url, options) => {
    const headers = new Headers({
        'Accept' : 'application/json',
    });

    options.headers = headers;
    options.mode = 'cors';

    const jsonify_response = (response) => {
        return response.json();
    };

    return fetch(url, options).then(jsonify_response);
};

Sentences.use('fetch', adapter_fetch);

export default Sentences;
