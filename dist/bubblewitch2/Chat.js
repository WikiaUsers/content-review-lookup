var chatags = { images: true, videos: true }; // ChatTags value
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatBlockButton/code.2.js', // Block users inside chat (may don't work)
        'u:dev:MediaWiki:ChatHacks.js', // ChatHacks
        'u:dev:MediaWiki:Multikick.js', // Multikick
        'u:shining-armor:MediaWiki:ChatTags/code.js' // ChatTags (by [[User:Lil' Miss Rarity]] - formerly [[User:Shining-Armor]], [[User:Lil' Miss Raricow]]) - Usages can be found http://dev.wikia.com/wiki/ChatTags
    ]
});