/**
 * util.js
 *
 * Utilities shared by spam-finding scripts.
 */
import {CookieJar} from 'tough-cookie';
import got from 'got';
import {readFile} from 'fs/promises';

/**
 * HTTP client.
 */
const http = got.extend({
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
export function getJSON(url, searchParams) {
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
export function apiQuery(url, params) {
    params.action = 'query';
    params.format = 'json';
    return getJSON(`${url}/api.php`, params);
}

/**
 * Reads a JSON file.
 * @param {string} filename File to read JSON from
 * @returns {*} Parsed JSON file
 */
export async function readJSON(filename) {
    return JSON.parse(await readFile(filename, {
        encoding: 'utf-8'
    }));
}

