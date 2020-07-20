/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/*Снежок*/
 
importArticles({
    type: 'script',
    articles: [
        'u:c:MediaWiki:Snow.js'
    ]
});


/* Таблички в профайлах */
 
MastRights = {};
MastRights["Иопад Гракх"] = ["Верховный Курфюст"];
MastRights["Deshi 34"] = ["Основатель-создатель"];
MastRights["Кирзик или СуперУитли "] = ["Второй курфюст", "Великий святой"];
MastRights["DarkDiamond14"] = ["Быший курфюст"];
MastRights["Квакша4"] = ["Первый курфюст"];
MastRights["КалигаристМарараш"] = ["Временный и зелёный Администратор"];
importScriptPage("MediaWiki:Masthead.js", "ru.c");