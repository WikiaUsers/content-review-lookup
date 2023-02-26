// ===========================================================
// EDIT-INTRO FIX for articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Source: http://runescape.wikia.com/wiki/MediaWiki:Common.js/updateintro.js
// Function: Adds EditIntro to all mainspace pages 
//           when "edit this page" link is clicked
// ===========================================================
 
$(function() {
	if (wgNamespaceNumber == '0') {
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:SpoilWarning');
	}
});
 
importScriptPage('Countdown/code.js', 'dev');
 
importScriptPage('User:Monchoman45/ChatHacks.js', 'c');
 
/* change wiki activity to recent changes */
function WikiActivity2RecentChanges() {
	$('.wikia-button[data-id$="wikiactivity"]').replaceWith('<a data-id="recentchanges" class="wikia-button secondary" accesskey="g" title="Special:RecentChanges" href="/wiki/Special:RecentChanges"><img height="0" width="0" class="sprite activity" src="https://images.wikia.nocookie.net/common/skins/common/blank.gif">Recent Changes</a>');
}
 
addOnloadHook(WikiActivity2RecentChanges);