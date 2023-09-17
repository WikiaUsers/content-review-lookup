//Credit to the Runescape Wiki.

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the World Meeting <br>Read  <a href="The Site Ruless" target="_blank">the rules</a> or else.' 
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<divclass="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#000000;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:Italic;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
 
/*Tab Insert*/
importScriptPage('User:Joeytje50/tabinsert.js','runescape')
 
//Thank the My Little Pony Wiki.
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto" align="center"><a class="clearChatButton wikia-button">Clean up the mess!</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button