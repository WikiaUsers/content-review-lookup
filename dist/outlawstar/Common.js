/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

 importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* Mass Categorization */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/** Summary filler
  * From Dev wiki
  */
 
importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});