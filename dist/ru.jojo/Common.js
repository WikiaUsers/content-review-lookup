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