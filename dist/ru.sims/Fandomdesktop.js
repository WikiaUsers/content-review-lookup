/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importArticles({    type: 'script',    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        'u:dev:MediaWiki:UserBadge/code.js',
    ]});

/* Блокировка ссылки конфигурации */

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;

//настройки для pagePreview
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    noimage: 'https://vignette.wikia.nocookie.net/sims/images/4/47/Placeholder.png/revision/latest?cb=20181213163400&path-prefix=ru',
    RegExp: {
        iimages: [new RegExp('^([Ff]ile:|[Фф]айл:)?Indef\\.png$')],
        ipages: [new RegExp('.*?Дерево[_ ]навыков.*')],
        ilinks: [new RegExp('.*?Дерево[_ ]навыков.*')],
    },
});