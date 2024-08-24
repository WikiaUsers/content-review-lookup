/**
 * main.js
 *
 * Looks up content in JavaScript pages globally.
 */
import {WriteStream, createWriteStream} from 'fs';
import {apiQuery, notify, readJSON} from './util.js';
import {dirname, join} from 'path';
import {mkdir, writeFile} from 'fs/promises';
import {Bar} from 'cli-progress';
import sanitize from 'sanitize-filename';

const WIKI_VALIDATION_REGEX = /^https?:\/\/([a-z0-9-.]+)\.fandom\.com\/?([a-z-]*)/u;
const THREADS = 40;

/**
 * Gets all JavaScript pages from a wiki's MediaWiki namespace.
 * @param {string} url Wiki URL
 * @param {string} gapcontinue Parameter to continue with
 * @param {string} rvcontinue Parameter to continue listing revisions with
 * @returns {AsyncGenerator<string[], never, void>} Titles and content
 */
async function* getJSPages(url, gapcontinue, rvcontinue) {
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
                    console.warn('No revisions:', title, revisions, url);
                }
            } else if (revisions[0].slots) {
                yield [title, revisions[0].slots.main['*']];
            } else {
                console.warn('No content on page:', title, url);
            }
        }
    }
    if (c) {
        const apcontinue = c.gapcontinue || gapcontinue;
        yield * await getJSPages(url, apcontinue, c.rvcontinue);
    }
}

/**
 * Processes a JS page's content.
 * @param {string} url Wiki URL
 * @param {string} page Page title
 * @param {string} content Page content
 * @param {WriteStream} errors Stream to write errors to
 */
async function processContent(url, page, content, errors) {
    const wikiRes = WIKI_VALIDATION_REGEX.exec(url);
    if (wikiRes) {
        const [, subdomain, language] = wikiRes;
        const pagename = page.replace(/^[^:]+:/u, '').replace(/\//gu, '--');
        const folder = language ? `${language}.${subdomain}` : subdomain;
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
 * @param {WriteStream} errors Stream to write errors to
 * @param {number} attempt Current amount of attempts on server error
 */
async function getWiki(url, errors, attempt) {
    try {
        for await (const [title, content] of getJSPages(url)) {
            await processContent(url, title, content, errors);
        }
    } catch (error) {
        const {code, message, name, response} = error;
        if (code === 'ENOTFOUND' || name === 'ParseError') {
            errors.write(`Not a wiki: ${url}.\n`);
        } else if (code === 'ETIMEDOUT' || code === 'ECONNRESET') {
            if (attempt === 10) {
                errors.write(`Timeout on ${url}.\n`);
            } else {
                await getWiki(url, errors, attempt + 1);
            }
        } else if (code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
            errors.write(`TLS error: ${url}.\n`);
        } else if (message === 'readapidenied') {
            errors.write(`Private wiki: ${url}.\n`);
        } else if (response) {
            switch (response.statusCode) {
                case 403:
                    errors.write(`Permission denied on ${url}.\n`);
                    break;
                case 404:
                    errors.write(`Nonexistent wiki: ${url}.\n`);
                    break;
                case 410:
                    // Closed wiki.
                    break;
                case 500:
                case 502:
                case 503:
                case 504:
                    if (attempt === 10) {
                        errors.write(`${response.statusCode} on ${url}: ${JSON.stringify(error)}\n`);
                    } else {
                        await getWiki(url, errors, attempt + 1);
                    }
                    break;
                default:
                    errors.write(`Error code ${response.statusCode}: ${url}.\n`);
            }
        } else {
            console.error('Unusual error on', url, error);
            errors.write(`Unusal error on ${url}: ${JSON.stringify(error)}\n`);
        }
    }
}

/**
 * Runs a separate branch of the event loop to fetch scripts from wikiss in
 * parallel.
 * @param {string[]} wikiUrls URLs of wikis to fetch
 * @param {WriteStream} errorStream Stream to write errors to
 * @param {Bar} bar Progress bar to update
 */
async function runInParallel(wikiUrls, errorStream, bar) {
    while (wikiUrls.length > 0) {
        const wikiUrl = wikiUrls.shift();
        await getWiki(wikiUrl, errorStream, 1);
        bar.increment();
    }
}

/**
 * Main function.
 */
async function run() {
    await notify('Started fetching sitewide JavaScript pages.');
    const urls = await readJSON('urls.json');
    const allUrls = urls.length;
    const bar = new Bar({
        barsize: 40,
        clearOnComplete: true,
        format: '[{bar}] {percentage}% ({value}: {eta}s)',
        stopOnComplete: true,
        stream: process.stdout
    });
    const errorStream = createWriteStream('errors.txt');
    bar.start(allUrls, 0);
    await Promise.all(
        Array(THREADS)
            .fill(0)
            .map(() => runInParallel(urls, errorStream, bar))
    );
    bar.stop();
    errorStream.close();
    await notify('Finished fetching sitewide JavaScript pages.');
}

run();
