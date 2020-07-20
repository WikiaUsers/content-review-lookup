/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    }
}
 
 
/**
 * Clear chat
 */
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
 
/**
 * Chat options
 *   By [[User:Callofduty4]], [[User:Madnessfan34537]], and [[User:Sactage]]
 *   From the Call of Duty Wiki
 */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}
 
importArticles({
    type: 'script',
    articles: [
        'u:kocka:Emoticons/code.js', // EmoticonsWindow
        'u:dev:Tabinsert.js', // Tab Insert
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js'
    ]
});

// Custom inline alerts
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}
 
// Function for message input
$('[name="message"]').keypress(function(e) {
    if (e.which == 13 && !e.shiftKey) {

        var message = this.value;

        // Stop posting of whitespace
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        // Prevent other wiki chats being linked in main chat
        if (/[\/[:=]Special:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post other wiki chats in the main chat.');
        }
        // Prevent several websites being linked in main chat
        if (/60484617|54176365|kat\.cr|thepiratebay|toonget|theworldofstevenuniverse|animeflavor|kisscartoon|gogoanime|beachcitybugle|toonova|watchonlinecartoons|madridista-4-life|madridista-forever/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post this link in the main chat because it might violate our policies.');
        }
    }
});

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
var chatags = { images: true, videos: true };

importScriptPage("MediaWiki:Chat.js/inline.js")