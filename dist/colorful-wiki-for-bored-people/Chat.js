//Add chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color:#FFFFFF>Welcome to the Colorful wiki chat! <br/ >Please make sure to read the <a href="/wiki/Rules" target="_blank" title="Rules"><u>rules</u></a> before using the chat.</font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#000000; font-weight:normal; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
//CHAT TOPIC END
 
//Chat importArticles
importArticles({
    type: "script",
    articles: [
         "u:shining-armor:MediaWiki:ChatTags/code.js",
         'u:dev:MediaWiki:ChatAnnouncements/code.js',
         'u:dev:MediaWiki:IsTyping.js',
    ]
    });
importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js',
    'u:dev:MediaWiki:EmoticonsWindow/code.js',
    'u:dev:MediaWiki:GiveChatMod/code.js',
    'u:dev:MediaWiki:ChatBlockButton/code.2.js',
]});