// ============================================================
// EDIT-INTRO FIX for Update articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Function: Adds EditIntro to all Update pages 
//           when "edit this page" link is clicked
// ============================================================
 
$(function() {
	if (wgCanonicalNamespace == 'Update') {
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:Updatehelp');
	}
});