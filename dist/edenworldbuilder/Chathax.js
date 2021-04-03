importScriptPage('User:Monchoman45/ChatHacks.js', 'c');
 
importScriptPage('User:Joeytje50/ChatPMs.js', 'c');
 
importScriptPage('BackToTopButton/code.js', 'dev');
 
importScriptPage('User:Madnessfan34537/multikick.js', 'callofduty');

function WikiActivity2RecentChanges() {
	$('.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="http://images1.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges)