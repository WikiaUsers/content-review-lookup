//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Enchanted Forest!! Please make sure to read the policies <a href="/wiki/Once Upon a Time Wiki:Policies#Chat Policies" target="_blank" title="Policies"><u>here</u></a>. This is not a spoiler free chat! Stay at your own risk.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// Change mod icons depending on the time (Written by Foodbandlt)
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
 
// Chat options import
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:ChatOptions/code.js','dev');
}
 
// Anti-chat linking censor
$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/tinychat|Special:Chat/gi, 'w:c:onceuponatime:Project:Chat#Content');
	}
})

// Chat Header
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
 
// Enables images to be posted in chat
var chatags = { images: true, videos: true };

// Custom statuses
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games",
		dragon: "Fighting dragons",
		lost: "Lost in the forest",
		looking: "Searching",
		magic: "Practicing magic",
	},
	debug: false
};

// Imports
importArticles({
	type: "script",
	articles: [
	    'u:dev:MediaWiki:ChatImages/code.js',
	    'u:dev:MediaWiki:ChatStatus/code.js',
	    'u:dev:MediaWiki:FixAdminKick/code.js',
		'u:dev:MediaWiki:GiveChatMod/code.js',
		'u:shining-armor:MediaWiki:ChatTags/code.js',
	]
});