/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.UserTagsJS = {
    modules: {
        inactive: 10,
        newuser: {
            days: 5,
            edits: 15
        }
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MediaWiki:ArticlePreview.js',
 
    ]
});