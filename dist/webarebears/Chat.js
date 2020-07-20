/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(clearChatText());
    }
}

/* Clear chat */
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
    }
}
function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}
window.onload = addClearChatText();
 
/* Chat options */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
}

/* Chat Topic */
var chatTopic = 'Welcome to the We Bare Bears Wiki chat. Please make sure you read the <a href="/wiki/We_Bare_Bears_Wiki:Chatroom_Policy" target="_blank" title="Chatroom Policy"><u>chatroom policy</u></a> before chatting.';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 15px; color:#6E3823; font-family:Chewy; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
 
// Function for message input
$('[name="message"]').keypress(function(e) {
  if (e.which == 13) {
    var message = this.value;
    //Prevent other wiki chats being linked in main chat
    if (message.match(/Special:Chat/i) && mainRoom.active === true) {
      e.preventDefault();
      inlineAlert('You cannot post other wiki chats in the main chat.');
    }
 
  }
})
 
//Other tweak
$('<p class="private" style="display:block" id="collapseUsersMain">Members [<a href="#" id="collapseUsersLink">show/hide</a>]</p>').insertAfter($("#Rail .public.wordmark").last());
$('#collapseUsersLink').click(function(){console.log($("#WikiChatList").slideToggle())});
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:ChatTimestamps/code.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:runescape:User:Joeytje50/tabinsert.js'
    ]
});