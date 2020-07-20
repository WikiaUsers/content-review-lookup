/* Auto updating recent changes opt-in.
 * See w:c:dev:AjaxRC for info & attribution.
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

/* Auto blocked message.
 * See w:c:dev:BackToTopButton for info & attribution.
 */
 
var MessageBlock = {
    title: 'Block.',
    message: 'You have been blocked for $2 for the following reason(s): "$1"',
    autocheck: true
};

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:MediaWiki:DisplayClock/code.js',
        'u:dev:MediaWiki:LastEdited/code.js',
        'u:dev:MediaWiki:MessageBlock/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:QuickCreateUserPage/code.js',
        'u:dev:MediaWiki:SignatureCheck/code.js',
        //...
    ]
});