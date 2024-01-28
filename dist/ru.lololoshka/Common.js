/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Кастомный CSS для статей по сезону Тринадцать Огней

$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Тринадцать Огней') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:TOStyles.css",
            ]
        });
    }
});