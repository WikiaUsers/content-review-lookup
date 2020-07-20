PurgeButtonText = 'Purge';
ajaxPages = ["Special:WikiActivity","Special:Log"];
 
importArticles( {
    type: "script",
    articles: [
        "external:dev:PurgeButton/code.js",
        "external:dev:AjaxRC/code.js"
]
});