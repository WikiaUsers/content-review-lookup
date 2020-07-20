var partyLink1 =
"https://images.wikia.nocookie.net/legouniversestories/images/a/a5/Song_of_time_-_Dance_Remix.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"https://images.wikia.nocookie.net/legouniversestories/images/a/a5/Song_of_time_-_Dance_Remix.ogg"; //link to first song in mp3
 
var partyLinkText1 =
"Song of Time (Dance Remix)"; //text for first song
 
var partyLink2 =
"https://images.wikia.nocookie.net/yuzura/images/e/e5/PSY_-_GENTLEMAN_M-V.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"https://images.wikia.nocookie.net/yuzura/images/e/e5/PSY_-_GENTLEMAN_M-V.ogg"; //link to second song in mp3
 
var partyLinkText2 =
"Gentleman - PSY"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/yuzura/images/e/ef/Tim_Wilson_Booty_Man.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"https://images.wikia.nocookie.net/yuzura/images/e/ef/Tim_Wilson_Booty_Man.ogg"; //link to third song in mp3
 
var partyLinkText3 =
"Booty Man - Tim Wilson"; //text for third song
 
var partyLink4 =
"https://images.wikia.nocookie.net/yuzura/images/8/89/Daft_Punk_-_Get_Lucky_%28Full_Video%29.ogg"; //link to fourth song in ogg
 
var partyLinkIE4 =
"https://images.wikia.nocookie.net/yuzura/images/8/89/Daft_Punk_-_Get_Lucky_%28Full_Video%29.ogg"; //link to fourth song in mp3
 
var partyLinkText4 =
"Get Lucky - Daft Punk"; //text for fourth song
 
importScriptPage('MediaWiki:PartyChat.js','funeral-bell');
 
/* Chat options */
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
chatOptionsLoaded = 1;
importScriptPage('MediaWiki:Chat.js/options.js','xiaolinpedia');
}
/* END chat options */
 
/* Clear chat button */
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Muffin button</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
/* END Clear chat button */
 
/* ChatTags */
importScriptPage('ChatTags/code.js', 'dev');