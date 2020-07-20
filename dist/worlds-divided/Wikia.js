window.imported = 0;
if (window.imported < 1){
    window.imported = 1;
    importArticles({
            type: 'script',
            articles: [
                'u:dev:UserTags/code.js',
            ]
    });
}