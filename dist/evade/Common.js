// Announcements in Right bar (not work after adding animation in template) 
window.AddRailModule = [{ page: 'Template:Announcements', prepend: true }]

// BALP!

importArticles({
    type: 'script',
    articles: [
        'u:dev:mediawiki:AjaxBatchDelete.js',
        'u:dev:mediawiki:ListFiles.js'
    ]
});