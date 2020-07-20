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
};//*/
 
/* Chat Statuses - Alphabetized */
window.ChatStatus = {
	statuses: {
    editing: "is editing",
    gaming: "is gaming",
    eating: "is eating",
    AFK: "is AFK",
    semiafk: "is semi-afk",
    thinking: "is thinking",
    away: "is away temporarily",
    stalking: "is stalking",
    bored: "is bored",
    polygon: "is being a polygon",
    polygonded: "is killing polygons",
    tank: "is being a tank",
    tankded: "is killing tanks",
    boss: "is a boss",
    ugly: "is ugly",
    suggestive: "is being suggestive :^)",
    gayfag: "is a gay fag"
    gayfag: "is plotting to kill Panzer"
    gayfag: "is destroying Panzer's disciples"
    gayfag: "likes to rek Panzer's ass"
	},
	debug: false
};
 
chatAnnouncementsAll = false;
 
var chatags = { images: true, videos: true };
 
/* Imports */
importArticles({
    type: 'script',
    articles: [
        // ...
        "u:dev:MediaWiki:ChatStatus/code.js",
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'MediaWiki:ANTIPANZER.js'
        // ...
    ]
});