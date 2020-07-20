// </syntaxhighlight>
 
var chatags = { images: true, videos: true };
 
 /***************************/
/***** Script Imports ******/
/***************************/
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:GiveChatModPrompt/code.js',
        "u:dev:IsTyping/code.js",
        "u:dev:MediaWiki:ChatDelay/code.js",
        'u:dev:MediaWiki:!mods/code.js',
        'u:kocka:MediaWiki:ChatRules/code.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:MediaWiki:EmoticonsWindow/code.js'
    ]
});
 
// variable traductrice
window.ChatRulesConfig = {
    vocab: {
        rules: 'Règlement'
    }
};