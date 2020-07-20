//Add chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color:#000000>Welcome to the Yoylecakesberry Wiki chat! <br/ >Before you use the chat, make sure to read the <a href="/wiki/Yoylecakesberry Wiki:Rules" target="_blank" title="Rules"><u>rules</u></a>. Have fun!</font>'
 
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
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:GiveChatMod/code.js',
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
]});