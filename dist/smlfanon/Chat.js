/*User/Admin Imperial Wyrm is Forbidden from ever using CSS/JS without Alissa the Wise Wolf's permission.*/
var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
         'u:dev:ChatSendButton.js',
         'u:kocka:MediaWiki:AjaxCommentDelete/code.js',
         'u:dev:MediaWiki:!mods/code.js',
         'u:kocka:MediaWiki:Emoticons.js',
         'u:dev:MediaWiki:ChatModHover/code.js',
    ]
});

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');