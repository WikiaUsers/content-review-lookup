alertMessage = 'Please do not say any innapropriate words.';
window.badWords.push('shit','fuck','anus','penis','vagina','cunt','whore','motherfucker','asshole','bitch'); 

var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:ChatRefresh/code.js',
        'u:dev:MediaWiki:ChatNotifications/code.js',
        'u:dev:MediaWiki:WordFilter/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});