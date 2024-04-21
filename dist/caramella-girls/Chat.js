window.WordFilter = $.extend(window.WordFilter, {
    alert: 'You are about to post a banned word. Continuing may result in being kicked or banned.',
    badWords: ['faggot', 'fag', 'dyke', 'tits', 'pussy', 'clit', 'boner', 'cum', 'dildo', 'horny', 'blowjob', 'masturbate', 'fuck', 'bitch', 'slut', 'cunt', 'dick', 'cock', 'skank', 'nibba', 'c0ck', 'nig', 'd!ck']
});

window.ajaxEmoticonsInterval = 60000;
window.chatAnnouncementsAnonymous = true;

//Feature Related
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
        'u:dev:MediaWiki:ChatSendButton.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:BlinkingTabAlert.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:MediaWiki:EmoticonDragAndDrop.js',
        'u:dev:MediaWiki:AjaxEmoticons/code.js',
        'u:dev:MediaWiki:ChatLinkPreview.js',
        'u:dev:MediaWiki:ChatImages/code.js',
        'u:dev:MediaWiki:Tabinsert.js',
        'u:dev:MediaWiki:Tictactoe/code.js',
    ]
} );
//Staff Related
importArticles( {
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:CustomModIcons.js',
        'u:dev:MediaWiki:Custom-chat-ban-template/code.js',
        'u:dev:MediaWiki:WordFilter/code.js',
    ]
} );
//Import for Chat Staff
if (mw.config.get('wgUserGroups').includes('chatmoderator') ||
    mw.config.get('wgUserGroups').includes('threadmoderator') || 
    mw.config.get('wgUserGroups').includes('sysop')) 
    {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:ChatCount.js',
        ]
    });
}