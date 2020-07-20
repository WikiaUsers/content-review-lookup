/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importArticles({ type: 'script', articles: [ 
    'MediaWiki:Common.js/standardeditsummaries.js',
]});

/* Неактивность пользователей для JS http://dev.wikia.com/wiki/InactiveUsers */
/* Подгружен через http://ru.craft-the-world.wikia.com/wiki/MediaWiki:ImportJS */
InactiveUsers = { 
    months: 2,
    gone: ['Sendmessage', ],
    text: 'неактивен'
};
/* конец настройки неактивных пользователей */