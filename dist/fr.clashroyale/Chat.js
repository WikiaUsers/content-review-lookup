importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

/* Chat Options */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
// Code bouton des smileys provenant du Wikia Undertale anglais
 
importArticles({
    type: 'script',
    articles: [
        "u:dev:MediaWiki:ChatOptions/code.js",
        "u:kocka:MediaWiki:Emoticons/code.js"
    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "�motic�nes",
        close: "Fermer"
    },
    helpText: "Choisissez un �motic�ne en cliquant dessus"
};