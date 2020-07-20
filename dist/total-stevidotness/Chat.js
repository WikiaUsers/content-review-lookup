importArticles({
    type: 'script',
    articles: [
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:Tabinsert.js', // Tab Insert
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:!mods/code.js',
        'u:dev:!kick/code.js'
    ]
});

/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
        importScriptPage('MediaWiki:Emoticons/code.js', 'kocka');
        setTimeout(function() {
            $('.kockaEmoticonsSpan').wrap('<div class="chat-button" />');
        }, 2500);
    }
}

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
var chatTopic = 'Welcome to the Stevidot Wiki chat. <br>Please read  <a href="Stevidot_Wikia:Chatroom_Rules" target="_blank">the rules</a> before chatting.';
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

// Custom inline alerts
function inlineAlert(msg) {
  mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
  $('[name="message"]').val('').removeAttr('disabled').focus();  
}

// KockaEmoticons help text change
window.kockaEmoticons = {
    help: 'Choose an emoticon by clicking on it. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list</a>.'
};
 
// Function for message input
$('[name="message"]').keypress(function(e) {
  if (e.which == 13) {
 
    var message = this.value;
 
    // Stop posting of whitespace
    if (!message.trim()) {
      e.preventDefault();
      $('[name="message"]').val('').removeAttr('disabled').focus();  
    }
  }
});