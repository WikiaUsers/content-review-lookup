/* Any JavaScript here will be loaded for all users on every page load. */

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:
 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
 
// The options need to be set before the import! Otherwise they may not work.
 
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

window.dev = window.dev || {};
window.dev.editSummaries = {
    select: [
        '(click to browse)',
        '1.Refactoring', [
            'Cleanup',
            'Corrected spelling/grammar'
            /* etc. */
         ]
         /* etc. */
    ]
};