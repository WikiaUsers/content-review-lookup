// Credit to RuneScape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Chat! </a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// Creating /me command
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me' || this.value == '/ME') {
			this.value = '* '+wgUserName;
		}
	}
}
 
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
 $('.User.chat-mod[data-user="Foodbandlt"] .username, .User.chat-mod[data-user="Callofduty4"] .username').removeClass('modday').removeClass('modnight');
}
 
nighttime_moon();
setInterval(function(){nighttime_moon()}, 10*60*1000);
 
// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
importScriptURI("https://raw.github.com/sactage/wikia-js-snippets/master/ChatOptions.js"); //Load from GitHub
 
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
		this.value = this.value.replace(/tinychat|Special:Chat/gi, '(chiCKen)');
	}
}