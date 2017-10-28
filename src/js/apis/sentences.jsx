import reduxApi, { transformers } from 'redux-api';

const API_URL = 'http://172.17.0.5';

const Sentences = reduxApi(
    {
        'list' : {
            'url' : `${ API_URL }/sentences`,
            'transformer' : transformers.array,
        },
        'one' : {
            'url' : `${ API_URL }/sentences/:id`,
        },
    }
);

const adapter_fetch = (url, options) => {
    if (options.headers === undefined) {
        options.headers = new Headers({
            'Accept' : 'application/json',
        });
    }

    options.mode = 'cors';

    const jsonify_response = (response) => {
        return response.json();
    };

    return fetch(url, options).then(jsonify_response);
};

Sentences.use('fetch', adapter_fetch);

export default Sentences;
