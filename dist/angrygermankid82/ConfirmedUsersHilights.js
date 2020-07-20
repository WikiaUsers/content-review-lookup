/* For the account who is confirmed that it belongs to him/herself */
 
(function($, Array) {
	var confirmedusers = [ 
		"TheKewlOne96"
		]
	var adminCommentSelectors = new Array();
	var adminCommentDeclarations = "background-color: #442244";
	/* for the comment chevrons */
	var adminCommentDeclarations2 = "border-color: transparent #442244 #442244 transparent !important";
	var adminLinkSelectors = new Array();
	var adminLinkDeclarations = "color: #ff44ff";
 
	for (var i = 0; i < confirmedusers.length; i++) {
		var adminname = confirmedusers[i].replace(' ','_');
		adminCommentSelectors.push('ul#article-comments-ul li[data-user="' + confirmedusers[i] + '"]');
		adminLinkSelectors.push('.WikiaPageContentWrapper a[href*="/wiki/User:'+ adminname +'"], .WikiaPageContentWrapper a[href*="/wiki/Message_Wall:'+ adminname +'"]');
	}
 
	$('head').append('<style id="adminhilights">' + adminCommentSelectors.join(' blockquote, ') + ' blockquote {' + adminCommentDeclarations + '}' + adminCommentSelectors.join(' .speech-bubble-message:after, ') + ' .speech-bubble-message:after {' + adminCommentDeclarations2 + '}' + adminLinkSelectors.join(', ') + '{' + adminLinkDeclarations + '}</style>')
 
})(jQuery, Array);