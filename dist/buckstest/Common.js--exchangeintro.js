// ============================================================
// EDIT-INTRO FIX for Exchange articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Function: Adds EditIntro to all Exchange pages 
//           when "edit this page" link is clicked
// ============================================================
 
$(function() {
	if (wgCanonicalNamespace == 'Exchange' && wgPageName.indexOf("/Data") == -1) {   
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:GEMWHelp');
	}
});