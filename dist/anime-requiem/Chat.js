//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'From this moment on...none of you are safe.' 
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<divclass="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#000000;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button



 
/* ChatOptions */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
 
/*Tab Insert*/
importScriptPage('User:Joeytje50/tabinsert.js','runescape')

importArticles({
    type: "script",
    articles: [
        // ...
        "u:dev:IsTyping/code.js",
        // ...
    ]
});

var chatags = { videos: true };

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');