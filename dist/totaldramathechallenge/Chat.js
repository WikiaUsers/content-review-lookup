/*Courtesy of the Runescape Wiki*/

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking. 
var chatTopic = 'Welcome to Wawanakwa. <br>Read <a href="http://tdicamps.wikia.com/wiki/Forum:Rules" target="_blank">the rules</a> or suffer the consequences.'

$(function() {
$('#ChatHeader .public.wordmark').prepend('<divclass="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#000000;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()