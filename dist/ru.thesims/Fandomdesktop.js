/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Стиль кнопки назад dev wiki
window.BackToTopModern = true;

//------------------------------------//
nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "Недавняя вики-деятельность", // Название в меню
    description: "Недавняя вики-деятельность" // Описание гаджета в меню при наведении
}, {
    name: "ModernProfile",
    title: "Современный профиль",
    description: "Современный профиль"
}, {
    name: "UWStyle",
    title: "Единый стиль вики",
    description: "Общее оформление The Sims Вики"
}, {
    name: "Cursor",
    title: "Тематичческий курсор",
    description: "Тематические курсор"
}, {
    name: "UCXSearchBar",
    title: "Быстрый поиск",
    description: "Поисковая строка в локальном меню без модального окна"
}, {
    name: "MultiUpload",
    title: "Выбрать несколько файлов",
    description: "Загрузить несколько файлов на вики"
}];


importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserBadge/code.js',
        'u:dev:MediaWiki:CheckJStatus.js',
    ]
});

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