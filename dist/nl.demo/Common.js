importArticles({
    type: "script",
    articles: [
        "w:c:dev:InputUsername/code.js",
        "MediaWiki:Switch.js"
    ]
});

$(function(){
    $("nav.WikiNav a[href^=http]").attr('target','_blank');
});