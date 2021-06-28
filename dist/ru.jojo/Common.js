/* На вики также подключено "Extension:Variables" MediaWiki */
// ============================================================
preloadTemplates_list =  "MediaWiki: Custom-PreloadTemplatesList" ; 
preloadTemplates_subpage =  "case-by-case" ;

// Замена изображения для всплывающего окна ссылки
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://static.wikia.nocookie.net/jojo/images/6/68/NoImg.jpg/revision/latest?cb=20210528133952&path-prefix=ru',
    noimage: 'https://static.wikia.nocookie.net/jojo/images/6/68/NoImg.jpg/revision/latest?cb=20210528133952&path-prefix=ru'
});

// == Настройка гаджетов ==
nkch_gst_gadgets = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "Недавняя вики-деятельность", // Название в меню
    description: "Недавняя вики-деятельность" // Описание гаджета в меню при наведении
}, {
    name: "UWStyle",
    title: "Единый стиль вики",
    description: "Общее оформление вики-проектов"
}, {
    name: "RemoveCatSpoiler",
    title: "Прежние Категории",
    description: "Прежние Категории"
}];