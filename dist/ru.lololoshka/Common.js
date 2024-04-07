/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Кастомный CSS для статей по сезону Тринадцать Огней
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Последняя Реальность') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:PRStyles.css",
            ]
        });
    }
});


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

// И для ГВ
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Голос Времени') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:GVStyles.css",
            ]
        });
    }
});

// Не забудем про ИМ
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Идеальный МИР') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IMStyles.css",
            ]
        });
    }
});


// ИБ
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Игра Бога') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:IBStyles.css",
            ]
        });
    }
});

// НП
$(function() {
    var cat = mw.config.get('wgCategories')

    if (cat.indexOf('Новое Поколение') !== -1) {
        importArticles({
            type: "style",
            articles: [
                "MediaWiki:NPStyles.css",
            ]
        });
    }
});