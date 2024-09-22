/* Any JavaScript here will be loaded for all users on every page load. */
// Configuration variables
window.preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
window.preloadTemplates_subpage = "case-by-case";
window.preloadTemplates_namespace = "Template";

// Preload templates
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PreloadTemplates.js'
    ]
});

// Search suggest
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SearchSuggest/code.js',
    ]
});

// References Popups
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});

// CategoryQuickRemove
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CategoryQuickRemove.js',
    ]
});