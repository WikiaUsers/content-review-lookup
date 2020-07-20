/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*alert('Привет мир');*/
window.railWAM = {
     logPage: 'My log page',
     loadOnPage: 'Special:WikiActivity',
     lang: 'pl',
};
 
// importArticles call
importArticles({
    type: 'script',
    articles: [
        'ru:dev:MediaWiki:RailWAM/code.js'
    ]
});