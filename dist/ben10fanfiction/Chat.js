$(function() {
	//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
	var chatTopic = 'Welcome to Planet Chaturn! Please read our chat policy <a href="/wiki/Project:Community Guidelines/Chat Policy" target="_blank" title="Project:Community Guidelines/Chat Policy"><u>here.</u></a>  If you need an administrator, type !mods';
	
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:lime;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
	$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
	
        importArticles( {
            type: 'script',
            articles: [
                'u:dev:!mods/code.js',
                'u:dev:!kick/code.js',
            ]
        } );

	importScriptPage('ChatOptions/code.js','dev');
	importScriptPage('MediaWiki:Chat.js/newmessage.js', 'runescape').onload = function () {
		importScriptPage('MediaWiki:Chat.js/announce.js');
	};
});
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});
 
importScriptPage('MediaWiki:AjaxEmoticons/code.js', 'dev');
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:NewMessageCount.js'
    ]
});
 
importScriptPage('Mediawiki:ChatEditTools/code.2.js', 'dev');