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