//Begin Guide
 
/* Signifies Window */
/** Signifies Module **/
/*** Signifies Module Section ***/
/*Null Section*/
//Notes OR Null Line
 
//End Guide
 
/* Chat Topic */
var chatTopic = 'Welcome to the TOTMGsRock Universe Chat';
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 13px;color:#00FFFF;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
 
/*!Kick Failure Message*/
window.absentMessage = '<user> is not currently in the chat.';
 
/*Chat Statuses Alphabetized*/
window.ChatStatus = {
	statuses: {
		annoyed: "is annoyed",
		indefinitely: "is away indefinitely",
		temporarily: "is away temporarily",
		beating: "is beating the shit out of enemy entities",
		eating: "is eating",
		edit: "is editing",
		illuminati1: "is fighting the illuminati boss",
		illuminati2: "is fighting the illuminati MEGAboss",
		illuminati3: "is fighting the illuminati miniboss",
		game: "is gaming",
		reading: "is reading",
		rip: "is resting in peace",
		watching: "is watching youtube",
		lol: "is [insert reason to be away here]",
		derp: "._.",
		maxderp: ".___."
	},
	debug: false
};
 
importArticles({
	type: "script",
	articles: [
        // ...
		"u:dev:MediaWiki:ChatStatus/code.js",
		"u:dev:ChatDelay/code.js"
        // ...
	]
});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:ChatHacksNoStar/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js'
        // ...
    ]
});

/* Chat Rules button */
$.get(location.origin + "/wiki/Steven Universe Wiki:Chatroom Policy?action=render", function(data) {
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
 
/* PM Crash Fix */
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
 
/* Imports */
importArticles({
    type: 'script',
    articles: [
        // ...
        "u:dev:MediaWiki:ChatStatus/code.js",
        //"u:dev:ChatDelay/code.js",
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:!mods/code.js'
        // ...
    ]
});