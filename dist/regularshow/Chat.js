//Credit to Once Upon a Time Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Please make sure to read the policies <a href="/wiki/Regular_Show_Wiki:Policies#Chat_Policies" target="_blank" title="Policies"><u>here</u></a>.'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// Change mod icons depending on the time 
// Written by Foodbandlt
 
function nighttime_moon(){
 var night = new Date();
 var nighthour=night.getHours();
 
 if (nighthour >= 18 || nighthour <= 7){
  $(".User.chat-mod .username").removeClass("modday").addClass("modnight");
 }else{
  $(".User.chat-mod .username").removeClass("modnight").addClass("modday");
 }

$('.User[data-user="Bot of Solitude"] .username').removeClass('modday').removeClass('modnight').addClass('bot');
if (console) console.log("Mod stars updated");
}
 
nighttime_moon();
 
if (typeof modStarUpdate !== "number"){
  modStarUpdate = setInterval(function(){nighttime_moon()}, 10*60*1000);
}else{
   clearInterval(modStarUpdate);
   modStarUpdate = setInterval(function(){nighttime_moon()}, 10*60*1000);
}
 
// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
window.ignoreBot = "Bot of Solitude";
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
 
// ****************
// END Chat options import
// ****************
 
// Anti-chat linking censor
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/tinychat|Special:Chat/gi, 'w:c:regularshow:Project:Chat#Content');
	}
})

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear window</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button

importScriptPage("ChatTags/code.js", "dev");