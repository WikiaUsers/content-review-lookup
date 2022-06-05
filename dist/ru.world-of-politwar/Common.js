/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* DiscordBanner */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'BrduMUDAaN',
    prependToRail: false
};

/* ReferencePopups */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

/* SpoilerAlert */
window.SpoilerAlertJS = {
    question: 'Эта область содержит спойлеры. Вы уверены, что хотите это прочитать?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1000
};

/* ChromeToolbarColor */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChromeToolbarColor.js',
    ]
});

/* LinkPreview */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});

/* AdminDashboard JS-Button */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AdminDashboard_JS-Button/code.js',
    ]
});

/* AnalyticsShortcut */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AnalyticsShortcut.js',
    ]
});

/* CategoryQuickRemove */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});

/* CatFilter */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CatFilter/code.js',
    ]
});

/* MultipleActivity */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleActivity.js',
    ]
});

/* GadgetsStateToggler */
nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadgets-definition; обязательно
    title: "Недавняя вики-деятельность", // Название в меню
    description: "Недавняя вики-деятельность" // Описание гаджета в меню при наведении
}, {
    name: "ModernProfile",
    title: "Современный профиль",
    description: "Современный профиль"
}, {
    name: "UWStyle",
    title: "Современный профиль",
    description: "Общее оформление вики-проектов"
}, {
    name: "Quick-insert",
    title: "Быстрая вставка в редакторах",
    description: "Быстрая вставка в редакторах"
}, {
    name: "AddCatInPreview",
    title: "Категории в предпросмотре",
    description: "Категории в предпросмотре"
}];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GadgetsStateToggler.js',
    ]
});

/* MassEdit */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassEdit/code.js',
    ]
});

window.MassEditConfig = {
  interval: 2500,
  placement: {
    element: "toolbar",
    type: "append"
  }
};

/* UserBadge */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserBadge/code.js',
    ]
});