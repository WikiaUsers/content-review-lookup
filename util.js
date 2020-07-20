/**
 * util.js
 *
 * Utilities shared by spam-finding scripts.
 */
'use strict';

/**
 * Importing modules.
 */
const {CookieJar} = require('tough-cookie'),
      http = require('got').extend({
    cookieJar: new CookieJar(),
    headers: {
        'User-Agent': 'Fandom Global Content Review Lookup, ' +
                      'contact KockaAdmiralac through git@kocka.tech ' +
                      'for specific information.'
    },
    resolveBodyOnly: true,
    retry: 0
});

/**
 * Makes a GET request to a JSON endpoint.
 * @param {String} url URL to query
 * @param {Object} searchParams Query string parameters
 * @returns {Promise} Promise to listen on for response
 */
function getJSON(url, searchParams) {
    return http.get(url, {
        responseType: 'json',
        searchParams
    });
}

/**
 * Queries the MediaWiki API.
 * @param {String} url Wiki URL
 * @param {Object} params Parameters to supply in the query
 * @returns {Promise} Promise to listen on for response
 */
function apiQuery(url, params) {
    params.action = 'query';
    params.cb = Date.now();
    params.format = 'json';
    return getJSON(`${url}/api.php`, params);
}

/**
 * Logs in to Fandom.
 * @param {String} username Username of the user to log in with
 * @param {String} password Password of the user
 * @returns {Promise} Promise to listen on for response
 */
function logIn(username, password) {
    const form = {
        password,
        username
    };
    return Promise.all([
        http.post('https://services.fandom.com/auth/token', {form}),
        http.post('https://services.wikia.org/auth/token', {form})
    ]);
}

/**
 * Encodes URL components MediaWiki-style.
 * Based on mw.util.wikiUrlencode
 * @param {String} url URL component to encode
 * @returns {String} Encoded URL
 */
function encode(url) {
    return encodeURIComponent(url)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/~/g, '%7E')
        .replace(/%20/g, '_')
        .replace(/%3A/g, ':')
        .replace(/%2F/g, '/');
}

module.exports = {
    apiQuery,
    encode,
    getJSON,
    logIn
};
