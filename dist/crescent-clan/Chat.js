/* SCRIPT SETTINGS
   Due to how these scripts work, variable-type settings should be set before import */
ajaxEmoticonsInterval = 180000; /* 3 minutes = 180 seconds = 180,000ms */
 
/* IMPORTS */
importArticles({
    type: 'script',
    articles: [
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
 
/* Add Buttons */
$(window).load(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton'), clearChatText();
        importScriptPage('MediaWiki:Emoticons/code.js', 'kocka');
        setTimeout(function() {
            $('.kockaEmoticonsSpan').wrap('<div class="chat-button" />');
        }, 2500);
    }
});
 
// KockaEmoticons help text change
window.kockaEmoticons = {
    help: 'Choose an emoticon by clicking on it. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list</a>.'
};

/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}
 
// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the official CrescentClan chatroom! <br>Please read the rules before joining.';
 
$(function() { 
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">' + chatTopic + '</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// Custom inline alerts
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}
 
// Function for message input
$('[name="message"]').keypress(function(e) {
    if (e.which == 13) {
 
        var message = this.value;
 
        // Stop posting of whitespace
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        // Prevent other wiki chats being linked in main chat
        if (/[\/[]Special:Chat/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('You cannot post other wiki chats in the main chat.');
        }
    }
});

importScriptPage( 'DoTheHarlemShake/code.js', 'dev' );