/*You can have window optionally, but i prefer having window*/
window.bgrandom_list = [
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/d/d6/F1.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/5/52/F2.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/b/b9/F3.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/e/e9/F4.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/7/75/F5.jpg",
    "https://images.wikia.nocookie.net/the-forest-survivor/ru/images/b/bd/F6.jpg"];
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RandomBackground/code.js',
    ]
});

 /* Кликабельная деятельность Автор скрипта: Дима*/

function addLinkInActivityModule() {
    if ($("#WikiaRail section").length >= 2)
        $("#wikia-recent-activity .has-icon").wrap("<a href='https://"+ window.location.host +"/ru/wiki/Special:RecentChanges'>")
    else
        setTimeout(addLinkInActivityModule, 500)
}
addLinkInActivityModule()