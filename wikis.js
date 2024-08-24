/**
 * wikis.js
 *
 * Fetches a list of all wikis on Fandom.
 */
import {notify, writeJSON} from './util.js';
import got from 'got';

const WIKI_REQUEST_LIMIT = 20000;

const WIKI_BLACKLIST = [
    // Private wikis
    'https://languagewikisindex.fandom.com',
    'https://helpers.fandom.com/es',
    'https://internal-soap.fandom.com',
    'https://mpb-test.fandom.com',
    'https://grunny.fandom.com',
    'https://markva.fandom.com',
    'https://communitycouncil.fandom.com',
    'https://pseudobreadsandbox.fandom.com',
    'https://firebirdold.fandom.com',
    'https://somcopy.fandom.com',
    'https://firebirden.fandom.com',
    'https://firebird.fandom.com/fr',
    'https://pliz.fandom.com/pl',
    'https://miri-nae.fandom.com',
    'https://internal-community.fandom.com',
    'https://helpers.fandom.com',
    'https://comdev.fandom.com/pl',
    'https://28.fandom.com/de',
    'https://breakaway.fandom.com',
    'https://wd-fishtank-sandbox.fandom.com',
    'https://screen-junkies-fandom.fandom.com',
    'https://vanguard-sandbox-yugioh.fandom.com',
    'https://staticassetsbase.fandom.com',
    'https://fishtank-secrets.fandom.com',
    'https://sandbox9869508.fandom.com',
    'https://edex-experiments.fandom.com',
    'https://internal-soap.fandom.com',
    'https://barbs-secret-tests.fandom.com',
    'https://nekky.fandom.com',
    'https://blabla.fandom.com',
    'https://furusatosandbox.fandom.com',
    'https://rybatestprivate.fandom.com',
    'https://helpers-mergetest.fandom.com',
    'https://likewise.fandom.com',
    'https://preview.fandom.com',
    'https://verify.fandom.com',
    'https://testwiki-https.fandom.com/szl',
    'https://testwiki-https.fandom.com',
    'https://bitomic.fandom.com',
    'https://wildbot-6.fandom.com',
    'https://wildbot-6.fandom.com/de',
    'https://magiczocker.fandom.com/de',
    'https://fried-bumblebees.fandom.com',
    'https://scum-update-staging.fandom.com',
    'https://cc-revamp.fandom.com/fr',
    'https://ucp-internal-test-gp-redirect.fandom.com/es',
    'https://ucp-internal-test-gp-redirect.fandom.com',
    // Placeholder domain
    'https://services.fandom.com',
    'https://bingebot.fandom.com',
    'https://about.fandom.com',
    'https://about.fandom.com/es',
    'https://about.fandom.com/ru',
    'https://de.fandom.com',
    'https://ru.fandom.com',
    // Invalid response
    'https://gis.fandom.com',
    'https://contribute.fandom.com',
    'https://info.fandom.com',
    'https://xkxd.fandom.com',
    // Redirects to a different website
    'https://suicideprevention.fandom.com',
    // For logged-in users only
    'https://customads.fandom.com',
    'https://makobox.fandom.com',
    // Invalid URLs
    'https://roblox-turret-tower-tycoon-.fandom.com',
    'https://republic-of-cyberia-.fandom.com',
    'https://roblox-slashers-arena-.fandom.com'
];

/**
 * Retrieves wiki information from DWDimensionApi after a certain wiki ID.
 * @param {number} after Which wiki ID to start from (exclusive)
 * @returns {Promise<object[]>} List of wikis fetched
 */
function fetchWikis(after) {
    return got.get('https://community.fandom.com/api/v1/DWDimension/Wikis', {
        searchParams: {
            // eslint-disable-next-line camelcase
            after_wiki_id: after,
            controller: 'DWDimensionApi',
            limit: WIKI_REQUEST_LIMIT
        }
    }).json();
}

/**
 * Retrieves all wikis from DWDimensionApi.
 * @returns {Promise<object[]>} List of all wikis fetched
 */
async function fetchAllWikis() {
    const allWikis = [];
    let currentWikis = [];
    do {
        const lastWikiId = allWikis.length > 0 ?
            Number(allWikis[allWikis.length - 1].wiki_id) :
            0;
        console.debug(`Wikis: ${allWikis.length} | Last: ${lastWikiId}`);
        currentWikis = await fetchWikis(lastWikiId);
        allWikis.push(...currentWikis);
    } while (currentWikis.length > 0);
    return allWikis;
}

/**
 * Filters out wikis that are not properly public or cannot be queried.
 * @param {object[]} wikis All wiki information from DWDimensionApi
 * @returns {string[]} List of filtered wiki URLs
 */
function filterWikis(wikis) {
    return wikis
        .filter(wiki => Boolean(Number(wiki.public)) &&
            !Number(wiki.deleted) &&
            !Number(wiki.is_test_wiki))
        .map(wiki => `https://${wiki.domain}`)
        .filter(url => !WIKI_BLACKLIST.includes(url) &&
            !url.startsWith('https://seo-internal-test-') &&
            !url.startsWith('https://vpn-restricted-'));
}

/**
 * Asynchronous entry point.
 */
async function main() {
    await notify('Started fetching the wiki list.');
    const allWikis = await fetchAllWikis();
    await writeJSON('wikis.json', allWikis);
    await writeJSON('urls.json', filterWikis(allWikis));
    await notify('Finished fetching the wiki list.');
}

main();
