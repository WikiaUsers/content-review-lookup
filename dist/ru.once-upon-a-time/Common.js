/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

var MessageBlock = {
  title: 'Блокировка',
  message: 'Вы были заблокированы на $2 по причине $1',
  autocheck: true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};