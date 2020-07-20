//importScriptPage("'User:'+wgUserName+'/global.js", "c");
//importScript('MediaWiki:Chat.js/options.js');
//Doesn't seem to be loading Load, trying work around
//setTimeout(function(),3);

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking. Credit to the Runescape Wikia
document.title = 'WARFRAME Wikia Chat';
var uri=location.href;

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

//Simple detection of custom styles
if (uri=="http://warframe.wikia.com/wiki/Special:Chat") 
     {
          importScript('MediaWiki:Chat.js/options.js');
          importStylesheet('MediaWiki:Chat.css/Bg.css');
          var chatTopic = 'The WARFRAME Wikia chat is now depreciated! Please message the Admins if you are in need of assistance<br /><a href="/wiki/WARFRAME_Wiki:Chat_Policy" target="_blank" title="" style="position:relative;text-decoration:underline;">Chat Policy</a> or click <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="" style="position:relative;text-decoration:underline;">Here</a> for a list of our emotes.';
     }
else 
     {
          var chatTopic = 'Welcome to the WARFRAME Wikia chat! A custom style has been detected, chat options will not be loaded.<br />Please read our <a href="/wiki/WARFRAME_Wiki:Chat_Policy" target="_blank" title="" style="position:relative;text-decoration:underline;">Chat Policy</a> or click <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="" style="position:relative;text-decoration:underline;">Here</a> for a list of our emotes.';
     }