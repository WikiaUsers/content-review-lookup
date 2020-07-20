/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SignatureCheck/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:Countdown/code.js',           // Countdown script
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});