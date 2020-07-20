// AjaxRC Config
window.ajaxSpecialPages = ["WikiActivity", "RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';

// Imports
importArticles({
    type: 'script',
    articles: [
        'u:ru.koffee:MediaWiki:LongPageIcons.js',
        'u:ru.koffee:MediaWiki:WallThreadLikes.js'
    ]
})