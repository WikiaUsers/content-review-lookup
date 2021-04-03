//Cred to MLB for how to prepend
$(function() {
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+'This is Number 1 Miraculous Superfans Wiki. Welcome! And have a good day :)'+'</div>');
});

window.ChatStatus = {
	statuses: {
		afk: "Away",
		on: "Online",
		laugh: "Laughing!",
		hop: "Hopping from tab to tab",
		edit: "Editing",
		food: "Eating",
		look: "Looking Something Up",
		ladybug: "Defeating Hawkmoth with CN's help",
		cat: "Defeating Hawkmoth with LB's help",
		emotion: "Sensing for emotions",
		akuma: "Evilizing akuma",
		flyaway: "Allowing akuma to fly away and evilize them!",
		helping: "Giving advice to the akumatized villain",
		fight: "Fighting Ladybug and Cat Noir, again.",
		hwon: "Wait, a second, defeated LB and CN! Must be a trick....",
		out: "Heading out"
	},
	debug: false
};
window.chatAnnouncementsAll = true;

window.PrivateMessageAlert = $.extend(window.PrivateMessageAlert, {
    beepSound: '',
//  no beep noise
    message: '$1 sent you a message!',
    notifications: true,
    alertWhileFocused: true,
    interval: 2000
});
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
var chatTopic = 'Welcome to the Number 1 Miraculous Superfans Wiki chat.<br>Please read <a href="Number 1 Miraculous Superfans Wiki:Chatroom Policy" target="_blank">the rules</a> before chatting.';
$(function() {
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>');
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
        'u:dev:MediaWiki:Jumbles/code.js',
        'u:dev:MediaWiki:Jumbles/startup.js',
        'u:dev:MediaWiki:Jumbles/gameinterface.js',
        'u:dev:MediaWiki:IsTyping/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:ChatInterwikiLinks/code.js',
        'u:dev:MediaWiki:ChatTimestamps/code.js',
        'u:dev:MediaWiki:ChatDeveloperTools.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:PrivateMessageAlert/code.js'
        
         
    ]
});