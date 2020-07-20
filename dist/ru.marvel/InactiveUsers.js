/* Неактивный участник */
//Inactive users
InactiveUsers = { 
    months: 1,
    text: 'Неактивный Участник'
};
 
importScriptPage('InactiveUsers/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});