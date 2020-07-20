// 07:23, June 6, 2019 (UTC)
// <source lang="JavaScript">
chatAnnouncementsAnonymous = true;
window.NoKickHigherUps = true;
window.KickHierarchy = [
    'staff',
    'sysop',
    'threadmoderator',
    'chatmoderator',
    'wiki-manager',
    'helper',
    'vstf'
];

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
importScriptPage('MediaWiki:ChatTags/code.js', 'dev');
importScriptPage('MediaWiki:TitleNotifications/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:!ban/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatAnnouncements/code.js'
]
});

// Mark Administration Members (please keep in alphabetical order) //
$('.User').first().attr('data-user', mw.config.get('wgUserName'));