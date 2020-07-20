//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<center>Welcome to Glorious! Please sure to treat all other guests with respect.</center>' 
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<divclass="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#000000;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()