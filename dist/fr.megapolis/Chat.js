/* Chat Options */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
// Code bouton des smileys provenant du Wikia Undertale anglais
 
importArticles({
    type: "script",
    articles: [
        "u:kocka:MediaWiki:Emoticons.js"
    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "�motic�nes",
        close: "Fermer"
    },
    helpText: "Choisissez un �motic�ne dans la liste !"
};