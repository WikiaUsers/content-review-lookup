 window.ajaxPages = ["Especial:WikiActivity","Especial:Mudan�as_recentes"];

 importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});