// credits to Runescape Wiki
var chatTopic = 'Welcome to the Guild Hall Chat, the Monster Hunter Wiki Special:Chat.<br /><a href="/wiki/Help:Monster Hunter Wiki Chat Room#Rules" target="_blank" title="Help:Monster Hunter Wiki Chat Room#Rules" style="position:relative;text-decoration:underline;">Special:Chat Rules</a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons" style="position:relative;text-decoration:underline;">Emoticons</a>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:140px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
// ****************
// END Chat options import
// ****************