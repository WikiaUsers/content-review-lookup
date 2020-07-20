
Chat
/* Add Buttons */
$(window).load(function addButtons() {
    var $o = $('#Rail');
    if ($o.length === 0) {
        setTimeout(addButtons, 250);
    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
        var $div = $('<div>').css('display', 'none').attr('id', 'chatOptionsButton');
        $o.prepend($div, dayNightButton());
    }
});
 
/* Day/Night Switch Feature */
function dayNightButton() {
    var dayText = 'Day theme';
    var nightText = 'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}
 
/* Emoticons config */
window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};
 
/* Chat topic */
//Remember to escape single quotes in the topic using \' to prevent this from breaking
var chatTopic = 'Welcome to the Miraculous Ladybug Wiki chat.<br>Please read <a href="Miraculous_Ladybug_Wiki:Chatroom Policy" target="_blank">the rules</a> before chatting.';
$(function() {
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>');
});
 
/* Import Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Tabinsert.js',
        'u:dev:MediaWiki:CustomChatPings/code.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:IsTyping/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js'
    ]
});