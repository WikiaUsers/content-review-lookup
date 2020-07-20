/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:admintools:MediaWiki:Common.js/undoSummary.js',
        'u:admintools:MediaWiki:Common.js/extraRollbacks.js',
        'u:admintools:MediaWiki:Common.js/ajaxRollback.js'
    ]
});