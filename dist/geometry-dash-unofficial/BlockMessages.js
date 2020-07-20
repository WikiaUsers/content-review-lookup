(function () {
    'use strict';
    var messages = $(".Thread .comments .message");
    for (var i = 0; i < messages.length; i++) {
        var messageUser = $(messages[i] + " .speech-bubble avatar a[href='https://wingsoffire.fandom.com/wiki/Message_Wall:Moonwatcher_Beauty']");
        if (messageUser.length > 0) {
            $('.message-' + (i + 1) + ' .msg-body p').remove();
        }
    }
})();