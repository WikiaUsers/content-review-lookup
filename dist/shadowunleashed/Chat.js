//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Hey, you made it'
 
//Credits where credits are due

importScriptPage('User:Benjaminthewill123123/1.js', 'creepypasta');
 
//**********************
//   Ratelimit Start
//**********************
 
var maxLimit = 5; 
var maxLength = 1250; 
var limitTimeout = 5000;
 
var rate = 0;
function ratelimit(e) {
	if (rate > maxLimit) {
		this.disabled = true;//disabling input in case they press ESC before the redirect is complete
		e.preventDefault();
		mainRoom.sendMessage({which : 13, shiftKey : false, preventDefault : function() {} })
		document.location.href = wgServer+"/wiki/Special:UserLogout";
		return false;
	}
	if (this.value.length>=maxLength || this.value.split('\n').length>=6) {
		var val = this.value.substring(0,maxLength).split('\n');
		val = val[0]+'\n'+val[1]+'\n'+val[2]+'\n'+val[3]+'\n'+val[4];//remove all lines after the 5th line.
		this.value = val;
		if (e.type == 'keypress') {
			e.preventDefault();
			return false;
		}
	}
	if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
		rate += 1;
		setTimeout(function() {
			if (rate > 0) { rate -= 1 }
		},limitTimeout);
	}
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
 
//**********************
//   Ratelimit End
//**********************
 
//**********************
//   Chat Header Start
//**********************
 
var chatTopic = 'Please enjoy your '
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
//**********************
//Chat Header End
//**********************
 
//**********************
//   Mod Stars Start
//**********************
setInterval(function() {
 $('#Rail .User.chat-mod:not(.admin) .username').each(function() {
 if (!this.innerHTML.match(/Business Cat|Dream Hacked|Wolfenmaus|CPwikiCHATlogger/)) { $(this).parent().addClass('admin'); 
     } 
  });
}, 1000)
 
//**********************
//   Mod Stars End
//**********************
 
//**********************
//   Chat Options Start
//**********************
 
importScriptPage('MediaWiki:Chat.js/options.js', 'creepypasta');
 
//**********************
//   Chat Options End
//**********************

document.title = "Chat - " + wgSitename;

 
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button