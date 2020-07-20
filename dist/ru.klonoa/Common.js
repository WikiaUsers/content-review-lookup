/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*Подпись администратора*/
MastRights = {};
MastRights["Sparkiss"] = ["Правитель Му"];

importScriptPage("MediaWiki:Masthead.js", "ru.c");
/* Дополнительные уровни для нав. меню. Код с Developers Wiki */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});