/* Any JavaScript here will be loaded for all users on every page load. */

// temporarily disable commenting in these pages
// to prevent spamming/trolling
// Adapted from: http://vocaloid.wikia.com/wiki/MediaWiki:Common.js/disablecomments2.js

((function() {
	if ( wgPageName == 'Tooru_Mutsuki' && 
		($.inArray('autoconfirmed', $.extend([], wgUserGroups)) < 0) ) {

		var commentChecker = setInterval(function(){checkIfComments()},500);
	 
		function checkIfComments() {
			if ( !($("#WikiaArticleComments").hasClass("loading")) ) {
				$('.MiniEditorWrapper').remove();
				$('.article-comm-reply').remove();
				$('.article-commText').remove();
				$('#article-comments-counter-header').text("Commenting is disabled.");
			}
		}
	}
})());