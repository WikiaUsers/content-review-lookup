var chatTopic = 'Hi and welcome to TheMaskedTwoProductions Chat';
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 15px;color:#00BFFF;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});

// Import Chat features
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:dev:!mods/code.js',
    ]
});
importScriptPage('SpeedEmoticon/latest.js', 'korniux');