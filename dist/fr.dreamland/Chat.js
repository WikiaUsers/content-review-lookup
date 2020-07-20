/***************************/
/** Script Configuration ***/
/***************************/
 
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
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:kocka:MediaWiki:Emoticons.js'
    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Émoticônes",
        close: "Fermer"
    },
    helpText: "Choisissez un émoticône en cliquant dessus"
};