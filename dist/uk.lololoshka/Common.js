/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
// Кастомний CSS для сторінок по сезону Тринадцять Вогнів

$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Тринадцять Вогнів') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:TOStyles.css",
            ]
        });
    }
});

// І для ГЧ
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Голос Часу') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:GVStyles.css",
            ]
        });
    }
});

// Не забудем про БС
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Бездоганний СВІТ') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IMStyles.css",
            ]
        });
    }
});