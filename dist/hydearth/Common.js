/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ExploreMenuIcons.js',
    ]
});

/* RailModule */
window.AddRailModule = [{prepend: true}];

/* UploadMultipleFiles */
mw.config.set('UMFBypassLicenseCheck', true);