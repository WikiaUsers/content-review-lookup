
/* Clear chat /
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}
*/

importScriptPage('ChatOptions/code.js', 'dev');
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

var chatTopic = 'Welcome fellow ghouls! <br/> <a target="_blank" href="/wiki/Chat_policies">Rules</a> • <a target="_blank" href=/wiki/Thread:5488">ChatTags Guide</a> • <a target="_blank" href="/wiki/MediaWiki:Emoticons">Emoticons</a> • <a target="_blank" href="/wiki/Help:Chat">Chat Information</a>'; 
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',,
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:NewMessageCount.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js'
]
});