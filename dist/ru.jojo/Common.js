// ============================================================
// Импортирование скриптов из http://dev.wikia.com
importArticles({
    type: 'script',
    articles: [        
        'MediaWiki:InactiveUsers.js',             // Неактивный участник спустя 1 мес
        'u:dev:ReferencePopups/code.js',      // Всплывающие примечания
    ]
});
/* На вики также подключено "Extension:Variables" MediaWiki */
// ============================================================

preloadTemplates_list =  "MediaWiki: Custom-PreloadTemplatesList" ; 
preloadTemplates_subpage =  "case-by-case" ;

// Замена изображения для всплывающего окна ссылки
window.pPreview = $.extend(true, window.pPreview, {
    defimage: 'https://static.wikia.nocookie.net/jojo/images/6/68/NoImg.jpg/revision/latest?cb=20210528133952&path-prefix=ru',
    noimage: 'https://static.wikia.nocookie.net/jojo/images/6/68/NoImg.jpg/revision/latest?cb=20210528133952&path-prefix=ru'
});