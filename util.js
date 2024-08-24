/**
 * util.js
 *
 * Utilities shared by spam-finding scripts.
 */
import {readFile, writeFile} from 'fs/promises';
import {CookieJar} from 'tough-cookie';
import got from 'got';

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
    retry: {
        limit: 0
    },
    timeout: {
        request: 20 * 1000
    }
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

/**
 * Writes data to a JSON file.
 * @param {string} filename File to read JSON from
 * @param {object} data Data to write to the file
 * @returns {Promise<void>} Promise to listen on for completion
 */
export async function writeJSON(filename, data) {
    await writeFile(filename, JSON.stringify(data));
}

/**
 * Posts to a Discord webhook, if any is specified through environment
 * variables.
 * @param {string} content Content to post
 */
export async function notify(content) {
    const webhookUrl = process.env.DISCORD_WEBHOOK;
    if (webhookUrl) {
        await http.post(webhookUrl, {
            json: {content}
        });
    }
}
