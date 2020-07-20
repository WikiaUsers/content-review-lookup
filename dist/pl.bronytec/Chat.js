importScriptPage('ChatOptions/code.js', 'dev');

// Credit to RuneScape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Friendship is Magic Wiki Chat! Please make sure to read the rules and other information <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>here</u></a>.<br />Take part in discussion concerning the chat <a href="/wiki/Forum:Chat_discussion" target="_blank">here</a>. Chat logs may be found <a href="/wiki/Project:Chat/Logs" target="_blank" title="Project:Chat/Logs">here</a>.'

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
 $('.User.chat-mod[data-user="Foodbandlt"] .username, .User.chat-mod[data-user="Juan The American Brony"] .username, .User.chat-mod[data-user="The Candlekeeper"] .username').removeClass('modday').removeClass('modnight');

$('.User[data-user="FlutterBot"] .username, .User[data-user="Icecreambot"] .username').removeClass('modday').removeClass('modnight').addClass('bot');
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
window.ignoreBot = "FlutterBot";
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
 
// ****************
// END Chat options import
// ****************

// Change the document title for the chat page

document.title = "Chat - " + wgSitename;

// Credit to Wikianswers

// Chat censor. It causes specified characters to be automatically changed into specific text, when posted into the chat. Useful for breaking posted image links which may contain inappropriate material. Do NOT use it to censor bad words, the only purpose for this is to stop pornographic material being linked.

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/rule34|Rule34|rule_34|Rule_34|rule-34|Rule-34/gi, '(dErPy)');
	}
})

// Anti-chat linking censor

$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
		this.value = this.value.replace(/tinychat|Special:Chat|Special:_Chat/gi, 'w:c:mlp:Project:Chat#Content');
	}
})