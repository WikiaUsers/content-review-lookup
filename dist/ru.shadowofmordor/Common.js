/*Импорт*/
 
//Masthead entries
importScript("MediaWiki:Common.js/masthead.js");

/*
/Borders for avatars
importScript("MediaWiki:Common.js/border.js");
*/

//Добавление расширения на 4-й и 5-й уровень НавМеню Вики
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});