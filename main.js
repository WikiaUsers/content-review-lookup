/**
 * main.js
 *
 * Looks up content in JavaScript pages globally.
 */
'use strict';

/**
 * Importing modules.
 */
const fs = require('fs'),
      path = require('path'),
      progress = require('cli-progress'),
      util = require('./util.js'),
      config = require('./config.json'),
      urls = require('./urls.json');

/**
 * Constants.
 */
const results = fs.createWriteStream('results.txt'),
      errors = fs.createWriteStream('errors.txt'),
      WIKI_VALIDATION_REGEX = /^https?:\/\/([a-z0-9-.]+)\.(fandom\.com|wikia\.(?:com|org)|(?:wikia|fandom)-dev\.(?:com|us|pl))\/?([a-z-]*)/u;

function getJS(url) {
    return util.getJSON(`${url}/wikia.php`, {
        controller: 'JSPagesSpecial',
        format: 'json'
    });
}

function getBatch(url, pages) {
    return util.apiQuery(url, {
        titles: pages.join('|'),
        prop: 'revisions',
        rvprop: 'content',
        indexpageids: true
    })
}

async function processContent(url, page, content) {
    const wikiRes = WIKI_VALIDATION_REGEX.exec(url);
    if (wikiRes) {
        wikiRes.shift();
        const subdomain = wikiRes.shift(),
              domain = wikiRes.shift(),
              language = wikiRes.shift(),
              pagename = page
                .replace(/^MediaWiki:/, '')
                .replace(/\//g, '--');
        let folder = subdomain;
        if (domain !== 'fandom.com') {
            folder += `.${domain}`;
        }
        if (language) {
            folder = `${language}.${folder}`;
        }
        const file = path.join(`dist/${folder}`, pagename);
        try {
            await fs.promises.mkdir(path.dirname(file), {
                recursive: true
            });
            await fs.promises.writeFile(file, content);
        } catch (error) {
            console.error(
                'An error occurred while creating a file for',
                page, 'on', url, error
            );
        }
    } else {
        console.error('Failed to parse wiki URL:', url);
    }
    for (const pattern in config.patterns) {
        if (config.patterns[pattern].exec(content)) {
            results.write(`${pattern}: ${url}/wiki/${util.encode(page)}\n`);
        }
    }
}

async function getWiki(url) {
    try {
        const pages = Object
                .values((await getJS(url)).jsPages)
                .map(value => value.pageName);
        while (pages.length) {
            const d = await getBatch(url, pages.splice(0, 50));
            if (d.error || !d || !d.query || !d.query.pages) {
                if (typeof d === 'string') {
                    // Nonexistent wiki.
                } else if (d.error && d.error.code === 'readapidenied') {
                    // Private wiki.
                } else {
                    errors.write(`API error: ${url}: ${JSON.stringify(d)}.\n`);
                }
            } else {
                await Promise.all(
                    d.query.pageids
                        .map(id => d.query.pages[id])
                        .filter(page => page.revisions && page.revisions.length)
                        .map(page => processContent(url, page.title, page.revisions[0]['*']))
                    );
            }
        }
    } catch (e) {
        if (e.code === 'ENOTFOUND' || e.name === 'ParseError') {
            // Nonexistent wiki.
        } else if (e.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
            // One of old.something.fandom.com wikis.
        } else if (e.response && e.response.statusCode === 404) {
            // Does not have content review enabled, skip.
        } else if (e.response && e.response.statusCode === 403) {
            // Internal wiki. Or maybe login issue?
            errors.write(`Permission denied on ${url}.\n`);
        } else if (e.response && e.response.statusCode === 410) {
            // Closed wiki.
        } else if (e.response && e.response.statusCode >= 500) {
            // Fandom oof'd.
            console.error(url, e);
            errors.write(`${e.response.statusCode} on ${url}: ${JSON.stringify(e)}\n`);
        } else if (e.response && e.response.statusCode) {
            // wat.
            console.error(e);
            errors.write(`Error code ${e.response.statusCode}: ${url}.\n`);
        } else {
            console.error('Unusual error:', e);
        }
    }
}

async function run() {
    for (const pattern in config.patterns) {
        config.patterns[pattern] = new RegExp(config.patterns[pattern], 'iu');
    }
    await util.logIn(config.username, config.password);
    const allUrls = urls.length,
          bar = new progress.Bar({
              barsize: 25,
              clearOnComplete: true,
              format: '[{bar}] {percentage}% ({value}: {eta}s)',
              stopOnComplete: true,
              stream: process.stdout
          });
    bar.start(allUrls, 0);
    while (urls.length) {
        await Promise.all(urls.splice(0, config.threads).map(getWiki));
        bar.update(allUrls - urls.length);
    }
    bar.stop();
}

run();
