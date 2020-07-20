/* Script originally written by Mfaizsyahmi for Hitler Parody Wiki (http://hitlerparody.wikia.com/wiki/user:mfaizsyahmi), used on this wiki with permission. 
Please obtain his permission before using it on other wikis. No technical support provided - ask the local admins. */
/* For identifying admins from Hitler Parody Wiki*/
 
(function($, Array) {
	var HPWadmins = [ 
		"KakashiBallZ", 
		"Blakegripling ph", 
		"Elite Prime",
		"MabusWinnfield",
		"Mfaizsyahmi",
		"FegeleinParodies",
		"Benad361",
		"Soalric"
		]
	var adminCommentSelectors = new Array();
	var adminCommentDeclarations = "background-color: #333333";
	/* for the comment chevrons */
	var adminCommentDeclarations2 = "border-color: transparent #333333 #333333 transparent !important";
	var adminLinkSelectors = new Array();
	var adminLinkDeclarations = "color: #00cc00";
 
	for (var i = 0; i < HPWadmins.length; i++) {
		var adminname = HPWadmins[i].replace(' ','_');
		adminCommentSelectors.push('ul#article-comments-ul li[data-user="' + HPWadmins[i] + '"]');
		adminLinkSelectors.push('.WikiaPageContentWrapper a[href*="/wiki/User:'+ adminname +'"], .WikiaPageContentWrapper a[href*="/wiki/Message_Wall:'+ adminname +'"]');
	}
 
	$('head').append('<style id="adminhilights">' + adminCommentSelectors.join(' blockquote, ') + ' blockquote {' + adminCommentDeclarations + '}' + adminCommentSelectors.join(' .speech-bubble-message:after, ') + ' .speech-bubble-message:after {' + adminCommentDeclarations2 + '}' + adminLinkSelectors.join(', ') + '{' + adminLinkDeclarations + '}</style>')
 
})(jQuery, Array);