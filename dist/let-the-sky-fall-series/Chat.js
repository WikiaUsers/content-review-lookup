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
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
    ]
});
importScriptPage('ChatOptions/code.js', 'dev');
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
      'u:dev:MediaWiki:ChatDeveloperTools.js'
    ]
});