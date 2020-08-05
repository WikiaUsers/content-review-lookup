// ChatBlockButton
chatBlockReason = "Abusing multiple accounts";
chatBlockExpiry = "infinite";

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js', // Options
        'u:dev:MediaWiki:ChatBlockButton/code.js' // ChatBlockButton
    ]
});