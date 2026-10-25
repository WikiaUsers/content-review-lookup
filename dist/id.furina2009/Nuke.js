importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Nuke/code.js',
    ]
});

window.nukeDeleteReason = "Cleanup of pages created by $1";
window.nukeDelay = 1000;
window.nukeTitle = "Mass delete all pages created by this user";