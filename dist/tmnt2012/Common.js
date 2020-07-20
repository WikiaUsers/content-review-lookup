/**
 * This is the central JavaScript file for the Wiki. Any code placed in here will
 * run on every page for every user (logged in or not) on every skin (Oasis or
 * Monobook).
 * Only JS which works on both Oasis and Monobook should be here, if it doesn't work
 * on one or the other then use MediaWiki:Wikia.js (Oasis) or MediaWiki:Monobook.js
 * [[w:c:Help:JavaScript_and_CSS_Cheatsheet]]
 * Credit goes to Lunarity for the codes.
 */
/*jshint smarttabs:true laxcomma:true laxbreak:true jquery:true browser:true */
/*global mediaWiki */
 
(function(window, $, mw) {
	"use strict";
 
	// Bulk loading scripts.
	// scriptList are scripts to load everywhere
	// pageScriptList are scripts which only certain pages need.
	var scriptList = [], pageScriptList = [];
 
	// Make WantedFiles File:xxx entries become links to Special:Upload (bug fix)
	scriptList.push('MediaWiki:Common.js/FixWantedFiles.js');
 
	// Configure AjaxRC
	(window.ajaxPages = (window.ajaxPages || [])).push(
		"Special:RecentChanges",
		"Special:Watchlist",
		"Special:Log",
		"Special:Contributions",
		"Special:NewFiles",
		"Special:NewPages",
		"Special:ListFiles",
		"Special:WikiActivity"
	);
	window.AjaxRCRefreshText = 'Automatically refresh every 60secs';
	window.ajaxCallAgain = ($.isArray(window.ajaxCallAgain) && window.ajaxCallAgain) || [];
	scriptList.push('w:dev:AjaxRC/code.js');
 
	// Reveal Anonymous Contributors
	window.RevealAnonIP = { permissions: ['bureaucrat', 'sysop'] };
	scriptList.push('w:dev:RevealAnonIP/code.js');
 
	// Reference Popups, like on Wikipedia
	scriptList.push('w:dev:ReferencePopups/code.js');
 
	// Import the Image Switch support JS [Make sure the page is protected to Sysops]
	scriptList.push('MediaWiki:Common.js/TemplateImageSwitch.js');
 
	// User page image template
	scriptList.push('MediaWiki:Common.js/UserImageHotlink.js');
 
	// Navbox fixes and adjustments
	scriptList.push('MediaWiki:Common.js/TemplateNavbox.js');
 
	// Add an edit button for Message Wall Grettings
	if (mw.config.get('wgNamespaceNumber') >= 1200) {
		pageScriptList.push('w:dev:WallGreetingButton/code.js');
	}
 
	// Remove red-links (deleted pages) from Recent Changes
	// [They stay red, they just don't link to ?action=edit]
	if (({Recentchanges: 1, Log: 1})[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
		var deNewRC = function() {
			$('a.new').each(function() {
				this.href = this.href.replace(/\?[^?]*$/, '');
			});
		};
		$(deNewRC);
		window.ajaxCallAgain.push(deNewRC);
	}
 
	// HACK: Wikia have busted their PHP templates for the slider. Sigh.
	$(window).one('load', function() {
		$('.WikiaPhotoGalleryPreview').find('li[class^="wikiaPhotoGallery-slider-"] > a').each(function() {
			var x = this.firstChild;
			if (x.nodeType === 3) { x.nodeValue = ' '; }
		});
	});
})(window, jQuery, mediaWiki);

/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
 
 /**
 * LockOldBlogs
 * See w:c:dev:LockOldBlogs/code.js for info and attribution
 */
window.LockOldBlogs = {
    expiryCategories: ['Blog posts', 'Site news']
};
 
importArticle({
    type: 'script',
    article: 'w:c:dev:LockOldBlogs/code.js'
});