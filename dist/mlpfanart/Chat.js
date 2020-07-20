// Imports
var chatLoader = setInterval(function() {
  if (typeof mainRoom !== "undefined") { //wait for chat to load
		importArticles({
			type: 'script',
			articles: [
				'u:dev:AjaxEmoticons/code.js',
				'u:dev:ChatAnnouncements/code.js',
				'u:dev:ChatTimestamps/code.js',
				'u:dev:PrivateMessageAlert/code.js'
			]
		});
		clearInterval(chatLoader);
	}
}, 200);
 
// ************
// START Chat options import
// ************
 
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// ****************
 
$(function() {
    
// Credit to RuneScape and Call of Duty Wiki
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Fan Wiki Chat! Please make sure to read the rules and other information <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>here</u></a>.';

$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">' + chatTopic + '</div>').find('a').css('position:relative;text-decoration:underline;');
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// Change mod icons depending on the time; add custom stars as well 
// Written by Foodbandlt
 
var customStarUpdate;
 
function nighttime_moon() {
	var hours = new Date().getHours();
 
	if (hours >= 18 || hours <= 7)
		$('.User.chat-mod').addClass('modnight').removeClass('modday');
	else
		$('.User.chat-mod').addClass('modday').removeClass('modnight');
 
	// Specify those who you don't want a mod star to appear for here and chat bots
	var noModStar = [],
	chatBots = [];
 
	for (var i in noModStar)
		$('.User[data-user="' + noModStar[i] + '"]').removeClass('modday modnight');
 
	for (var i in chatBots)
		$('.User[data-user="' + chatBots[i] + '"]').removeClass('modday modnight').addClass('bot');
 
	console.log("Custom stars updated");
 
	if (typeof customStarUpdate !== "number") {
		customStarUpdate = setInterval(function(){nighttime_moon();}, 10*60*1000);
	}
	else {
		clearInterval(customStarUpdate);
		customStarUpdate = setInterval(function(){nighttime_moon();}, 10*60*1000);
	}	
}

// Update mod stars after user list has loaded
var userListLoader = setInterval(function() {
	if ($('#WikiChatList .User').length) {
		nighttime_moon();		
		clearInterval(userListLoader);
	}
}, 200);
 
// Update mod stars when users become away/come back
window.mainRoom.socket.bind('updateUser', function() { 
	nighttime_moon();
});
 
// Update mod stars when users join chat
window.mainRoom.socket.bind('join', function() {
	nighttime_moon();
});

// Change the document title for chat
 
document.title = "Chat - " + mw.config.get('wgSiteName');

// Custom inline alerts
function inlineAlert(msg) {
  mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
  $('[name="message"]').val('').removeAttr('disabled').focus();  
}

// Process message input
$('[name="message"]').keypress(function(e) {
  if (e.which == 13) {
 
    var message = this.value;
 
    // Stop posting of pure whitespace
    if (!message.trim()) {
      e.preventDefault();
      $('[name="message"]').val('').removeAttr('disabled').focus();  
    }
 
    // Prevent other wiki chats being linked in main chat
    if (/Special:Chat/i.test(message) && mainRoom.active === true) {
      e.preventDefault();
      inlineAlert('You cannot post other wiki chats in the main chat.');
    }
 
  }
});
 
});