window.chatags = { images: true, videos: true };

window.chatAnnouncementsAll = true;

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'MediaWiki:Chat.js/inline.js',
        // ...
    ]
});

$(function() {	var gap = 30,
		css = $('<style style="text/css" />');
	$(css).appendTo('head');
	function request() {
		$.getJSON('/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Emoticons|MediaWiki:ChatResizeEmoticons.css&rvprop=content&cb=' + new Date().getTime(), function(data) {
			var a = data.query.pages;
			for (var pageid in a) {
				if (a[pageid].title === 'MediaWiki:ChatResizeEmoticons.css') {
					$(css).text(a[pageid].revisions[0]['*']);
				} else if (a[pageid].title === 'MediaWiki:Emoticons') {
					updateEmoticons(a[pageid].revisions[0]['*']);
				}
			}
		});
	}
	function updateEmoticons(newEmoticons) {
		mw.config.set('wgChatEmoticons', newEmoticons);
		ChatView.prototype.emoticonMapping = new EmoticonMapping();
		ChatView.prototype.emoticonMapping.loadFromWikiText(newEmoticons);
	}
	// make first request when joining the room
	request();
	// request again every every 'gap' seconds
	setInterval(request, gap * 1000);
});