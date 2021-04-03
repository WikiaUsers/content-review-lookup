/* <pre> */
 
// Has the Navigation templates set to be hidden by default
var ShowHideConfig = { autoCollapse: 0 };
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ShowHide/code.js',
        'u:dev:CollapsibleInfobox/code.js', //for examples on [[CollapsibleInfobox]]
        'MediaWiki:Maintenance.js'
    ]
});
 
/* Changes WikiActivity to Recent Changes */
$(function () {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
});
 
/* </pre> */

importScriptPage('ShowHide/code.js', 'dev');