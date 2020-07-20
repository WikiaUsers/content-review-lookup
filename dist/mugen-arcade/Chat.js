//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<a href="http://mugen.wikia.com/wiki/MUGEN_Database:Chat_Rules" target="_blank" title="Chat Rules">Chat Rules</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="position:absolute;font-size:15px;font-weight:bold;font-family:tahoma;border-left:1px solid #424242;border-right:1px solid #424242;right:50%;top:5px;padding-left:5px;padding-right:5px;line-height:30px;height:30px;width: 80px;left:126px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
 
var chatTopic2 = '<a href="http://mugen.wikia.com/wiki/User_blog:PlasmoidThunder/Chat_Emoticons_List_(and_Usage_Tags)" target="_blank" title="Emoticon List">Emoticon List</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic2" style="position:absolute;font-size:15px;font-weight:bold;font-family:tahoma;border-left:1px solid #424242;border-right:1px solid #424242;right:50%;top:5px;padding-left:5px;padding-right:5px;line-height:30px;height:30px;width:100px;left:217px;">'+chatTopic2+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
 
var chatTopic3 = '<a href="http://mugen.wikia.com/wiki/User_blog:PlasmoidThunder/Stylised_Chat_Text_(BBCode)" target="_blank" title="BBCode List">BBCode List</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic3" style="position:absolute;font-size:15px;font-weight:bold;font-family:tahoma;border-left:1px solid #424242;border-right:1px solid #424242;right:50%;top:5px;padding-left:4px;padding-right:5px;line-height:30px;height:30px;width:89px;left: 328px;">'+chatTopic3+'</div>')
	.find('a').attr('style','position:relative;text-decoration:none;')
})
 
var chatags = { images: true, videos: true };
 
var PrivateMessageAlert = {
    beepSound: 'https://vignette.wikia.nocookie.net/mugen-arcade/images/e/e6/Shwip.ogg',
    notifications: true
};
 
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:AjaxEmoticons/code.js",
        "u:shining-armor:MediaWiki:ChatTags/code.js",
        "u:mugen:MediaWiki:ChatTags.js",
        /*"u:dev:ChatUserPageButton.js",*/
        "u:dev:NewMessageCount.js",
        "u:mugen:MediaWiki:Pinglist.js",
        "u:dev:MediaWiki:PrivateMessageAlert/code.js"
    ]
});