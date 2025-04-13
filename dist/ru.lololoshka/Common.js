/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

$(function() {
    var cat = mw.config.get('wgCategories')
	if (cat.indexOf('Новое Поколение') !== -1 && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:NPStyles.css",
            ]
        });
    } else if (cat.indexOf('Игра Бога') !== -1 && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IBStyles.css",
            ]
        });
    } else if (cat.indexOf('Идеальный МИР') !== -1 && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IMStyles.css",
            ]
        });
    } else if (cat.indexOf('Голос Времени') !== -1 && mw.config.get('wgPageName') != "Окетра" && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:GVStyles.css",
            ]
        });
    } else if (cat.indexOf('Тринадцать Огней') !== -1 && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:TOStyles.css",
            ]
        });
    } else if (cat.indexOf('Последняя Реальность') !== -1 && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:PRStyles.css",
            ]
        });
    }
    else if (cat.indexOf('Сердце Вселенной') !== -1 && cat.indexOf('Межсезонные персонажи') == -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:SVStyles.css",
            ]
        });
    }
    
});