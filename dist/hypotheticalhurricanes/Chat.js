/** <pre>
 * This file loads for every user the wiki chat.
 * For skin specific variants see [[MediaWiki:Chat.css]]
 * for oasis respectively
 *
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 * Alternatively, Wikia's code editor has jshint embedded to make life extra simple.
 *
 */

window.chatags = { images: true, videos: true };

window.chatAnnouncementsAll = true;
window.chatAnnouncementsAnonymous = true;

importArticles({
    type: 'script',
    articles: [
        // ...
        'MediaWiki:Chat.js/inline.js',
        'MediaWiki:Chat.js/multiPM.js',
        'MediaWiki:Chat.js/multiKick.js',  
        'MediaWiki:CustomChatStars.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:IsTyping/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        // ...
    ]
}, {
    type: 'style',
    article: 'MediaWiki:ChatResizeEmoticons.css'
});
/*
	auto refresh emoticons and css
	all credit goes to Penguin-Pal
*/
$(function() {
    var gap = 30,
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