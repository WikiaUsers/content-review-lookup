importArticles({
    type: 'script',
    articles: [
        'u:kocka:Emoticons/code.js', // EmoticonsWindow
        'u:dev:PrivateMessageAlert/code.js',
        'u:su:!mods.js'
    ]
})
 
/* Chat Rules button */
$.get(location.origin + "/wiki/Forum:User_conduct_guidelines?action=render", function(data) {
	mw.util.addCSS("#ChatRulesModalContent{height:400px;overflow-y:auto}.ChatRulesButton{float:center; position:relative; text-align: center;}#ChatRulesModalContent ul{list-style-type:square;margin-left:15px}");
	var modalContent = '<div id="ChatRulesModalContent">' + data + '</div>';
 
	$('body').on('click', '.rules', function(e) {
        e.preventDefault();
		$.showModal("Rules", modalContent, {
			id: "ChatRulesModal",
			width: 500,
			buttons: [{
				id: "ChatRulesCloseButton",
				defaultButton: true,
				message: "Close",
				handler: function() {
					$("#ChatRulesModal").closeModal();
				}
			}]
		});
	});
});
 
/* Emoticons help text */
window.kockaEmoticons = {
    vocab: {
        help: 'Choose an emoticon by clicking on it. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list</a>.'
    }
};
 
/* Fix Prvate Messaging crashing */
ChatView.prototype.processText = function(text, allowHtml) {
	if (text === undefined)
		return '';
	if (!allowHtml) {
		text = text.replace(/</g, "&lt;");
		text = text.replace(/>/g, "&gt;");
	}
	var localWikiLinkReg = '^' + wgServer + wgArticlePath;
	localWikiLinkReg = localWikiLinkReg.replace(/\$1/, "(\\S+[^.\\s\\?\\,])");
	localWikiLinkReg = new RegExp(localWikiLinkReg,"i");
	if (!allowHtml) {
		var exp = /\b(ftp|http|https):\/\/(\w+:{0,1}\w*@)?[a-zA-Z0-9\-\.]+(:[0-9]+)?\S+[^.\s\?\,]/ig;
		text = text.replace(exp, function(link) {
			var linkName = link;
			var match = localWikiLinkReg.exec(link);
			if (match !== null ) {
				linkName = match[1].replace(/_/g, " ");
			}
			try {
				linkName = decodeURIComponent(linkName);
			} catch (e) {}
			linkName = linkName.replace(/</g, "&lt;");
			linkName = linkName.replace(/>/g, "&gt;");
			return '<a href="' + link + '">' + linkName + '</a>';
		});
	}
	var linkify = function(article, linkText) {
		article = article.replace(/ /g, "_");
		linkText = linkText.replace(/_/g, " ");
		linkText = unescape(linkText);
		linkText = linkText.replace(/</g, "&lt;");
		linkText = linkText.replace(/>/g, "&gt;");
		var path = wgServer + wgArticlePath;
		article = encodeURIComponent(article);
		article = article.replace(/%2f/ig, "/");
		article = article.replace(/%3a/ig, ":");
		var url = path.replace("$1", article);
		return '<a href="' + url + '">' + linkText + '</a>';
	}
	var exp = /\[\[([^\[\|\]\r\n\t]*)\|([^\[\]\|\r\n\t]*)\]\]/ig;
	text = text.replace(exp, function(wholeMatch, article, linkText) {
		if (!linkText) {
			var colonLocation = article.indexOf(":");
			if (colonLocation == -1) {
				linkText = article;
			} else {
				linkText = article.substring(colonLocation + 1);
			}
		}
		return linkify(article, linkText);
	});
	var exp = /(\[\[[^\[\]\r\n\t]*\]\])/ig;
	text = text.replace(exp, function(match) {
		var article = match.substr(2, match.length - 4);
		var linkText = article.replace(/_/g, " ");
		return linkify(article, linkText);
	});
	text = WikiaEmoticons.doReplacements(text, this.emoticonMapping);
	return text;
};