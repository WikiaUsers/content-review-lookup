var chatags = { images: true, videos: true }; // ChatTags value

// ChatBlockButton
chatBlockReason = "Abusing multiple accounts";
chatBlockExpiry = "infinite";

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js', // Options
        'u:shining-armor:MediaWiki:ChatTags/code.js', // ChatTags (by [[User:Lil' Miss Rarity]] - formerly [[User:Shining-Armor]], [[User:Lil' Miss Raricow]]) - Usages can be found http://dev.wikia.com/wiki/ChatTags
    ]
});