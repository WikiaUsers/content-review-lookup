var chatags = { images: true, videos: true };

chatAnnouncementsAll = true;

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'MediaWiki:Chat.js/inline.js'
        // ...
    ]
});

// All credit goes to Penguin-Pal //
$(function() {
	var gap = 30,
		chatResizeEmoticons = $('<style style="text/css" />');
	$(chatResizeEmoticons).appendTo("head");
	function request() {
		$.getJSON("/api.php?action=query&format=json&prop=revisions&titles=MediaWiki:Emoticons|MediaWiki:ChatResizeEmoticons.css&rvprop=content&cb=" + new Date().getTime(), function(data) {
			var a = data.query.pages,
				content = {emoticons: [], css: ""};
			for (var pageid in a) {
				if (a[pageid].title == "MediaWiki:ChatResizeEmoticons.css") {
					$(chatResizeEmoticons).html(a[pageid].revisions[0]["*"]);
				} else {
					content.emoticons.push(a[pageid].revisions[0]["*"]);
				}
			}
			mw.config.set("EMOTICONS", content.emoticons.join("\n\n"));
		});
	}
	// make first request when joining the room
	request();
	// request again every every 'gap' seconds
	setInterval(request, gap * 1000);
});