/* Any JavaScript here will be loaded for all users on every page load. */

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/* Auto-refresh */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page every 60 seconds';

/* batch delete */
batchDeleteDelay = 1000;

/* Import articles */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/WikiaTimeScript.js',

        'u:dev:AllPagesHideRedirect/code.js',
        'u:dev:AjaxBatchDelete/code.2.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:ArchiveTool/code.js',
        'u:dev:UserTags/code.js',
        'u:zh.pad.wikia.com:MediaWiki:CountDown.js'
    ]
}, {
	type: 'style',
	article: 'u:zh.pad.wikia.com:MediaWiki:CountDown.css'
});