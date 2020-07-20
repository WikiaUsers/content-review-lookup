// This configuration option makes FastDelete script
// append the button into page content instead of page header
// so wikis can import this script without breaking the
// customization policy.
window.FastDeleteSitewide = true;

// Importing the script
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:FastDelete/code.js'
});