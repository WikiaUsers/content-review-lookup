/* Для пользовательской страницы участница = неактивный участник */
//Inactive users
InactiveUsers = { 
    months: 3,
    text: 'Неактивный Участник'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});