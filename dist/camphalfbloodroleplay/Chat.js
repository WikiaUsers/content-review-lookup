//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<a href="/wiki/Camp_Half-Blood_Role_Playing_Wiki:Policies" target="_blank" title="Policies">Policies</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/wiki/Camp_Half-Blood_Role_Playing_Wiki:Guide_to_Getting_Started" target="_blank" title="Guide_To_Getting_Started">Getting Started Guide</a>'  
 
$(function() {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:90%;z-index:0;font-size:15px;line-height:1.6;color:#000000;margin:7px;">'+chatTopic+'</div>')
                .find('a').attr('style','position:relative;color:#000000;text-decoration:none;')
})
 
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

var chatags = { images: true, videos: true };

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

importScriptPage('MediaWiki:CustomModIcons.js', 'dev');

/* Chat Options */
importScriptPage('ChatOptions/code.js', 'dev');