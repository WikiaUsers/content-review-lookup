// ChatBlockButton
chatBlockReason = "Abusing multiple accounts";
chatBlockExpiry = "infinite";

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatBlockButton/code.2.js', // Block users inside chat
        'u:dev:MediaWiki:ChatOptions/code.js', // Options
    ]
});