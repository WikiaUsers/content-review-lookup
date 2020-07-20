/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
importArticles({
    type: 'script',
    articles: [
        'w:dev:MediaWiki:WallGreetingButton/code.js'
    ]
});
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

/** Запись рейтинга WAM **/
window.railWAM = {
    logPage:"Project:WAM Log"
};