// credits to Runescape Wiki
var chatTopic = 'Welcome to the Creators Tavern Chat, the Fanon Munter Hunter Wiki Special:Chat.<br /><a href="/wiki/Help:Monster Hunter Wiki Chat Room#Rules" target="_blank" title="Help:Fanon Monster Hunter Wiki Chat Room" style="position:relative;text-decoration:underline;">Special:Chat Rules</a> • <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="MediaWiki:Emoticons" style="position:relative;text-decoration:underline;">Emoticons</a>'
 
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
	importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
}
// ****************
// END Chat options import
// ****************

// **********************************************************************
importArticles({ type: 'script', articles: [
    'u:dev:MediaWiki:ChatHacks.js'
]});

// **********************************************************************
importScriptPage('MediaWiki:FixAdminKick/code.js','dev');