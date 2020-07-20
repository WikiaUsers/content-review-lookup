/* Script originally written by Mfaizsyahmi for Hitler Parody Wiki (http://hitlerparody.wikia.com/wiki/user:mfaizsyahmi), used on this wiki with permission. 
Please obtain his permission before using it on other wikis. No technical support provided - ask the local admins. */
/* A short js/jQuery that adds css rules to highlight links to admin's comments and user and message wall links */
 
(function($, Array) {
	var AGKadmins = [ 
		"AGK82"
		]
	var adminCommentSelectors = new Array();
	var adminCommentDeclarations = "background-color: #2B3C4D";
	/* for the comment chevrons */
	var adminCommentDeclarations2 = "border-color: transparent #2B3C4D #2B3C4D transparent !important";
	var adminLinkSelectors = new Array();
	var adminLinkDeclarations = "color: gold";
 
	for (var i = 0; i < AGKadmins.length; i++) {
		var adminname = AGKadmins[i].replace(' ','_');
		adminCommentSelectors.push('ul#article-comments-ul li[data-user="' + AGKadmins[i] + '"]');
		adminLinkSelectors.push('.WikiaPageContentWrapper a[href*="/wiki/User:'+ adminname +'"], .WikiaPageContentWrapper a[href*="/wiki/Message_Wall:'+ adminname +'"]');
	}
 
	$('head').append('<style id="adminhilights">' + adminCommentSelectors.join(' blockquote, ') + ' blockquote {' + adminCommentDeclarations + '}' + adminCommentSelectors.join(' .speech-bubble-message:after, ') + ' .speech-bubble-message:after {' + adminCommentDeclarations2 + '}' + adminLinkSelectors.join(', ') + '{' + adminLinkDeclarations + '}</style>')
 
})(jQuery, Array);