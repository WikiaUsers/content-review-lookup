window.WordFilter = $.extend(window.WordFilter, {
    alert: 'You are about to post a banned word. Continuing may result in being kicked or banned.',
    badWords: ['faggot', 'fag', 'dyke', 'pussy', 'clit', 'boner', 'cum', 'dildo', 'horny', 'blowjob', 'masturbate', 'nibba', 'nig',]
});
 
window.ajaxEmoticonsInterval = 60000;
window.chatAnnouncementsAnonymous = true;
 
//FeatureRelated
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:ChatCount.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:BlinkingTabAlert.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:MediaWiki:ChatLinkPreview.js',
        'u:dev:MediaWiki:ChatImages/code.js',
    ]
} );
//StaffRelated
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:Custom-chat-ban-template/code.js',
        'u:dev:MediaWiki:WordFilter/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:CustomModIcons.js',
    ]
} );