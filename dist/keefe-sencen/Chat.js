importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping/code.js',
    ]
});

window.IsTyping = {
    doScroll: true
};


importArticles({
    type: 'script',
    articles: [
        "u:dev:ChatOptions/code.js",
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:MediaWiki:ChatModHover/code.js',
      'u:dev:!ban/code.js',
      'u:dev:!kick/code.js',
      'u:dev:ChatImages/code.js',
      'u:dev:ChatStatus/code.js',
      'u:dev:GiveChatMod/code.js',
      'u:dev:BlinkingTabAlert.js',
      'u:dev:ChatAnnouncements/code.js',
      'u:dev:ChatBlockButton/code.3.js',
      'u:dev:EmoticonsWindow/code.js',
      'u:dev:IsTyping/code.js',
      'u:shining-armor:ChatTags/code.js',
      'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
      'u:dev:MediaWiki:Day/Night_chat/code.js',
      'u:dev:MediaWiki:PrivateMessageAlert/code.js',
      'u:dev:MediaWiki:ChatDeveloperTools.js',
    ]
});

window.chatAnnouncementsAll = true;
window.ChatStatus = {
    statuses: {
        afk: 'On vacation',
        edit: 'Editing',
        food: 'Eating',
        game: 'Gaming'
    },
    debug: false
};

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