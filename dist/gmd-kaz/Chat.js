window.ChatStatus = {
    statuses: {
        afk: 'is AFK',
        gaming: 'is gaming',
        busy: 'is busy',
        suck: 'is sucking at life',
        useless: 'is useless',
        dumb: 'is being dumb',
        unhappy: 'is unhappy',
        happy: 'is happy',
        weird: 'is being really weird',
        lag: 'is lagging'
    },
};

var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatHacks.js',
        'u:dev:ChatStatus/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js'
    ]
});