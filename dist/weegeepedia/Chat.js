//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to WeegChat.<br /><a href="/wiki/Weegeepedia:Chat" target="_blank" title="Weegeepedia:Chat" style="position:relative;text-decoration:underline;">Rules</a> • <a href="/wiki/Weegeepedia:Chat/Help" target="_blank" title="Weegeepedia:Chat/Help" style="position:relative;text-decoration:underline;">Information</a> • <a href="http://weegee-roleplay-zone.wikia.com/" target="_blank" title="Weegeepedia Roleplay Zone" style="position:relative;text-decoration:underline;">Roleplay</a>';

 $(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#FFFFFF;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
/*Tab Insert*/
importScriptPage('User:Joeytje50/tabinsert.js','runescape');

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');