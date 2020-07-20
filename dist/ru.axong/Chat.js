// ChatStatus config
window.ChatStatus = {
    statuses: {
        afk: 'Не в сети;',
        edit: 'Редактирует;',
        code: 'Пишет код;',
        happy: 'Счастлив;',
        sad: 'Расстроен;',
        phone: 'На телефоне;',
        tablet: 'На планшете;',
        game: 'Играет;',
        busy: 'Занят;'
    },
};

// ChatTags
var chatags = { images: true, videos: true };

// Import
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:CustomModIcons.js'
    ]
});