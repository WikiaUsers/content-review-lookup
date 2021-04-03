/**
 * main.js
 *
 * Looks up content in JavaScript pages globally.
 */
import {apiQuery, readJSON} from './util.js';
import {dirname, join} from 'path';
import {mkdir, writeFile} from 'fs/promises';
import {Bar} from 'cli-progress';
import {createWriteStream} from 'fs';
import sanitize from 'sanitize-filename';

/**
 * Constants.
 */
const errors = createWriteStream('errors.txt'),
      WIKI_VALIDATION_REGEX = /^https?:\/\/([a-z0-9-.]+)\.(fandom\.com|wikia\.(?:com|org)|(?:wikia|fandom)-dev\.(?:com|us|pl)|gamepedia\.(?:com|io))\/?([a-z-]*)/u,
      THREADS = 40;

/**
 * Gets all JavaScript pages from a wiki's MediaWiki namespace.
 * @param {string} url Wiki URL
 * @param {Map<string, string>} pages Page name => content map to populate
 * @param {string} gapcontinue Parameter to continue with
 * @param {string} rvcontinue Parameter to continue listing revisions with
 */
async function getJSPages(url, pages, gapcontinue, rvcontinue) {
    const response = await apiQuery(url, {
        gapcontinue,
        gapfilterredir: 'nonredirects',
        gaplimit: 50,
        gapnamespace: 8,
        generator: 'allpages',
        prop: 'revisions',
        rvcontinue,
        rvprop: 'content',
        rvslots: 'main'
    });
    const {error, query, warnings} = response;
    const c = response.continue;
    const truncated = c && c.rvcontinue;
    if (error) {
        throw new Error(error.code);
    }
    if (warnings && !truncated) {
        console.warn();
        console.warn('API warning: ', warnings);
    }
    if (!query) {
        // No pages.
        return;
    }
    for (const {title, revisions} of Object.values(query.pages)) {
        if (title.endsWith('.js')) {
            if (!revisions || !revisions[0]) {
                if (!truncated) {
                    console.warn();
                    console.warn('No revisions:', title, revisions, url);
                }
            } else if (revisions[0]['*']) {
                // Legacy wiki.
                pages.set(title, revisions[0]['*']);
            } else if (revisions[0].slots) {
                pages.set(title, revisions[0].slots.main['*']);
            } else {
                // No content on page.
            }
        }
    }
    if (c) {
        const apcontinue = c.gapcontinue || gapcontinue;
        await getJSPages(url, pages, apcontinue, c.rvcontinue);
    }
}

/**
 * Processes a JS page's content.
 * @param {string} url Wiki URL
 * @param {string} page Page title
 * @param {string} content Page content
 */
async function processContent(url, page, content) {
    const wikiRes = WIKI_VALIDATION_REGEX.exec(url);
    if (wikiRes) {
        wikiRes.shift();
        const subdomain = wikiRes.shift();
        const domain = wikiRes.shift();
        const language = wikiRes.shift();
        const pagename = page
            .replace(/^[^:]+:/u, '')
            .replace(/\//gu, '--');
        let folder = subdomain;
        if (domain !== 'fandom.com') {
            folder += `.${domain}`;
        }
        if (language) {
            folder = `${language}.${folder}`;
        }
        const file = join(`dist/${folder}`, sanitize(pagename, {
            replacement: '_'
        }));
        try {
            await mkdir(dirname(file), {
                recursive: true
            });
            await writeFile(file, content, {
                flag: 'wx'
            });
        } catch (error) {
            console.error('File creation error for', page, 'on', url, error);
            errors.write(`File creation error for ${page} on ${url}: ${JSON.stringify(error)}\n`);
        }
    } else {
        console.error('Failed to parse wiki URL:', url);
        errors.write(`Failed to parse wiki URL: ${url}.\n`);
    }
}

/**
 * Gets all JS pages from a wiki and processes them.
 * @param {string} url Wiki URL
 * @param {number} attempt Current amount of attempts on server error
 */
async function getWiki(url, attempt) {
    try {
        const pages = new Map();
        await getJSPages(url, pages);
        for (const [title, content] of pages.entries()) {
            await processContent(url, title, content);
        }
    } catch (error) {
        const {code, message, name, response} = error;
        if (code === 'ENOTFOUND' || name === 'ParseError') {
            // Nonexistent wiki.
        } else if (code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
            // One of old.something.fandom.com wikis.
            errors.write(`SSL error: ${url}.\n`);
        } else if (message === 'readapidenied') {
            // Private wiki.
            errors.write(`Private wiki: ${url}.\n`);
        } else if (response && response.statusCode === 403) {
            // Internal wiki.
            errors.write(`Permission denied on ${url}.\n`);
        } else if (response && response.statusCode === 410) {
            // Closed wiki.
        } else if (response && response.statusCode >= 500) {
            // Fandom oof'd.
            if (attempt === 10) {
                console.error(url, error);
                errors.write(`${response.statusCode} on ${url}: ${JSON.stringify(error)}\n`);
            } else {
                await getWiki(url, attempt + 1);
            }
        } else if (response && response.statusCode) {
            // wat.
            console.error(url, error);
            errors.write(`Error code ${response.statusCode}: ${url}.\n`);
        } else {
            console.error('Unusual error on', url, error);
            errors.write(`Unusal error on ${url}: ${JSON.stringify(error)}\n`);
        }
    }
}

/**
 * Main function.
 */
async function run() {
    const urls = await readJSON('urls.json');
    const allUrls = urls.length;
    const bar = new Bar({
        barsize: 40,
        clearOnComplete: true,
        format: '[{bar}] {percentage}% ({value}: {eta}s)',
        stopOnComplete: true,
        stream: process.stdout
    });
    bar.start(allUrls, 0);
    while (urls.length) {
        await Promise.all(urls.splice(0, THREADS)
            .map(url => getWiki(url, 1)));
        bar.update(allUrls - urls.length);
    }
    bar.stop();
    errors.close();
}

run();
