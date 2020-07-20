// This configuration option makes RedirectManagement script
// append the button into page content instead of page header
// so wikis can import this script without breaking the
// customization policy.
window.RedirectManagementSitewide = true;

// Importing the script
importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:RedirectManagement/code.js'
});