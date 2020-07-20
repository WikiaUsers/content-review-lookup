// 08:58, December 11, 2019 (UTC)
// <source lang="JavaScript">
chatAnnouncementsAnonymous = true;
window.NoKickHigherUps = true;
window.KickHierarchy = [
    'staff',
    'wiki-manager',
    'sysop',
    'threadmoderator',
    'chatmoderator',
    'helper',
    'vstf'
];

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:ChatTags/code.js', 'dev');
importScriptPage('MediaWiki:TitleNotifications/code.js', 'dev');
importScriptPage('MediaWiki:ChatBlockButton/code.2.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatLinkPreview.js',
        'u:dev:IsTyping.js',
]
});

// Mark Administration Members (please keep in alphabetical order) //
$('.User').first().attr('data-user', mw.config.get('wgUserName'));