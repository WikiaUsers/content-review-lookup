window.chatags = { images: true, videos: true };
 
window.chatAnnouncementsAll = true;
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        // ...
    ]
});