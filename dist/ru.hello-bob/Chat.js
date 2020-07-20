window.ChatStatus = {
    statuses: {
        editor:'Делает правки;',
        bug:'На багах и лагах;',
        phone:'Пишет с телефона;',
        inact:'Малоактивен;',
        afk:'АФК;'
    },
};
importArticles({
    type: 'script',
    articles: [
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:ChatOptions/code/ru.js'
    ]
});