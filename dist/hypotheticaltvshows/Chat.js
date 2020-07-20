var chatags = { images: true, videos: true };
 
chatAnnouncementsAll = true;
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'MediaWiki:Chat.js/inline.js'
        // ...
    ]
});