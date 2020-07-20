/* Any JavaScript here will be loaded for all users on every page load. */

var ShowHideConfig = { autoCollapse: 0 };
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev'); //for examples on [[CollapsibleInfobox]]

/* Changes WikiActivity to Recent Changes
function WikiActivity2RecentChanges() {
	$('a.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges);
 */

/*
////////////////////////////////////////////////////////
// Facebook box
////////////////////////////////////////////////////////
*/
 
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=265984866744985&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}
 
$(fBox);
 
/*
////////////////////////////////////////////////////////
// END
////////////////////////////////////////////////////////
*/