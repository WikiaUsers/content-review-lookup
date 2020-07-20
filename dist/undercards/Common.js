/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js",
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});

importScriptPage('MediaWiki:Translator/Translator.js', 'dev');