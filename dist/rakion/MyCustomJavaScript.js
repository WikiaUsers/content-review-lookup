@import url("/load.php?mode=articles&articles=One.css|Two.css&only=styles");
importArticles({
    type: "script",
    articles: [
        "MediaWiki:MyCustomJavaScript.js",
        "external:dev:MediaWiki:External_include.js"
    ]
});
importArticles({
    type: "style",
    articles: [
        "MediaWiki:Common.css",
        "external:starwars:MediaWiki:External_include.css"
    ]
});
importArticles({
    type: "script",
    articles: [
        "MediaWiki:MyCustomJavaScript.js",
        "external:dev:MediaWiki:External_include.js"
    ]
}, {
    type: "style",
    article: "MediaWiki:Common.css"
});