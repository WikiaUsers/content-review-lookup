/* Отправление фоток и т.п. в чате */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatImages/code.js',
    ]
});

/* Кто пишет в чате */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping/code.js',
    ]
});

/* Кик админов из чата */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FixAdminKick/code.js',
    ]
});