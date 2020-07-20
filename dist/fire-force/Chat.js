// Chat Topic
var chatTopic = 'Welcome to the chat!<br>Please enjoy yourself and have fun. If you are not sure about something, please contact a moderator for assistance. :)';
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align: center;position: absolute;width: 80%;z-index: 0;font-size: 13px;color: white;font-weight: bold;line-height: 1.6;margin-left: 110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative; text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// Chat Imports
importArticles({
	type: "script",
	articles: [
             "w:c:dev:!mods/code.js",
             "w:c:dev:ChatOptions/code.js"
	]
});