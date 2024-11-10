/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

$(function() {
    var cat = mw.config.get('wgCategories')
	
	if (cat.indexOf('Нове Покоління') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:NPStyles.css",
            ]
        });
    } else if (cat.indexOf('Гра Бога') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IBStyles.css",
            ]
        });
    } else if (cat.indexOf('Бездоганний СВІТ') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IMStyles.css",
            ]
        });
    } else if (cat.indexOf('Голос Часу') !== -1 && mw.config.get('wgPageName') != "Окетра") {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:GVStyles.css",
            ]
        });
    } else if (cat.indexOf('Тринадцять Вогнів') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:TOStyles.css",
            ]
        });
    } else if (cat.indexOf('Остання Дійсність') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:PRStyles.css",
            ]
        });
    }
    else if (cat.indexOf('Серце Всесвіту') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:SVStyles.css",
            ]
        });
    }
    
});