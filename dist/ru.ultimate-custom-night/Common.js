/** Настройки скриптов **/
/**** AJAX RC ****/
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "Доступ к комментариям закрыт, так как блог не комментировали <expiryDays> дней"
};
/** ИМПОРТЫ **/
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Fantom.js',
        'u:dev:MediaWiki:Medals/code.js',
        "u:dev:MediaWiki:DiscordIntegrator/ru/code.js",
        "u:dev:MediaWiki:LockOldBlogs/code.js"
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CustomGalleryButton.js',
    ]
});
/** КОНЕЦ ИМПОРТОВ **/