import reduxApi, { transformers } from 'redux-api';

const API_URL = 'http://172.17.0.5';

const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;

const Sentences = reduxApi(
    {
        'list' : {
            'url' : `${ API_URL }/sentences`,
            'transformer' : transformers.array,
        },
        'one' : {
            'url' : `${ API_URL }/sentences/:id`,
        },
        'create' : {
            'url' : `${ API_URL }/sentences`,
            'options' : {
                'headers' : {
                    'Content-Type' : 'application/json',
                },
                'method' : 'post',
            },
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
        // we don't jsonify the body if there's no body...
        if (response.status === HTTP_CREATED ) {
            return response;
        }
        if (response.status === HTTP_CONFLICT ) {
            return response;
        }

        return response.json();
    };

    return fetch(url, options).then(jsonify_response);
};

Sentences.use('fetch', adapter_fetch);

export default Sentences;
